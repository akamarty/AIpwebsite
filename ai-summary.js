/**
 * ai-summary.js — real, evidence-based "AI Summary" for a decoded VIN.
 *
 * Replaces the old chassis-photo panel on VinResults.dc.html (Wikimedia
 * Commons only covered a handful of 911-family chassis codes, so most
 * queries -- including any 718, like WP0CC2A84MS240652 -- showed a broken
 * "photo coming soon" slot). This module computes a confidence score from
 * real, checkable evidence factors instead: whether the VIN decodes,
 * whether it matches a verified factory build sheet, whether trim-level
 * rarity data exists, and how big the sample behind any shown rate
 * actually is. Nothing here is a market valuation -- Sophia doesn't have
 * real transaction comps yet (see schema/DATABASE_SCHEMA.md, "Populating
 * auction_sales"), so fair-value scenarios and deal scoring are
 * deliberately left out rather than invented.
 *
 * Confidence is capped at 98% on purpose -- never claim certainty, and
 * small sample sizes reduce the score rather than getting rounded up.
 */
(function () {
  "use strict";

  /**
   * @param {Object} f - decoded VIN fields (from window.PorscheVIN.decodeVin(...).fields)
   * @param {boolean} is718 - true when f.modelCode === "82" (982-gen 718)
   * @param {Object|null} printSheet - window.SophiaSpyderBuilds.getPrintSheet(vin) result, or null
   * @param {Object} optionReference - window.SophiaSpyderBuilds.optionReference
   */
  function build(f, is718, printSheet, optionReference) {
    optionReference = optionReference || {};
    var evidence = [];
    var pts = 0;

    // 1. Every valid VIN gets this -- deterministic, not a guess.
    evidence.push({
      label: "VIN structurally decoded",
      met: true,
      detail: "Country, chassis, model year, and plant confirmed from the VIN's own check-digit structure."
    });
    pts += 15;

    // 2. Chassis family resolved to a known reference entry.
    var chassisKnown = !!(f.modelName && f.modelName.indexOf("Unknown") === -1);
    evidence.push({
      label: "Chassis family recognized",
      met: chassisKnown,
      detail: chassisKnown ? f.modelName : "This chassis code isn't in Sophia's structural reference yet."
    });
    if (chassisKnown) pts += 10;

    // 3. Exact factory build sheet match -- the single strongest signal.
    evidence.push({
      label: "Factory build sheet on file",
      met: !!printSheet,
      detail: printSheet
        ? ("Exact factory order matched for this VIN — real options, real MSRP (" + printSheet.msrpLabel + ").")
        : "No verified build sheet for this exact VIN yet — only 151 of the 1,067-build 718 Spyder database is matched so far."
    });
    if (printSheet) pts += 40;

    // 4. Trim-level production/rarity data (only covers the 718 lineup today).
    evidence.push({
      label: "Trim production & rarity data on file",
      met: is718,
      detail: is718
        ? "Real production counts and color-distribution figures for the 718 lineup."
        : "Sophia's production-rarity database currently covers the 718 (982) lineup only."
    });
    if (is718) pts += 15;

    // 5 & 6. Only meaningful when a build sheet exists -- how much of this
    // exact car's options are priced against real data, and how small is
    // the smallest sample behind those numbers.
    var resolvedCount = 0, totalCount = 0, minSample = null;
    if (printSheet) {
      totalCount = printSheet.items.length;
      printSheet.items.forEach(function (it) {
        if (it.description) {
          resolvedCount++;
          var ref = optionReference[it.code];
          if (ref && ref.buildCount != null) {
            minSample = (minSample === null) ? ref.buildCount : Math.min(minSample, ref.buildCount);
          }
        }
      });
    }
    var resolvedPct = totalCount ? Math.round((resolvedCount / totalCount) * 100) : 0;
    evidence.push({
      label: "Options priced against real take-rate data",
      met: resolvedCount > 0,
      detail: printSheet
        ? (resolvedCount + " of " + totalCount + " factory codes on this car matched to real price/take-rate data (" + resolvedPct + "%).")
        : "No option codes to price without a matched build sheet — look one up below if you have it off the door sticker."
    });
    if (totalCount) pts += Math.round(20 * (resolvedCount / totalCount));

    evidence.push({
      label: "Sample size behind those rates",
      met: minSample !== null,
      detail: minSample !== null
        ? (minSample >= 100
            ? ("Smallest sample behind a shown rate: " + minSample.toLocaleString() + " builds — plenty.")
            : ("Smallest sample behind a shown rate: just " + minSample + " builds — confidence capped for it, not inflated."))
        : "No real per-option sample sizes to check yet."
    });
    if (minSample !== null) pts += minSample >= 100 ? 10 : (minSample >= 20 ? 6 : 3);

    var confidencePct = Math.min(98, pts);
    var metCount = evidence.filter(function (e) { return e.met; }).length;

    var headline, summaryText;
    if (printSheet) {
      headline = "Real factory build, real spec.";
      summaryText = "This VIN matches a verified factory order in Sophia's database: a " + printSheet.modelYear +
        " 718 Spyder built " + printSheet.productionDate + " for the " + printSheet.country + " market, MSRP " +
        printSheet.msrpLabel + " with " + totalCount + " factory options, " + resolvedCount +
        " of them priced against real take-rate data.";
    } else if (is718) {
      headline = "Structurally decoded, spec unverified.";
      summaryText = "This VIN decodes as a " + f.modelName + ", model year " + f.modelYear + ", built in " +
        f.plant + ". Sophia doesn't have a factory-verified build sheet for this exact VIN yet, so options and " +
        "MSRP aren't shown here — but the 718 lineup's real production and color-rarity data below still applies to it.";
    } else {
      headline = "Structurally decoded.";
      summaryText = "This VIN decodes as a " + f.modelName + ", model year " + f.modelYear + ", built in " +
        f.plant + ". Sophia's verified-build-sheet and rarity databases don't cover this chassis yet, so this " +
        "summary is limited to what the VIN's own structure confirms.";
    }

    var specPremiumRows = [];
    if (printSheet) {
      printSheet.items
        .filter(function (it) { return it.description; })
        .map(function (it) {
          var ref = optionReference[it.code];
          return {
            label: it.description,
            priceLabel: it.priceLabel,
            takeRate: ref ? ref.takeRate : null,
            buildCount: ref ? ref.buildCount : null
          };
        })
        .filter(function (r) { return r.takeRate !== null; })
        .sort(function (a, b) { return a.takeRate - b.takeRate; })
        .slice(0, 4)
        .forEach(function (r) {
          specPremiumRows.push({
            label: r.label,
            priceLabel: r.priceLabel,
            takeRateLabel: r.takeRate + "% take rate" + (r.buildCount != null ? (" · " + r.buildCount.toLocaleString() + " builds") : "")
          });
        });
    }

    return {
      confidencePct: confidencePct,
      confidenceLabel: confidencePct + "% confidence",
      evidenceFactors: evidence.map(function (e) {
        return {
          label: e.label,
          detail: e.detail,
          icon: e.met ? "✓" : "—",
          color: e.met ? "var(--color-accent-700)" : "var(--color-neutral-700)"
        };
      }),
      evidenceMetCount: metCount,
      evidenceTotalCount: evidence.length,
      aiHeadline: headline,
      aiSummaryText: summaryText,
      specPremiumRows: specPremiumRows,
      showSpecPremium: specPremiumRows.length ? "block" : "none"
    };
  }

  window.SophiaAISummary = { build: build };
})();
