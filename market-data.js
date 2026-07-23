/**
 * market-data.js — 718 (982-generation) production & color-rarity data.
 *
 * Mirrors two Supabase tables so the same real numbers exist both in the
 * shared database (for future cross-visitor features) and shipped statically
 * (so charts render instantly, no network round-trip) — same reasoning as
 * porsche-options.json shadowing the `porsche_options` table. See
 * schema/003_production_market_data.sql and schema/DATABASE_SCHEMA.md.
 *
 * Source: user-supplied production/allocation and color-distribution figures
 * for the 982-generation 718 lineup (Spyder, Cayman GTS 4.0, Boxster GTS 4.0,
 * Boxster 25 Years, Cayman GT4) plus the 718 Spyder RS. Nothing here is
 * estimated or fabricated — every count is exactly as supplied.
 */
(function () {
  "use strict";

  // ---------------------------------------------------------------------
  // Raw data — mirrors `model_allocations`
  // ---------------------------------------------------------------------
  var MODEL_ALLOCATIONS = [
    { trim: "718 Spyder", region: null, metric: "total_production", value: 2054 },
    { trim: "718 Cayman GTS 4.0", region: null, metric: "total_production", value: 1289 },
    { trim: "718 Boxster GTS 4.0", region: null, metric: "total_production", value: 1165 },
    { trim: "Boxster 25 Years", region: null, metric: "total_production", value: 323 },
    { trim: "718 Cayman GT4", region: null, metric: "total_production", value: 2664 },
    { trim: "718 Spyder RS", region: "NA", metric: "total_production", value: 2114 },
    { trim: "718 Spyder RS", region: "RoW", metric: "total_production", value: 4604 },
    { trim: "718 Spyder RS", region: "Global", metric: "total_production", value: 6718 },
    { trim: "718 Spyder RS", region: "NA", metric: "weissach_take_rate_pct", value: 91 }
  ];

  // ---------------------------------------------------------------------
  // Raw data — mirrors `color_distribution`
  // ---------------------------------------------------------------------
  var COLOR_DISTRIBUTION = [
    // 718 Cayman GT4
    { trim: "718 Cayman GT4", color: "Miami Blue", count: 126 },
    { trim: "718 Cayman GT4", color: "Racing Yellow", count: 188 },
    { trim: "718 Cayman GT4", color: "Guards Red", count: 211 },
    { trim: "718 Cayman GT4", color: "GT Silver Metallic", count: 320 },
    { trim: "718 Cayman GT4", color: "White", count: 249 },
    { trim: "718 Cayman GT4", color: "Black", count: 328 },
    { trim: "718 Cayman GT4", color: "Gentian Blue Metallic", count: 408 },
    { trim: "718 Cayman GT4", color: "Carrara White Metallic", count: 173 },
    { trim: "718 Cayman GT4", color: "Chalk", count: 341 },
    { trim: "718 Cayman GT4", color: "Python Green", count: 96 },
    { trim: "718 Cayman GT4", color: "Shark Blue", count: 146 },
    { trim: "718 Cayman GT4", color: "Paint to Sample", count: 34 },
    { trim: "718 Cayman GT4", color: "Frozen Berry Metallic", count: 3 },
    { trim: "718 Cayman GT4", color: "Exterior in Custom Color", count: 41 },
    // 718 Spyder
    { trim: "718 Spyder", color: "Carrara White Metallic", count: 204 },
    { trim: "718 Spyder", color: "Racing Yellow", count: 59 },
    { trim: "718 Spyder", color: "GT Silver Metallic", count: 511 },
    { trim: "718 Spyder", color: "White", count: 162 },
    { trim: "718 Spyder", color: "Gentian Blue Metallic", count: 231 },
    { trim: "718 Spyder", color: "Chalk", count: 252 },
    { trim: "718 Spyder", color: "Guards Red", count: 118 },
    { trim: "718 Spyder", color: "Black", count: 223 },
    { trim: "718 Spyder", color: "Miami Blue", count: 54 },
    { trim: "718 Spyder", color: "Python Green", count: 42 },
    { trim: "718 Spyder", color: "Exterior in Custom Color", count: 52 },
    { trim: "718 Spyder", color: "Shark Blue", count: 80 },
    { trim: "718 Spyder", color: "Frozen Berry Metallic", count: 10 },
    { trim: "718 Spyder", color: "Paint to Sample", count: 56 }
  ];

  // Gradient-accent palette (from styles.css --gradient-ai stops), cycled
  // across bars so multi-color charts read as one family, not random hues.
  var BAR_COLORS = ["#ff375f", "#ff9500", "#af52de", "#0a84ff", "#ef6853"];

  function barColor(i) {
    return BAR_COLORS[i % BAR_COLORS.length];
  }

  function getProductionCounts() {
    var rows = MODEL_ALLOCATIONS.filter(function (r) {
      return r.metric === "total_production" && r.trim !== "718 Spyder RS";
    });
    var max = Math.max.apply(null, rows.map(function (r) { return r.value; }));
    return rows
      .slice()
      .sort(function (a, b) { return b.value - a.value; })
      .map(function (r, i) {
        return {
          label: r.trim,
          value: r.value,
          valueLabel: r.value.toLocaleString(),
          pct: Math.max(4, Math.round((r.value / max) * 100)),
          color: barColor(i)
        };
      });
  }

  function getColorDistribution(trim) {
    var rows = COLOR_DISTRIBUTION.filter(function (r) { return r.trim === trim; });
    var max = Math.max.apply(null, rows.map(function (r) { return r.count; }));
    return rows
      .slice()
      .sort(function (a, b) { return b.count - a.count; })
      .map(function (r, i) {
        return {
          label: r.color,
          value: r.count,
          valueLabel: r.count.toLocaleString(),
          pct: Math.max(3, Math.round((r.count / max) * 100)),
          color: barColor(i)
        };
      });
  }

  function getRarestColor(trim) {
    var rows = getColorDistribution(trim);
    return rows.length ? rows[rows.length - 1] : null;
  }

  function getMostCommonColor(trim) {
    var rows = getColorDistribution(trim);
    return rows.length ? rows[0] : null;
  }

  function getTrimTotal(trim) {
    var rows = COLOR_DISTRIBUTION.filter(function (r) { return r.trim === trim; });
    return rows.reduce(function (sum, r) { return sum + r.count; }, 0);
  }

  function getSpyderRS() {
    function find(region, metric) {
      var hit = MODEL_ALLOCATIONS.filter(function (r) {
        return r.trim === "718 Spyder RS" && r.region === region && r.metric === metric;
      })[0];
      return hit ? hit.value : null;
    }
    var na = find("NA", "total_production");
    var row = find("RoW", "total_production");
    var total = find("Global", "total_production");
    return {
      na: na,
      row: row,
      total: total,
      naLabel: na.toLocaleString(),
      rowLabel: row.toLocaleString(),
      totalLabel: total.toLocaleString(),
      naPct: Math.round((na / total) * 100),
      rowPct: Math.round((row / total) * 100),
      weissachTakeRateNA: find("NA", "weissach_take_rate_pct")
    };
  }

  window.SophiaMarketData = {
    modelAllocations: MODEL_ALLOCATIONS,
    colorDistribution: COLOR_DISTRIBUTION,
    getProductionCounts: getProductionCounts,
    getColorDistribution: getColorDistribution,
    getRarestColor: getRarestColor,
    getMostCommonColor: getMostCommonColor,
    getTrimTotal: getTrimTotal,
    getSpyderRS: getSpyderRS
  };
})();
