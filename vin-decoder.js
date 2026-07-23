/*
 * vin-decoder.js — real Porsche VIN structural decoder + option-code lookup
 * for Sophia, your personal AI advisor.
 *
 * VIN decode tables sourced from the Stuttcars Porsche VIN Decoder guide
 * (https://www.stuttcars.com/porsche-data/porsche-vin-decoder/), "USA/Canada"
 * table for the 17-character VIN used since model year 1981.
 *
 * A VIN alone encodes: country, manufacturer, vehicle type, body type,
 * chassis/model generation, model year, assembly plant, and serial number.
 * It does NOT encode individual factory-installed options (paint, PCCB,
 * Sport Chrono, etc.) — those live in Porsche's internal build record
 * (Kardex), which isn't public. The option-code lookup below is a separate
 * tool: given a code you already have (from a build sheet, window sticker,
 * or Rennlist-style reference), it tells you what that code means.
 *
 * Option-code data sourced from the user-provided Rennlist "Options.pdf"
 * (Porsche option codes, model years 1964-2003, compiled by Adrian
 * Streather) — see porsche-options.xlsx / porsche-options.json in this
 * folder for the full sheet.
 */
(function (global) {
  "use strict";

  // ---- VIN structural decode tables (USA/Canada, 1981-present) ----

  var YEAR_PRE2010 = {
    B: 1981, C: 1982, D: 1983, E: 1984, F: 1985, G: 1986, H: 1987, J: 1988,
    K: 1989, L: 1990, M: 1991, N: 1992, P: 1993, R: 1994, S: 1995, T: 1996,
    V: 1997, W: 1998, X: 1999, Y: 2000, "1": 2001, "2": 2002, "3": 2003,
    "4": 2004, "5": 2005, "6": 2006, "7": 2007, "8": 2008, "9": 2009
  };

  var YEAR_POST2010 = {
    A: 2010, B: 2011, C: 2012, D: 2013, E: 2014, F: 2015, G: 2016, H: 2017,
    J: 2018, K: 2019, L: 2020, M: 2021, N: 2022, P: 2023, R: 2024, S: 2025,
    T: 2026, V: 2027, W: 2028, X: 2029
  };

  var BODY_TYPE = {
    A: "911 Coupé / 924 / 928 (MY1991+) / 944 Coupé / 968 Coupé / Cayman / Cayenne / Panamera",
    B: "964 / 996 / 997 Targa",
    C: "944 / 968 / 964 Cabriolet-America Roadster-Speedster / 993-996-997 Cabriolet / 997 Speedster / Boxster / Carrera GT",
    D: "993 Targa",
    E: "911 SC Targa/Cabrio 3.2, 911 G-Model Turbo Targa/Cabriolet",
    J: "928 (up to MY1990) / 911 G-Model Turbo Coupé"
  };

  var PLANT = {
    S: "Stuttgart (Zuffenhausen), Germany",
    N: "Neckarsulm, Germany (Audi factory — 924, 944)",
    U: "Uusikaupunki, Finland (Valmet — Boxster 986/987, Cayman 987)",
    L: "Leipzig, Germany (Cayenne, Carrera GT, Panamera, Macan)",
    K: "Osnabrück, Germany (VW factory — Boxster, Cayman, Cayenne)",
    D: "Bratislava, Slovakia (VW factory — Cayenne)"
  };

  // position 8 + position 12, combined, per Stuttcars
  var MODEL_CODES = {
    "11": "911 (G-Model, pre-1989)",
    "18": "918 Spyder",
    "24": "924",
    "28": "928",
    "30": "930 (911 Turbo, G-Model)",
    "31": "924 Turbo",
    "44": "944",
    "51": "944 Turbo",
    "5B": "95B Macan",
    "64": "964 (911, 1989–1994)",
    "68": "968",
    "70": "970 Panamera (2009–2016)",
    "71": "971 Panamera (2016–2023)",
    "80": "980 Carrera GT",
    "81": "981 Boxster/Cayman (2012–2016)",
    "82": "982 718 Boxster/Cayman (2016–present)",
    "86": "986 Boxster (1997–2004)",
    "87": "987 Boxster/Cayman (2005–2012)",
    "91": "991 (911, 2011–2018)",
    "92": "992 (911, 2019–2025)",
    "93": "993 (911, 1993–1997)",
    "96": "996 (911, 1997–2004)",
    "97": "997 (911, 2004–2011)",
    "PA": "Cayenne 955/957 (2002–2010)",
    "2A": "Cayenne 958 (2010–2018)",
    "YA": "Cayenne 9YA (2018–present)"
  };


  var VIN_RE = /^[A-HJ-NPR-Z0-9]{17}$/i; // no I, O, Q per VIN standard

  function decodeVin(vinRaw) {
    var vin = (vinRaw || "").trim().toUpperCase();
    var errors = [];

    if (!vin) errors.push("Enter a VIN.");
    else if (vin.length !== 17) errors.push("A VIN is 17 characters — this one is " + vin.length + ".");
    else if (!VIN_RE.test(vin)) errors.push("VINs don't use the letters I, O, or Q.");

    if (errors.length) {
      return { valid: false, vin: vin, errors: errors };
    }

    var p = {}; // 1-indexed positions
    for (var i = 1; i <= 17; i++) p[i] = vin.charAt(i - 1);

    if (p[1] !== "W" || p[2] !== "P") {
      errors.push("Doesn't look like a Porsche factory VIN (should start WP...).");
    }

    var modelKey = p[8] + p[12];
    var modelName = MODEL_CODES[modelKey] || null;
    if (!modelName) errors.push("Chassis code \"" + modelKey + "\" (positions 8 + 12) isn't in our decode table yet.");

    var era = p[7] === "A" ? "post2010" : "pre2010";
    var yearTable = era === "post2010" ? YEAR_POST2010 : YEAR_PRE2010;
    var year = yearTable[p[10]] || null;
    if (!year) errors.push("Model year code \"" + p[10] + "\" isn't recognized.");

    var result = {
      valid: errors.length === 0,
      vin: vin,
      errors: errors,
      fields: {
        country: p[1] === "W" ? "Germany" : p[1],
        manufacturer: p[2] === "P" ? "Porsche" : p[2],
        vehicleType: p[3] === "0" ? "Sports / passenger car" : (p[3] === "1" ? "SUV" : p[3]),
        bodyType: BODY_TYPE[p[4]] || p[4],
        modelCode: modelName ? modelKey : null,
        modelName: modelName,
        modelYear: year,
        plant: PLANT[p[11]] || p[11],
        serial: p[13] + p[14] + p[15] + p[16] + p[17]
      }
    };
    return result;
  }

  // ---- Option-code lookup ----

  var optionsData = null;
  var optionsPromise = null;

  function loadOptions() {
    if (optionsData) return Promise.resolve(optionsData);
    if (optionsPromise) return optionsPromise;
    optionsPromise = fetch("porsche-options.json")
      .then(function (res) { return res.ok ? res.json() : []; })
      .then(function (json) { optionsData = json; return json; })
      .catch(function () { optionsData = []; return []; });
    return optionsPromise;
  }

  function lookupOption(codeRaw) {
    var code = (codeRaw || "").trim().toUpperCase();
    return loadOptions().then(function (data) {
      var hit = data.find(function (e) { return e.code.toUpperCase() === code; });
      return hit || null;
    });
  }

  global.PorscheVIN = {
    decodeVin: decodeVin,
    lookupOption: lookupOption,
    loadOptions: loadOptions
  };
})(window);
