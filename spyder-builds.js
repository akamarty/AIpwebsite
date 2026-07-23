/**
 * spyder-builds.js — real 718 Spyder VIN build sheets + option reference.
 *
 * Source: a user-shared Google Sheet ("718 Spyder Builds v1.0"). That
 * workbook is a large multi-tab tool built around a 718 Spyder database
 * (a per-VIN lookup tool, a raw VIN database, and a "Print It" formatted
 * build-sheet view). Its tab-switching UI is JavaScript-driven, so what's
 * captured here is what was reachable via static CSV export: a real,
 * individually-verified batch of 151 2020-model-year Spyder VINs (not the
 * source workbook's full multi-thousand-row database), plus the factory
 * option codes/prices/take-rates confirmed via two matching example
 * "sticker" printouts pulled from the same workbook. See
 * schema/004_spyder_builds.sql and schema/DATABASE_SCHEMA.md for exactly
 * what's included vs. still outstanding, and how this mirrors the
 * `spyder_builds` / `spyder_option_reference` Supabase tables.
 *
 * Every option-code list here is exactly as supplied by the source sheet
 * -- nothing estimated or filled in. Base price ($97,300) and delivery fee
 * ($1,350) for the 2020 MY Spyder are confirmed from two independent
 * "sticker" printouts of the same VIN (WP0CC2A89MS240274) pulled from the
 * source sheet, both agreeing exactly.
 */
(function () {
  "use strict";

  var BASE_PRICE_2020 = 97300;
  var DELIVERY_FEE_2020 = 1350;

  // ---------------------------------------------------------------------
  // Real VIN build sheets -- mirrors `spyder_builds` (151 rows)
  // ---------------------------------------------------------------------
  var BUILDS = [
    { vin: "WP0CC2A80LS240100", commission: "D48481", modelYear: 2020, country: "USA", productionDate: "3/2/2020", msrp: 115530.0, optionCodes: ["2Y","67","424","XDK","P07","519","480","SSB","XEW","P13","858","489","573","583","581","XSX","XFG","XGN","750","XXB","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A82LS240101", commission: "D50092", modelYear: 2020, country: "USA", productionDate: "3/4/2020", msrp: 134090.0, optionCodes: ["U2","67","424","XDH","P11","XYB","480","450","602","630","P13","489","573","583","581","DFS","XSX","750","CZW","XNS","EKG","XXD","QH1","9VJ","9WT","P40","Z1S"] },
    { vin: "WP0CC2A84LS240102", commission: "D48527", modelYear: 2020, country: "USA", productionDate: "3/3/2020", msrp: 120090.0, optionCodes: ["U2","24","424","446","P11","546","519","480","SSB","XEW","630","P13","087","858","489","573","583","581","DFS","CZW","XMP","XNS","EFA","XXB","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A86LS240103", commission: "D48500", modelYear: 2020, country: "USA", productionDate: "3/2/2020", msrp: 116890.0, optionCodes: ["3H","24","424","XDH","P07","546","XYB","480","SSB","XEW","630","748","P13","087","858","489","573","342","583","581","XNS","XLJ","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A88LS240104", commission: "D48479", modelYear: 2020, country: "USA", productionDate: "3/6/2020", msrp: 114550.0, optionCodes: ["U2","24","424","XDH","P07","480","SSB","602","630","748","P13","087","858","489","573","342","583","581","9ZE","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A8XLS240105", commission: "D48475", modelYear: 2020, country: "USA", productionDate: "3/3/2020", msrp: 117240.0, optionCodes: ["3H","11","424","XDK","P11","480","450","600","489","583","581","9VL","9WT","Z1S"] },
    { vin: "WP0CC2A81LS240106", commission: "D48484", modelYear: 2020, country: "USA", productionDate: "3/3/2020", msrp: 119150.0, optionCodes: ["U2","24","424","XDH","P11","546","XYB","480","SSB","XBS","602","630","P13","087","858","489","573","583","581","XNS","XLU","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A83LS240107", commission: "D48489", modelYear: 2020, country: "USA", productionDate: "3/3/2020", msrp: 111730.0, optionCodes: ["J5","11","424","P07","498","480","SSB","602","630","342","583","581","EKH","9VJ","9WT","Z1S"] },
    { vin: "WP0CC2A85LS240108", commission: "D48477", modelYear: 2020, country: "USA", productionDate: "3/3/2020", msrp: 116710.0, optionCodes: ["U2","24","424","XDK","P07","XUB","546","519","480","SSB","602","630","P13","087","858","489","573","342","583","581","XNS","XLU","XXB","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A87LS240109", commission: "D48487", modelYear: 2020, country: "USA", productionDate: "3/3/2020", msrp: 138010.0, optionCodes: ["U2","24","424","XDK","P07","XUB","546","519","XYB","480","450","XBS","602","630","P13","087","489","573","342","583","581","DFS","XHU","XFB","XGP","XNS","CHK","XWK","CUJ","XTG","CFX","CGT","CLP","XLU","XLJ","XXB","QH1","9VJ","9WT","P40","Z1S"] },
    { vin: "WP0CC2A83LS240110", commission: "D48471", modelYear: 2020, country: "USA", productionDate: "3/3/2020", msrp: 126390.0, optionCodes: ["2Y","21","424","XDK","P11","XUB","546","XJA","519","XYB","CVM","480","SSB","602","630","748","P13","858","489","573","583","581","DFS","XNS","XXD","CHM","AGB","P28","9ZE","QH1","9VJ","9WT","P40","Z1S","497"] },
    { vin: "WP0CC2A85LS240111", commission: "D50090", modelYear: 2020, country: "USA", productionDate: "3/3/2020", msrp: 130830.0, optionCodes: ["G1","67","424","XDK","P11","CGU","546","519","CVM","480","450","602","P13","858","489","573","583","581","DFS","XSX","750","CZW","EKG","XXD","9ZE","QH1","9VL","9WT","P40","Z1S","497"] },
    { vin: "WP0CC2A87LS240112", commission: "D48493", modelYear: 2020, country: "USA", productionDate: "3/10/2020", msrp: 128120.0, optionCodes: ["U2","24","424","XDK","P11","CGU","519","XYB","480","450","602","630","P13","087","489","573","583","581","509","XNS","CLP","XXD","EFA","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A89LS240113", commission: "D48525", modelYear: 2020, country: "USA", productionDate: "3/3/2020", msrp: 127850.0, optionCodes: ["0Q","58","424","446","P11","546","XYB","480","450","602","630","748","P13","858","489","573","583","581","509","DFS","XHN","XFR","XGL","750","XNS","XLU","P28","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A80LS240114", commission: "D48352", modelYear: 2020, country: "USA", productionDate: "3/18/2020", msrp: 115890.0, optionCodes: ["U2","24","424","XDH","P07","546","519","480","SSB","XBS","602","630","P13","087","858","489","573","342","583","581","XNS","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A82LS240115", commission: "D48414", modelYear: 2020, country: "USA", productionDate: "3/5/2020", msrp: 113480.0, optionCodes: ["0Q","79","424","446","P11","480","SSB","XEW","P13","858","489","573","583","581","XNS","P28","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A84LS240116", commission: "D48322", modelYear: 2020, country: "USA", productionDate: "3/11/2020", msrp: 113480.0, optionCodes: ["0Q","79","424","446","P11","480","SSB","XEW","P13","858","489","573","583","581","XNS","P28","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A86LS240117", commission: "D48326", modelYear: 2020, country: "USA", productionDate: "3/4/2020", msrp: 106520.0, optionCodes: ["U2","79","424","446","P04","498","480","SSB","XBS","600","573","342","EKJ","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A88LS240118", commission: "D48434", modelYear: 2020, country: "USA", productionDate: "3/9/2020", msrp: 117810.0, optionCodes: ["0Q","79","424","XDH","P11","480","SSB","XEW","P13","858","489","573","583","581","EKJ","QH1","9VJ","9WT","P40","Z1S"] },
    { vin: "WP0CC2A8XLS240119", commission: "D48296", modelYear: 2020, country: "USA", productionDate: "3/19/2020", msrp: 123590.0, optionCodes: ["3H","21","424","446","P07","XVX","24103","24104","24106","24901","24902","24906","25101","25106","26741","26751","26761","XUB","546","CUC","480","SSB","602","630","748","P13","858","489","573","342","XHX","XXB","QH1","9VJ","9WT","P40","Z1S","497"] },
    { vin: "WP0CC2A86LS240120", commission: "D43513", modelYear: 2020, country: "USA", productionDate: "3/4/2020", msrp: 116970.0, optionCodes: ["U2","24","424","XDK","P07","XUB","546","XYB","480","SSB","602","630","P13","087","489","573","342","583","581","DFS","EFA","QH1","9VL","9WT","P40","Z1S","CXC","XES"] },
    { vin: "WP0CC2A88LS240121", commission: "D43985", modelYear: 2020, country: "USA", productionDate: "3/10/2020", msrp: 123060.0, optionCodes: ["3H","11","424","XDH","P11","519","480","450","600","573","583","581","XHN","XFR","EKD","EFA","9VJ","9WT","Z1S"] },
    { vin: "WP0CC2A8XLS240122", commission: "D48548", modelYear: 2020, country: "USA", productionDate: "3/10/2020", msrp: 132240.0, optionCodes: ["3H","24","424","XDH","P11","546","XYB","480","450","602","630","P13","087","858","489","573","583","581","XMP","XXB","QH1","9VJ","9WT","P40","Z1S"] },
    { vin: "WP0CC2A81LS240123", commission: "D48345", modelYear: 2020, country: "USA", productionDate: "3/3/2020", msrp: 108990.0, optionCodes: ["0Q","67","424","XDK","P07","546","519","480","SSB","600","858","489","573","583","581","509","XSX","750","EKG","9VK","9WT","Z1S"] },
    { vin: "WP0CC2A83LS240124", commission: "D48354", modelYear: 2020, country: "USA", productionDate: "3/5/2020", msrp: 113480.0, optionCodes: ["0Q","79","424","446","P11","480","SSB","XEW","P13","858","489","573","583","581","XNS","P28","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A85LS240125", commission: "D48289", modelYear: 2020, country: "USA", productionDate: "3/5/2020", msrp: 117530.0, optionCodes: ["U2","24","424","XDH","P07","546","519","480","SSB","602","630","P13","087","489","573","342","581","CHL","CFX","XXD","9ZE","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A87LS240126", commission: "D48390", modelYear: 2020, country: "USA", productionDate: "3/4/2020", msrp: 118790.0, optionCodes: ["1A","58","424","446","P07","480","450","600","630","748","342","583","581","XHN","XFR","XGL","750","QH1","9VL","P40","Z1S"] },
    { vin: "WP0CC2A89LS240127", commission: "D44109", modelYear: 2020, country: "USA", productionDate: "3/4/2020", msrp: 112530.0, optionCodes: ["2Y","24","424","XDK","P07","XUB","480","SSB","602","630","748","P13","087","858","489","342","583","QH1","9VK","9WT","P40","Z1S"] },
    { vin: "WP0CC2A80LS240128", commission: "D47988", modelYear: 2020, country: "USA", productionDate: "3/4/2020", msrp: 129740.0, optionCodes: ["U2","24","424","P11","519","498","480","450","XBS","602","630","748","P13","087","858","573","583","581","509","XHU","XFB","XGP","XLJ","QH1","9VJ","9WT","P40","Z1S"] },
    { vin: "WP0CC2A82LS240129", commission: "D48308", modelYear: 2020, country: "USA", productionDate: "3/4/2020", msrp: 122810.0, optionCodes: ["J5","58","424","XDK","P07","XUB","546","480","450","602","489","573","342","583","581","509","750","XWK","9VK","9WT","Z1S"] },
    { vin: "WP0CC2A89LS240130", commission: "D44539", modelYear: 2020, country: "USA", productionDate: "3/4/2020", msrp: 111020.0, optionCodes: ["0Q","24","424","XDK","P07","480","SSB","602","630","748","P13","087","489","573","342","583","581","9VL","9WT","Z1S"] },
    { vin: "WP0CC2A80LS240131", commission: "D48347", modelYear: 2020, country: "USA", productionDate: "5/5/2020", msrp: 114000.0, optionCodes: ["0Q","79","424","446","P11","480","SSB","602","630","P13","858","489","573","583","581","P28","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A82LS240132", commission: "D44038", modelYear: 2020, country: "USA", productionDate: "3/5/2020", msrp: 114430.0, optionCodes: ["U2","79","424","P11","498","480","SSB","602","630","748","P13","858","489","573","583","EKJ","QH1","9VL","P40","Z1S"] },
    { vin: "WP0CC2A84LS240133", commission: "D50091", modelYear: 2020, country: "USA", productionDate: "3/5/2020", msrp: 129820.0, optionCodes: ["0Q","24","424","XDK","P11","XYB","480","450","602","630","P13","087","489","573","583","581","DFS","XNS","XXD","QH1","9VJ","9WT","P40","Z1S"] },
    { vin: "WP0CC2A86LS240134", commission: "D49810", modelYear: 2020, country: "USA", productionDate: "3/6/2020", msrp: 115740.0, optionCodes: ["2Y","67","424","XDK","P07","XJA","480","SSB","XEW","630","748","P13","573","XHU","750","EKG","XXD","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A88LS240135", commission: "D49325", modelYear: 2020, country: "USA", productionDate: "5/13/2020", msrp: 111740.0, optionCodes: ["U2","24","424","XDH","P07","546","519","CVM","480","SSB","600","630","P13","087","489","573","342","583","QH1","9VK","9WT","P40","Z1S","497"] },
    { vin: "WP0CC2A8XLS240136", commission: "D48555", modelYear: 2020, country: "USA", productionDate: "3/6/2020", msrp: 118070.0, optionCodes: ["U2","24","424","XDK","P11","546","519","CUC","480","SSB","602","630","P13","087","858","489","573","583","581","XNS","QH1","9VL","9WT","P40","Z1S","497"] },
    { vin: "WP0CC2A85LS240139", commission: "D49809", modelYear: 2020, country: "USA", productionDate: "3/10/2020", msrp: 110620.0, optionCodes: ["1A","79","424","P04","546","XYB","480","SSB","XEW","630","P13","489","573","342","583","581","EKJ","EFA","XXB","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A81LS240140", commission: "D43689", modelYear: 2020, country: "USA", productionDate: "3/6/2020", msrp: 107960.0, optionCodes: ["0Q","79","424","XDH","P04","546","XJA","519","CUC","XYB","480","SSB","XEW","630","583","581","DFS","XSH","XFG","XLJ","EFA","9VL","Z1S","497"] },
    { vin: "WP0CC2A83LS240141", commission: "D50093", modelYear: 2020, country: "USA", productionDate: "3/6/2020", msrp: 125280.0, optionCodes: ["U2","24","424","XDK","P11","546","519","CVM","480","SSB","602","630","P13","087","858","489","573","583","581","DFS","XFB","XGP","XLU","XLJ","XXB","9ZE","QH1","9VJ","9WT","P40","Z1S","497"] },
    { vin: "WP0CC2A85LS240142", commission: "D48340", modelYear: 2020, country: "USA", productionDate: "3/9/2020", msrp: 111840.0, optionCodes: ["U2","24","424","446","P07","480","SSB","602","630","748","087","489","573","342","583","581","509","XHU","XLU","XLJ","EFA","9VL","9WT","Z1S"] },
    { vin: "WP0CC2A82LS240146", commission: "057942", modelYear: 2020, country: "Canada", productionDate: "3/6/2020", msrp: 125310.0, optionCodes: ["A1","24","424","XDK","P07","XYB","480","SSB","XEW","P13","087","489","573","583","581","9VL","9WT"] },
    { vin: "WP0CC2A84LS240147", commission: "D49279", modelYear: 2020, country: "USA", productionDate: "5/6/2020", msrp: 106830.0, optionCodes: ["U2","24","424","P04","XYB","480","SSB","600","630","087","342","583","581","9VJ","Z1S"] },
    { vin: "WP0CC2A86LS240148", commission: "D48576", modelYear: 2020, country: "USA", productionDate: "3/6/2020", msrp: 119300.0, optionCodes: ["A1","67","424","XDK","P11","519","480","SSB","602","P13","858","489","573","583","581","XSX","750","XNS","EKG","XXD","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A84LS240150", commission: "D48328", modelYear: 2020, country: "USA", productionDate: "3/6/2020", msrp: 112590.0, optionCodes: ["2Y","24","424","446","P04","546","XYB","480","SSB","XEW","630","748","P13","087","858","489","573","342","583","581","XNS","XLJ","EFA","XXB","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A88LS240152", commission: "D48451", modelYear: 2020, country: "USA", productionDate: "3/6/2020", msrp: 116890.0, optionCodes: ["3H","24","424","XDH","P07","480","SSB","602","630","748","P13","087","858","489","573","342","509","XXB","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A8XLS240153", commission: "058851", modelYear: 2020, country: "Canada", productionDate: "5/28/2020", msrp: 127050.0, optionCodes: ["U2","24","424","P04","546","480","SSB","602","P13","087","489","573","342","583","581","XHU","XXB","9VL","P40"] },
    { vin: "WP0CC2A81LS240154", commission: "D48523", modelYear: 2020, country: "USA", productionDate: "3/11/2020", msrp: 114180.0, optionCodes: ["U2","24","424","XDK","P07","519","XYB","480","SSB","602","630","P13","087","858","489","573","342","583","581","509","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A83LS240155", commission: "D48495", modelYear: 2020, country: "USA", productionDate: "3/10/2020", msrp: 119530.0, optionCodes: ["0Q","21","424","P11","XUB","498","480","450","602","P13","583","581","DFS","EKG","9VL","9WT","Z1S"] },
    { vin: "WP0CC2A85LS240156", commission: "D49235", modelYear: 2020, country: "USA", productionDate: "3/10/2020", msrp: 110340.0, optionCodes: ["2Y","24","424","XDK","P04","546","480","SSB","602","630","087","583","XMP","9ZE","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A89LS240158", commission: "D48503", modelYear: 2020, country: "USA", productionDate: "3/9/2020", msrp: 113480.0, optionCodes: ["0Q","79","424","446","P11","480","SSB","XEW","P13","858","489","573","583","581","XNS","P28","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A80LS240159", commission: "D48506", modelYear: 2020, country: "USA", productionDate: "3/11/2020", msrp: 129720.0, optionCodes: ["2Y","24","424","XDK","P11","XUB","XYB","480","450","602","630","P13","087","489","573","583","581","509","DFS","XNS","CGT","CLP","XLU","XXB","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A87LS240160", commission: "D48439", modelYear: 2020, country: "USA", productionDate: "3/9/2020", msrp: 113480.0, optionCodes: ["0Q","79","424","446","P11","480","SSB","XEW","P13","858","489","573","583","581","XNS","P28","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A89LS240161", commission: "D48551", modelYear: 2020, country: "USA", productionDate: "3/12/2020", msrp: 132240.0, optionCodes: ["3H","24","424","XDK","P11","546","XYB","480","450","602","630","P13","087","858","489","573","583","581","XHU","XNS","XLU","QH1","9VJ","9WT","P40","Z1S"] },
    { vin: "WP0CC2A80LS240162", commission: "D48498", modelYear: 2020, country: "USA", productionDate: "3/9/2020", msrp: 111280.0, optionCodes: ["A1","67","424","XDK","P04","480","SSB","XEW","630","748","P13","858","489","573","342","583","581","XSX","750","P28","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A82LS240163", commission: "D48510", modelYear: 2020, country: "USA", productionDate: "3/10/2020", msrp: 133690.0, optionCodes: ["1A","58","424","XDH","P07","CGU","546","XJA","CUC","XYB","480","450","602","630","748","P13","489","573","342","583","CHL","XHN","XFR","XGL","750","XNS","XWK","XTG","CFX","CGT","XLU","EFA","XXB","9ZE","QH1","9VL","P40","Z1S","497"] },
    { vin: "WP0CC2A84LS240164", commission: "D48336", modelYear: 2020, country: "USA", productionDate: "3/12/2020", msrp: 124290.0, optionCodes: ["2Y","79","424","XDH","P07","546","480","450","602","630","748","P13","858","489","573","342","583","581","509","XSH","XNS","EKG","EFA","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A86LS240165", commission: "D48491", modelYear: 2020, country: "USA", productionDate: "3/10/2020", msrp: 115000.0, optionCodes: ["2Y","24","424","XDH","P07","546","519","480","SSB","602","P13","087","489","573","342","583","581","XXB","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A88LS240166", commission: "D48304", modelYear: 2020, country: "USA", productionDate: "3/17/2020", msrp: 113480.0, optionCodes: ["0Q","79","424","446","P11","480","SSB","XEW","P13","858","489","573","583","581","XNS","P28","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A8XLS240167", commission: "D44357", modelYear: 2020, country: "USA", productionDate: "3/13/2020", msrp: 114630.0, optionCodes: ["A1","21","424","XDK","P11","XUB","546","519","CVM","480","SSB","XBS","XEW","630","748","XLJ","EKG","9ZE","9VL","9WT","Z1S","497"] },
    { vin: "WP0CC2A81LS240168", commission: "D63420", modelYear: 2020, country: "USA", productionDate: "3/11/2020", msrp: 108990.0, optionCodes: ["A1","11","424","XDH","P04","480","SSB","602","630","P13","489","342","581","XHU","XFB","XLJ","EKH","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A83LS240169", commission: "D66090", modelYear: 2020, country: "USA", productionDate: "3/12/2020", msrp: 113680.0, optionCodes: ["U2","24","424","446","P07","XUB","546","480","SSB","602","630","P13","087","858","489","573","342","581","EFA","QH1","9VL","P40","Z1S"] },
    { vin: "WP0CC2A8XLS240170", commission: "D49288", modelYear: 2020, country: "USA", productionDate: "3/16/2020", msrp: 125730.0, optionCodes: ["0Q","58","424","XDK","P07","XUB","519","XYB","480","450","602","630","748","P13","573","342","583","581","XHN","XGL","750","EKG","XXD","EFA","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A81LS240171", commission: "D65793", modelYear: 2020, country: "USA", productionDate: "5/6/2020", msrp: 112400.0, optionCodes: ["0Q","67","424","XDK","P07","480","SSB","XEW","748","342","583","581","XSX","750","CGT","CLP","EKG","9VL","9WT","Z1S"] },
    { vin: "WP0CC2A83LS240172", commission: "D48293", modelYear: 2020, country: "USA", productionDate: "3/18/2020", msrp: 130765.0, optionCodes: ["A1","21","424","XDK","P11","519","498","XYB","480","450","XBS","602","630","P13","489","573","583","581","XLU","XLJ","EKG","CHM","CXE","9VJ","9WT","ZLA","Z1S","XES"] },
    { vin: "WP0CC2A85LS240173", commission: "058915", modelYear: 2020, country: "Canada", productionDate: "3/18/2020", msrp: 121810.0, optionCodes: ["1A","11","424","P11","480","SSB","600","P13","583","581","9VL","9WT"] },
    { vin: "WP0CC2A87LS240174", commission: "D56055", modelYear: 2020, country: "USA", productionDate: "3/19/2020", msrp: 114420.0, optionCodes: ["U2","24","424","P11","480","SSB","602","P13","087","573","583","581","509","XSH","QH1","9VL","P40","Z1S"] },
    { vin: "WP0CC2A80LS240176", commission: "D64570", modelYear: 2020, country: "USA", productionDate: "3/19/2020", msrp: 109080.0, optionCodes: ["1A","11","424","P04","546","498","480","SSB","XBS","602","630","P13","858","489","342","581","EKK","9VJ","9WT","Z1S"] },
    { vin: "WP0CC2A82LS240177", commission: "D82073", modelYear: 2020, country: "USA", productionDate: "3/19/2020", msrp: 100130.0, optionCodes: ["P3","11","424","P04","480","SSB","600","489","342","583","581","XFR","XGL","EKD","9VK","9WT","Z1S"] },
    { vin: "WP0CC2A84LS240178", commission: "D70868", modelYear: 2020, country: "USA", productionDate: "5/5/2020", msrp: 130370.0, optionCodes: ["1A","79","424","XDK","P11","XUB","546","519","XYB","480","450","XBS","602","630","P13","489","573","583","581","509","DFS","XSH","XNS","CGT","CLP","XLU","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A86LS240179", commission: "059023", modelYear: 2020, country: "Canada", productionDate: "5/6/2020", msrp: 125990.0, optionCodes: ["G1","67","424","XDH","P04","546","480","SSB","602","748","P13","489","342","583","581","XSX","750","EKG","9VL","9WT"] },
    { vin: "WP0CC2A84LS240181", commission: "D82467", modelYear: 2020, country: "USA", productionDate: "5/5/2020", msrp: 131790.0, optionCodes: ["J5","58","424","XDK","P11","546","XYB","480","450","602","630","748","P13","858","489","573","583","581","XHY","XFR","XGL","750","EKG","XXD","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A88LS240183", commission: "058143", modelYear: 2020, country: "Canada", productionDate: "5/18/2020", msrp: 133500.0, optionCodes: ["3H","24","424","XDK","P04","546","519","480","450","XEW","748","087","583","509","9VL","9WT"] },
    { vin: "WP0CC2A8XLS240184", commission: "D75673", modelYear: 2020, country: "USA", productionDate: "5/5/2020", msrp: 110660.0, optionCodes: ["A1","67","424","446","P07","480","SSB","602","630","748","P13","342","583","581","XFG","XGN","750","9VL","9WT","Z1S"] },
    { vin: "WP0CC2A81LS240185", commission: "058971", modelYear: 2020, country: "Canada", productionDate: "5/12/2020", msrp: 119630.0, optionCodes: ["G1","11","424","XDH","P04","480","SSB","602","630","748","P13","342","583","581","P29","9VL","9WT"] },
    { vin: "WP0CC2A83LS240186", commission: "D71462", modelYear: 2020, country: "USA", productionDate: "5/14/2020", msrp: 116720.0, optionCodes: ["A1","67","424","XDK","P07","XUB","546","519","XYB","CVM","480","SSB","XBS","602","573","XFG","XGN","750","XXD","9VL","9WT","P40","Z1S","497"] },
    { vin: "WP0CC2A85LS240187", commission: "D43659", modelYear: 2020, country: "USA", productionDate: "5/5/2020", msrp: 113840.0, optionCodes: ["U2","79","424","P07","480","SSB","602","630","489","573","342","583","581","509","XSH","XXD","EFA","9ZE","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A87LS240188", commission: "D48343", modelYear: 2020, country: "USA", productionDate: "5/5/2020", msrp: 113480.0, optionCodes: ["0Q","79","424","446","P11","480","SSB","XEW","P13","858","489","573","583","581","XNS","P28","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A89LS240189", commission: "D78705", modelYear: 2020, country: "USA", productionDate: "5/4/2020", msrp: 102820.0, optionCodes: ["U2","79","424","446","P04","498","480","SSB","XEW","858","342","583","581","509","EKJ","9VK","Z1S"] },
    { vin: "WP0CC2A87LS240191", commission: "D82618", modelYear: 2020, country: "USA", productionDate: "5/6/2020", msrp: 103520.0, optionCodes: ["1A","79","424","P04","498","480","SSB","600","630","489","342","583","581","XSH","EKJ","9VL","9WT","Z1S"] },
    { vin: "WP0CC2A89LS240192", commission: "D48338", modelYear: 2020, country: "USA", productionDate: "5/26/2020", msrp: 130390.0, optionCodes: ["U2","58","424","P07","546","XJA","519","CUC","XYB","480","450","602","630","748","P13","489","573","342","583","581","XHN","XFR","XGL","750","CZW","XWK","EKG","XXD","9ZE","QH1","9VL","9WT","P40","Z1S","497"] },
    { vin: "WP0CC2A80LS240193", commission: "063069", modelYear: 2020, country: "Canada", productionDate: "5/5/2020", msrp: 125380.0, optionCodes: ["2Y","24","424","P04","480","SSB","602","630","748","P13","087","858","489","573","342","581","XLJ","9VK","9WT","P40"] },
    { vin: "WP0CC2A84LS240195", commission: "063606", modelYear: 2020, country: "Canada", productionDate: "5/14/2020", msrp: 129010.0, optionCodes: ["3H","24","424","XDH","P11","498","480","SSB","XEW","087","858","583","581","XSH","XNS","9VK"] },
    { vin: "WP0CC2A86LS240196", commission: "D50619", modelYear: 2020, country: "USA", productionDate: "5/7/2020", msrp: 109310.0, optionCodes: ["2Y","79","424","XDH","P07","546","480","SSB","600","748","P13","489","573","342","583","581","XSH","XFB","XGP","9VK","Z1S"] },
    { vin: "WP0CC2A88LS240197", commission: "058889", modelYear: 2020, country: "Canada", productionDate: "5/7/2020", msrp: 122000.0, optionCodes: ["A1","24","424","446","P04","480","SSB","602","630","087","858","489","342","583","581","XLU","XLJ","9VL","9WT"] },
    { vin: "WP0CC2A8XLS240198", commission: "D65404", modelYear: 2020, country: "USA", productionDate: "5/15/2020", msrp: 108600.0, optionCodes: ["1A","79","424","446","P11","480","SSB","XBS","600","858","583","EKG","9VK","9WT","900","Z1S"] },
    { vin: "WP0CC2A81LS240199", commission: "D77499", modelYear: 2020, country: "USA", productionDate: "5/12/2020", msrp: 117940.0, optionCodes: ["2Y","21","424","P07","XVX","24103","24104","24106","24901","24902","24906","25101","25106","26741","26751","26761","90017","90027","XVA","XVC","480","SSB","602","630","748","P13","858","489","573","583","581","509","CFX","EKJ","9ZE","QH1","9VL","P40","Z1S"] },
    { vin: "WP0CC2A84LS240200", commission: "063091", modelYear: 2020, country: "Canada", productionDate: "5/12/2020", msrp: 129680.0, optionCodes: ["2Y","79","424","XDK","P07","546","XJA","480","SSB","XBS","602","P13","489","573","583","581","509","XSH","EFA","9ZE","9VL","9WT"] },
    { vin: "WP0CC2A86LS240201", commission: "D78185", modelYear: 2020, country: "USA", productionDate: "5/12/2020", msrp: 116990.0, optionCodes: ["0Q","67","424","XDH","P11","XUB","498","XYB","480","SSB","602","630","748","P13","573","583","581","509","XFG","XGN","750","XLU","P28","EFA","9VL","9WT","900","Z1S"] },
    { vin: "WP0CC2A88LS240202", commission: "061496", modelYear: 2020, country: "Canada", productionDate: "5/15/2020", msrp: 128780.0, optionCodes: ["3H","79","424","XDH","P07","519","480","SSB","XEW","489","342","581","9VL","P40"] },
    { vin: "WP0CC2A8XLS240203", commission: "D55514", modelYear: 2020, country: "USA", productionDate: "5/15/2020", msrp: 109780.0, optionCodes: ["3H","11","424","XDK","P07","XUB","XJA","519","CVM","480","SSB","602","858","342","583","581","509","XGN","P29","9VL","9WT","Z1S","497"] },
    { vin: "WP0CC2A83LS240205", commission: "D82631", modelYear: 2020, country: "USA", productionDate: "5/19/2020", msrp: 120330.0, optionCodes: ["3H","24","424","P11","480","450","XBS","602","087","858","581","9VK","9WT","Z1S"] },
    { vin: "WP0CC2A85LS240206", commission: "059430", modelYear: 2020, country: "Canada", productionDate: "5/22/2020", msrp: 118540.0, optionCodes: ["A1","67","424","446","P04","480","SSB","600","342","583","750","9VL","9WT"] },
    { vin: "WP0CC2A87LS240207", commission: "D44296", modelYear: 2020, country: "USA", productionDate: "5/12/2020", msrp: 128170.0, optionCodes: ["3H","24","424","XDK","P07","XJA","XYB","480","450","XBS","602","630","087","489","342","583","581","XHU","XFB","CLP","XLU","EFA","9ZE","9VJ","9WT","Z1S"] },
    { vin: "WP0CC2A89LS240208", commission: "058603", modelYear: 2020, country: "Canada", productionDate: "5/8/2020", msrp: 126840.0, optionCodes: ["0Q","67","424","P07","546","480","SSB","602","489","342","583","581","XSX","XGP","750","EKG","9VL","9WT"] },
    { vin: "WP0CC2A80LS240209", commission: "D83125", modelYear: 2020, country: "USA", productionDate: "5/8/2020", msrp: 109240.0, optionCodes: ["3H","79","424","XDK","P04","546","519","498","480","SSB","XBS","600","573","342","583","581","XSH","EKG","9VL","9WT","Z1S"] },
    { vin: "WP0CC2A87LS240210", commission: "D81553", modelYear: 2020, country: "USA", productionDate: "5/8/2020", msrp: 102450.0, optionCodes: ["U2","24","424","P04","480","SSB","600","087","9VL","9WT","Z1S"] },
    { vin: "WP0CC2A89LS240211", commission: "D55841", modelYear: 2020, country: "USA", productionDate: "5/11/2020", msrp: 108350.0, optionCodes: ["U2","67","424","XDK","P04","480","SSB","XEW","858","573","583","XHU","XFB","XGP","750","9VL","9WT","Z1S"] },
    { vin: "WP0CC2A80LS240212", commission: "058176", modelYear: 2020, country: "Canada", productionDate: "5/11/2020", msrp: 124580.0, optionCodes: ["0Q","79","424","446","P04","546","XJA","XYB","480","SSB","XBS","602","630","748","P13","489","342","583","581","XSH","9ZE","9VL","9WT"] },
    { vin: "WP0CC2A82LS240213", commission: "D82855", modelYear: 2020, country: "USA", productionDate: "5/11/2020", msrp: 123590.0, optionCodes: ["3H","21","424","446","P07","XVX","24103","24104","24106","24901","24902","24906","25101","25106","26741","26751","26761","XUB","546","CUC","480","SSB","602","630","748","P13","858","489","573","342","XHX","XXB","QH1","9VJ","9WT","P40","Z1S","497"] },
    { vin: "WP0CC2A84LS240214", commission: "D81383", modelYear: 2020, country: "USA", productionDate: "5/12/2020", msrp: 116100.0, optionCodes: ["2Y","79","424","446","P07","546","XYB","480","SSB","602","630","P13","858","573","342","581","DFS","XLU","EKG","EFA","XXB","9ZE","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A86LS240215", commission: "D71778", modelYear: 2020, country: "USA", productionDate: "5/12/2020", msrp: 118130.0, optionCodes: ["3H","79","424","XDK","P07","XUB","546","519","XYB","480","SSB","XBS","602","630","P13","489","573","583","581","509","DFS","XNS","XLG","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A88LS240216", commission: "063139", modelYear: 2020, country: "Canada", productionDate: "5/25/2020", msrp: 127960.0, optionCodes: ["0Q","24","424","XDH","P07","XUB","XYB","480","SSB","602","P13","087","489","573","342","581","XXB","9VL","9WT"] },
    { vin: "WP0CC2A8XLS240217", commission: "D66947", modelYear: 2020, country: "USA", productionDate: "5/11/2020", msrp: 114540.0, optionCodes: ["A1","21","424","446","P07","XUB","546","498","480","SSB","602","630","748","P13","489","573","342","581","EKG","XXD","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A81LS240218", commission: "D54558", modelYear: 2020, country: "USA", productionDate: "5/13/2020", msrp: 116860.0, optionCodes: ["2Y","24","424","XDK","P11","546","XJA","XYB","CVM","480","SSB","602","630","748","P13","087","573","583","581","509","XLU","XLJ","EFA","9VL","9WT","Z1S","497"] },
    { vin: "WP0CC2A83LS240219", commission: "062559", modelYear: 2020, country: "Canada", productionDate: "5/20/2020", msrp: 150010.0, optionCodes: ["3H","58","424","XDH","P11","519","498","XYB","480","450","602","630","748","P13","489","573","583","581","509","XHN","XFR","XGL","750","XNS","EKG","9ZE","9VL","P40"] },
    { vin: "WP0CC2A8XLS240220", commission: "D68477", modelYear: 2020, country: "USA", productionDate: "5/20/2020", msrp: 116080.0, optionCodes: ["0Q","79","424","XDK","P07","480","SSB","602","630","748","P13","858","489","573","342","583","581","509","DFS","XSX","9ZE","QH1","9VL","9WT","P40","ZGA","Z1S","CXC","XES"] },
    { vin: "WP0CC2A81LS240221", commission: "059422", modelYear: 2020, country: "Canada", productionDate: "5/12/2020", msrp: 124220.0, optionCodes: ["0Q","67","424","XDK","P04","519","XYB","480","SSB","600","748","P13","858","573","342","583","581","509","XSX","XGN","750","EKG","9VL","9WT"] },
    { vin: "WP0CC2A83LS240222", commission: "058309", modelYear: 2020, country: "Canada", productionDate: "5/18/2020", msrp: 119430.0, optionCodes: ["A1","79","424","XDK","P04","480","SSB","600","P13","489","342","P28","9VL","9WT"] },
    { vin: "WP0CC2A85LS240223", commission: "D43785", modelYear: 2020, country: "USA", productionDate: "5/12/2020", msrp: 111690.0, optionCodes: ["G1","67","424","XDK","P07","XUB","519","498","480","SSB","XEW","630","748","858","489","573","342","583","581","509","XSX","XFG","XGN","750","P28","9VK","9WT","Z1S"] },
    { vin: "WP0CC2A87LS240224", commission: "062957", modelYear: 2020, country: "Canada", productionDate: "5/13/2020", msrp: 128090.0, optionCodes: ["U2","67","424","XDH","P07","519","XYB","480","SSB","XEW","630","858","489","342","583","581","509","XSX","750","EKG","9VL","9WT"] },
    { vin: "WP0CC2A89LS240225", commission: "062702", modelYear: 2020, country: "Canada", productionDate: "5/12/2020", msrp: 126930.0, optionCodes: ["2Y","79","424","XDH","P04","480","SSB","602","630","P13","858","489","573","342","583","581","XSH","EKJ","9VL","9WT","P40"] },
    { vin: "WP0CC2A82LS240227", commission: "063159", modelYear: 2020, country: "Canada", productionDate: "5/19/2020", msrp: 127685.0, optionCodes: ["U2","67","424","XDK","P07","XJA","CVM","480","SSB","600","489","573","583","XHU","XGP","750","EKG","XXD","9VL","497","1T3"] },
    { vin: "WP0CC2A84LS240228", commission: "064142", modelYear: 2020, country: "Canada", productionDate: "5/12/2020", msrp: 130190.0, optionCodes: ["J5","79","424","XDK","P11","546","480","SSB","602","630","583","581","509","XHY","P28","9VK","9WT"] },
    { vin: "WP0CC2A86LS240229", commission: "062701", modelYear: 2020, country: "Canada", productionDate: "5/15/2020", msrp: 126890.0, optionCodes: ["0Q","79","424","XDH","P07","546","XJA","480","SSB","600","489","342","583","581","XSH","EFA","9ZE","9VL","9WT","P40"] },
    { vin: "WP0CC2A82LS240230", commission: "062800", modelYear: 2020, country: "Canada", productionDate: "5/20/2020", msrp: 120430.0, optionCodes: ["2Y","79","424","P04","546","480","SSB","600","748","P13","858","489","573","342","583","581","EKG","9VK","9WT"] },
    { vin: "WP0CC2A84LS240231", commission: "059485", modelYear: 2020, country: "Canada", productionDate: "5/19/2020", msrp: 129435.0, optionCodes: ["U2","24","424","446","P07","XUB","519","498","XYB","480","SSB","602","630","748","P13","087","858","489","573","342","583","581","CHL","XHU","XLU","9VL","9WT","1T3"] },
    { vin: "WP0CC2A88LS240233", commission: "D59816", modelYear: 2020, country: "USA", productionDate: "5/18/2020", msrp: 117220.0, optionCodes: ["2Y","24","424","XDH","P11","546","XJA","XYB","480","SSB","602","P13","087","583","581","DFS","XHU","CHK","XLJ","XXD","EFA","9VL","9WT","Z1S"] },
    { vin: "WP0CC2A8XLS240234", commission: "060025", modelYear: 2020, country: "Canada", productionDate: "5/15/2020", msrp: 125440.0, optionCodes: ["U2","24","424","446","P04","XUB","546","XJA","480","SSB","XBS","602","630","P13","087","489","573","583","581","XHU","9VL","9WT"] },
    { vin: "WP0CC2A81LS240235", commission: "062742", modelYear: 2020, country: "Canada", productionDate: "5/25/2020", msrp: 124250.0, optionCodes: ["1A","79","424","XDK","P04","546","480","SSB","XEW","748","P13","489","573","342","583","581","XSH","9VL","9WT"] },
    { vin: "WP0CC2A85LS240237", commission: "D79418", modelYear: 2020, country: "USA", productionDate: "5/25/2020", msrp: 132660.0, optionCodes: ["U2","58","424","XDH","P07","CGU","546","498","XYB","480","450","602","630","748","P13","489","573","342","583","581","XHN","XFR","XGL","750","CZW","XMP","EKG","EFA","9VJ","9WT","P40","Z1S"] },
    { vin: "WP0CC2A87LS240238", commission: "057991", modelYear: 2020, country: "Canada", productionDate: "5/14/2020", msrp: 121530.0, optionCodes: ["A1","67","424","446","P04","480","SSB","602","489","342","583","581","XSX","750","9VL"] },
    { vin: "WP0CC2A89LS240239", commission: "058016", modelYear: 2020, country: "Canada", productionDate: "5/14/2020", msrp: 132180.0, optionCodes: ["1A","79","424","XDK","P07","XUB","519","498","480","SSB","XBS","602","748","P13","489","573","342","583","581","XSH","P28","9ZE","9VL","9WT","P40"] },
    { vin: "WP0CC2A85LS240240", commission: "061026", modelYear: 2020, country: "Canada", productionDate: "5/13/2020", msrp: 132650.0, optionCodes: ["3H","67","424","XDK","P11","480","SSB","602","748","858","489","583","581","XSX","750","P28","9VL","9WT"] },
    { vin: "WP0CC2A87LS240241", commission: "058340", modelYear: 2020, country: "Canada", productionDate: "5/14/2020", msrp: 130050.0, optionCodes: ["G1","67","424","XDK","P07","546","480","SSB","602","630","P13","858","489","573","342","583","581","DFS","750","EKG","9VL","9WT"] },
    { vin: "WP0CC2A89LS240242", commission: "062743", modelYear: 2020, country: "Canada", productionDate: "5/20/2020", msrp: 131690.0, optionCodes: ["3H","67","424","XDK","P11","480","SSB","XEW","489","583","581","509","XSX","750","EKC","9VL","9WT"] },
    { vin: "WP0CC2A80LS240243", commission: "D80581", modelYear: 2020, country: "USA", productionDate: "5/14/2020", msrp: 113720.0, optionCodes: ["U2","67","424","446","P07","480","SSB","602","630","489","XSX","750","9ZE","9VJ","9WT","Z1S"] },
    { vin: "WP0CC2A82LS240244", commission: "061983", modelYear: 2020, country: "Canada", productionDate: "5/14/2020", msrp: 125140.0, optionCodes: ["G1","11","424","XDH","P07","498","480","SSB","602","489","573","342","583","581","XSH","P29","9VL","P40"] },
    { vin: "WP0CC2A84LS240245", commission: "058419", modelYear: 2020, country: "Canada", productionDate: "5/25/2020", msrp: 127780.0, optionCodes: ["3H","67","424","XDK","P04","519","480","SSB","602","630","748","858","489","573","342","583","581","509","750","EKC","9VL","9WT"] },
    { vin: "WP0CC2A86LS240246", commission: "059232", modelYear: 2020, country: "Canada", productionDate: "5/14/2020", msrp: 128430.0, optionCodes: ["1A","79","424","XDK","P11","519","XYB","480","SSB","XEW","748","858","583","581","XSH","EKC","XNS","9VL","9WT"] },
    { vin: "WP0CC2A88LS240247", commission: "061436", modelYear: 2020, country: "Canada", productionDate: "5/15/2020", msrp: 131400.0, optionCodes: ["P3","58","424","XDH","P07","546","XJA","498","480","SSB","XBS","602","858","342","583","581","509","XHN","XGL","750","EKG","9VL","P40"] },
    { vin: "WP0CC2A8XLS240248", commission: "D79422", modelYear: 2020, country: "USA", productionDate: "5/25/2020", msrp: 119830.0, optionCodes: ["A1","79","424","XDH","P07","519","XYB","CVM","480","SSB","602","630","748","P13","489","573","342","583","581","509","XSH","CZW","XMP","P28","QH1","9VJ","9WT","P40","Z1S","497"] },
    { vin: "WP0CC2A81LS240249", commission: "058707", modelYear: 2020, country: "Canada", productionDate: "5/15/2020", msrp: 128110.0, optionCodes: ["U2","79","424","446","P11","546","498","XYB","480","SSB","600","630","P13","489","573","583","581","XSX","XGN","EKJ","9VL","9WT"] },
    { vin: "WP0CC2A88LS240250", commission: "D65789", modelYear: 2020, country: "USA", productionDate: "5/18/2020", msrp: 128235.0, optionCodes: ["0Q","21","424","XDH","P11","XVX","24103","24104","24106","24901","24902","24906","25101","25106","26741","26751","26761","90027","XVA","XUB","519","498","480","450","XBS","602","630","P13","583","581","DFS","XHX","XLU","XLJ","P28","XXB","9VL","9WT","ZLA","Z1S"] },
    { vin: "WP0CC2A8XLS240251", commission: "059652", modelYear: 2020, country: "Canada", productionDate: "5/18/2020", msrp: 131080.0, optionCodes: ["3H","24","424","XDH","P04","480","SSB","602","630","748","P13","087","489","573","342","583","581","DFS","XHU","XFB","XGP","CHM","EFA","9VL","9WT","1T3"] },
    { vin: "WP0CC2A81LS240252", commission: "D70949", modelYear: 2020, country: "USA", productionDate: "5/22/2020", msrp: 124220.0, optionCodes: ["J5","79","424","XDH","P11","519","XYB","480","450","602","630","P13","573","581","XSH","XLU","9VL","9WT","Z1S"] },
    { vin: "WP0CC2A83LS240253", commission: "D68132", modelYear: 2020, country: "USA", productionDate: "5/18/2020", msrp: 113520.0, optionCodes: ["2Y","24","424","XDK","P07","XUB","480","SSB","602","630","748","P13","087","858","489","342","583","QH1","9VL","9WT","P40","Z1S"] },
    { vin: "WP0CC2A85LS240254", commission: "060634", modelYear: 2020, country: "Canada", productionDate: "5/18/2020", msrp: 140225.0, optionCodes: ["1A","79","424","446","P07","XUB","XYB","480","450","XEW","630","P13","858","489","573","342","583","581","XSH","CZW","XMP","EKG","XXD","EFA","9VL","9WT"] },
    { vin: "WP0CC2A87LS240255", commission: "D71545", modelYear: 2020, country: "USA", productionDate: "5/18/2020", msrp: 110180.0, optionCodes: ["3H","24","424","446","P07","CVM","480","SSB","600","087","342","583","581","509","XFB","XGP","XXB","9VL","9WT","Z1S","497"] },
    { vin: "WP0CC2A89LS240256", commission: "058307", modelYear: 2020, country: "Canada", productionDate: "5/25/2020", msrp: 135125.0, optionCodes: ["J5","67","424","XDK","P11","546","480","SSB","600","509","CHL","XSX","XFG","XGN","750","EFA","9VL","P40"] },
    { vin: "WP0CC2A80LS240257", commission: "D66309", modelYear: 2020, country: "USA", productionDate: "5/20/2020", msrp: 113940.0, optionCodes: ["U2","24","424","XDH","P11","519","498","480","SSB","602","P13","087","489","573","583","9VL","9WT","Z1S"] },
    { vin: "WP0CC2A82LS240258", commission: "060464", modelYear: 2020, country: "Canada", productionDate: "5/19/2020", msrp: 131740.0, optionCodes: ["P3","58","424","XDK","P07","546","XJA","519","480","SSB","XBS","602","630","P13","858","489","573","342","583","581","XHN","XFR","XGL","750","9VL","9WT"] },
    { vin: "WP0CC2A84LS240259", commission: "060807", modelYear: 2020, country: "Canada", productionDate: "5/19/2020", msrp: 128790.0, optionCodes: ["1A","24","424","XDK","P07","480","SSB","602","P13","087","489","573","342","EFA","XXB","9VL","9WT"] },
    { vin: "WP0CC2A80LS240260", commission: "059489", modelYear: 2020, country: "Canada", productionDate: "5/19/2020", msrp: 135095.0, optionCodes: ["U2","24","424","XDH","P07","XUB","546","519","XYB","480","SSB","602","630","P13","087","858","489","573","342","583","581","CZW","XLU","XXB","9VL","9WT","P40"] },
    { vin: "WP0CC2A84LS240262", commission: "058850", modelYear: 2020, country: "Canada", productionDate: "5/19/2020", msrp: 131820.0, optionCodes: ["U2","67","424","XDH","P07","XUB","519","480","SSB","602","630","P13","489","573","342","583","581","750","9VL","9WT","P40"] },
    { vin: "WP0CC2A86LS240263", commission: "D50094", modelYear: 2020, country: "USA", productionDate: "5/27/2020", msrp: 132130.0, optionCodes: ["A1","58","424","XDK","P11","XUB","546","519","CVM","480","450","602","630","P13","858","489","573","583","581","DFS","XHN","XFR","XGL","750","XNS","CUJ","XLU","EKG","XXD","9ZE","QH1","9VL","9WT","P40","Z1S","497"] },
    { vin: "WP0CC2A88LS240264", commission: "D79996", modelYear: 2020, country: "USA", productionDate: "5/20/2020", msrp: 114870.0, optionCodes: ["U2","21","424","446","P07","XUB","519","480","SSB","XEW","630","748","P13","573","342","583","581","DFS","XSX","XNS","XWK","XLU","P28","EFA","XXB","9ZE","9VL","9WT","Z1S"] },
    { vin: "WP0CC2A8XLS240265", commission: "059751", modelYear: 2020, country: "Canada", productionDate: "5/24/2020", msrp: 137050.0, optionCodes: ["A1","67","424","XDK","P11","519","XYB","480","SSB","602","630","748","P13","858","489","573","583","581","509","XSX","750","XNS","EKG","EFA","9VL","9WT","P40"] },
    { vin: "WP0CC2A81LS240266", commission: "058341", modelYear: 2020, country: "Canada", productionDate: "5/22/2020", msrp: 144010.0, optionCodes: ["A1","24","424","XDK","P11","480","450","600","630","748","P13","087","858","573","583","581","9ZE","9VJ","9WT","P40"] },
    { vin: "WP0CC2A83LS240267", commission: "D81204", modelYear: 2020, country: "USA", productionDate: "5/25/2020", msrp: 114560.0, optionCodes: ["U2","24","424","XDK","P11","CGU","546","XJA","519","480","SSB","XEW","087","573","581","CHL","EFA","9VL","9WT","Z1S"] },
    { vin: "WP0CC2A85LS240268", commission: "062364", modelYear: 2020, country: "Canada", productionDate: "5/25/2020", msrp: 130670.0, optionCodes: ["2Y","67","424","XDH","P11","XUB","519","480","SSB","602","630","858","583","581","509","XSX","750","P28","9VL","9WT"] }
  ];

  // ---------------------------------------------------------------------
  // Confirmed factory option codes -- mirrors `spyder_option_reference`.
  // Two sources, both from the same source sheet:
  //  (a) two matching "sticker" printouts of VIN WP0CC2A89MS240274 (no
  //      category/build-count, take rate only -- the original 21 codes)
  //  (b) the sheet's own "Options (1 of 3)" reference table, which gives
  //      real counts out of the full 1,067-build database and groups
  //      codes by category. Where a code appears in both, the numbers
  //      matched exactly (A1, XDK, P11, 519, 498, XYB) -- good
  //      cross-validation that both draw from the same underlying data.
  //      Only page 1 of 3 of that table has been provided so far; pages
  //      2-3 (presumably Transmission/Brakes/Electronics/Packages, etc.)
  //      are not yet imported.
  // ---------------------------------------------------------------------
  var TOTAL_BUILDS_DATABASE = 1067; // "718 Spyder Builds v1.0" full database size, per Options tab + MSRP histogram headers

  var OPTION_REFERENCE = {
    // -- Exterior Color --
    "0Q":  { description: "White", category: "Exterior Color", price: 0, takeRate: 9, buildCount: 93 },
    "A1":  { description: "Black", category: "Exterior Color", price: 0, takeRate: 11, buildCount: 120 },
    "G1":  { description: "Guards Red", category: "Exterior Color", price: 0, takeRate: 5, buildCount: 54 },
    "P3":  { description: "Racing Yellow", category: "Exterior Color", price: 0, takeRate: 2, buildCount: 26 },
    "2Y":  { description: "Carrara White Metallic", category: "Exterior Color", price: 650, takeRate: 11, buildCount: 114 },
    "U2":  { description: "GT Silver Metallic", category: "Exterior Color", price: 650, takeRate: 28, buildCount: 300 },
    "1A":  { description: "Gentian Blue Metallic", category: "Exterior Color", price: 650, takeRate: 13, buildCount: 139 },
    "3H":  { description: "Chalk", category: "Exterior Color", price: 2580, takeRate: 12, buildCount: 132 },
    "3I":  { description: "Python Green", category: "Exterior Color", price: 2580, takeRate: 2, buildCount: 20 },
    "J5":  { description: "Miami Blue", category: "Exterior Color", price: 2580, takeRate: 5, buildCount: 53 },
    "89":  { description: "Custom Color - PTS", category: "Exterior Color", price: 12830, takeRate: 1, buildCount: 16 },
    // -- Wheels --
    "XDH": { description: "Wheels Painted in Satin Platinum", category: "Wheels", price: 1290, takeRate: 21, buildCount: 226 },
    "XDK": { description: "Wheels Painted in Satin Black", category: "Wheels", price: 1290, takeRate: 34, buildCount: 366 },
    "XGG": { description: "Wheels Painted in Satin Aurum", category: "Wheels", price: 1290, takeRate: 2, buildCount: 25 },
    "446": { description: "Wheel Center Caps with Colored Porsche Crest", category: "Wheels", price: 190, takeRate: 22, buildCount: 237 },
    "049": { description: "High Performance Summer Tires", category: "Wheels", price: 0, takeRate: 10, buildCount: 103 },
    "424": { description: "20\" 718 Spyder Wheels", category: "Wheels", price: 0, takeRate: 100, buildCount: null },
    // -- Interior Colors and Materials --
    "11":  { description: "Standard Interior in Black/Race-Tex (Limited Leather)", category: "Interior Colors and Materials", price: 0, takeRate: 10, buildCount: 106 },
    "21":  { description: "Standard Interior in Black/Race-Tex (More Leather)", category: "Interior Colors and Materials", price: 2160, takeRate: 6, buildCount: 65 },
    "58":  { description: "Leather/Race-Tex Interior in Black with Yellow Stitching", category: "Interior Colors and Materials", price: 2160, takeRate: 12, buildCount: 132 },
    "67":  { description: "Leather/Race-Tex Interior in Black with Red Stitching", category: "Interior Colors and Materials", price: 2160, takeRate: 15, buildCount: 164 },
    "79":  { description: "Leather/Race-Tex Interior in Black with Silver Stitching", category: "Interior Colors and Materials", price: 2160, takeRate: 24, buildCount: 258 },
    "24":  { description: "Spyder Classic Interior Package", category: "Interior Colors and Materials", price: 0, takeRate: 32, buildCount: 342 },
    // -- Seats --
    "P04": { description: "Sport Seats Plus (2-way)", category: "Seats", price: 0, takeRate: 20, buildCount: 216 },
    "P07": { description: "Adaptive Sport Seats Plus (18-way)", category: "Seats", price: 2640, takeRate: 51, buildCount: 544 },
    "P11": { description: "Full Bucket Seats", category: "Seats", price: 5900, takeRate: 29, buildCount: 307 },
    // -- Deviated Seat Centers and Stitching --
    "XVX": { description: "Extended Deviated Stitching Interior Package", category: "Deviated Seat Centers and Stitching", price: 3230, takeRate: 3, buildCount: 27 },
    "XVA": { description: "Steering Column Casing in Leather with Deviated Stitching", category: "Deviated Seat Centers and Stitching", price: 610, takeRate: 2, buildCount: 17 },
    "XVB": { description: "Inner Door-Sill Guards in Leather with Deviated Stitching", category: "Deviated Seat Centers and Stitching", price: 760, takeRate: 1, buildCount: 9 },
    "XVC": { description: "Sport Seats Plus Backrest Shells and Trim in Leather with Deviated Stitching", category: "Deviated Seat Centers and Stitching", price: 1770, takeRate: 0, buildCount: 5, note: "description partially cut off in source screenshot; ending inferred from category pattern" },
    // -- Exterior --
    "XUB": { description: "Headlight Cleaning System Covers Painted in Exterior Color", category: "Exterior", price: 300, takeRate: 23, buildCount: 245 },
    "CGU": { description: "Headlight Cleaning System Covers in Deviated Exterior Color", category: "Exterior", price: 300, takeRate: 3, buildCount: 29 },
    "546": { description: "Supplemental Safety Bars in Exterior Color", category: "Exterior", price: 640, takeRate: 42, buildCount: 443 },
    "XJA": { description: "Door Handles in High Gloss Black", category: "Exterior", price: 170, takeRate: 12, buildCount: 130 },
    "519": { description: "“PORSCHE” Logo on Rear in Satin Black", category: "Exterior", price: 220, takeRate: 32, buildCount: 340 },
    "CUC": { description: "Model Designation on Rear Painted", category: "Exterior", price: 350, takeRate: 4, buildCount: 39 },
    "498": { description: "Deletion of Model Designation on Rear", category: "Exterior", price: 0, takeRate: 17, buildCount: 181 },
    "XYB": { description: "Exclusive Design Fuel Cap (Aluminum Look)", category: "Exterior", price: 160, takeRate: 31, buildCount: 336 },
    "CVM": { description: "718 Spyder Logo in High Gloss Black", category: "Exterior", price: 350, takeRate: 10, buildCount: 103 },
    // -- Not yet matched to an Options-tab category (from the two single-VIN sticker samples only) --
    "480": { description: "6-speed Manual Transmission", category: null, price: 0, takeRate: 82, buildCount: null },
    "450": { description: "Porsche Ceramic Composite Brakes (PCCB) with Calipers in Yellow", category: null, price: 8000, takeRate: 25, buildCount: null },
    "602": { description: "LED Headlights with Porsche Dynamic Light System Plus (PDLS+)", category: null, price: 2140, takeRate: 63, buildCount: null },
    "748": { description: "Power Folding Exterior Mirrors", category: null, price: 330, takeRate: 42, buildCount: null },
    "583": { description: "Smoking Package", category: null, price: 0, takeRate: 76, buildCount: null },
    "581": { description: "Luggage Net in Passenger Footwell", category: null, price: 0, takeRate: 79, buildCount: null },
    "509": { description: "Fire Extinguisher", category: null, price: 140, takeRate: 26, buildCount: null },
    "EKG": { description: "Interior Trim in Carbon Fiber i.c.w. Leather Interior", category: null, price: 790, takeRate: 23, buildCount: null },
    "XXD": { description: "Door-Sill Guards in Carbon Fiber, Illuminated", category: null, price: 1210, takeRate: 16, buildCount: null },
    "9VK": { description: "Sound Package Plus", category: null, price: 0, takeRate: 10, buildCount: null },
    "9WT": { description: "Apple CarPlay® incl. Siri®", category: null, price: 360, takeRate: 87, buildCount: null },
    "P40": { description: "Navigation including Porsche Connect", category: null, price: 2320, takeRate: 37, buildCount: null },
    "Z1S": { description: "Included First Year / 10,000 Mile Maintenance", category: null, price: 0, takeRate: 82, buildCount: null }
  };

  // ---------------------------------------------------------------------
  // MSRP distribution -- mirrors `spyder_msrp_distribution` (26 buckets,
  // $2,000-wide, sums exactly to 1,067). From the "Number of Builds
  // within Price Points" chart (Canadian builds priced as US builds).
  // ---------------------------------------------------------------------
  var MSRP_DISTRIBUTION = [
    { bucket: 96000, count: 3 }, { bucket: 98000, count: 4 }, { bucket: 100000, count: 9 },
    { bucket: 102000, count: 19 }, { bucket: 104000, count: 41 }, { bucket: 106000, count: 56 },
    { bucket: 108000, count: 77 }, { bucket: 110000, count: 103 }, { bucket: 112000, count: 124 },
    { bucket: 114000, count: 124 }, { bucket: 116000, count: 111 }, { bucket: 118000, count: 80 },
    { bucket: 120000, count: 45 }, { bucket: 122000, count: 47 }, { bucket: 124000, count: 51 },
    { bucket: 126000, count: 37 }, { bucket: 128000, count: 48 }, { bucket: 130000, count: 27 },
    { bucket: 132000, count: 24 }, { bucket: 134000, count: 17 }, { bucket: 136000, count: 8 },
    { bucket: 138000, count: 6 }, { bucket: 140000, count: 4 }, { bucket: 142000, count: 0 },
    { bucket: 144000, count: 0 }, { bucket: 146000, count: 2 }
  ];

  // ---------------------------------------------------------------------
  // Category-level take rates without individual factory codes (pie
  // charts) -- mirrors `spyder_feature_distribution`.
  // ---------------------------------------------------------------------
  var FEATURE_DISTRIBUTION = {
    "Headlights": [
      { name: "LED with PDLS+", takeRate: 63 },
      { name: "Bi-Xenon without PDLS", takeRate: 20 },
      { name: "Bi-Xenon with PDLS", takeRate: 17 }
    ],
    "Sound System": [
      { name: "Bose", takeRate: 75 },
      { name: "Burmester", takeRate: 15 },
      { name: "Sound Package Plus", takeRate: 10 }
    ]
  };

  function getMsrpDistribution() {
    return MSRP_DISTRIBUTION;
  }

  function getFeatureDistribution(category) {
    return category ? (FEATURE_DISTRIBUTION[category] || null) : FEATURE_DISTRIBUTION;
  }

  var BUILDS_BY_VIN = {};
  BUILDS.forEach(function (b) {
    BUILDS_BY_VIN[b.vin.toUpperCase()] = b;
  });

  function getBuildByVin(vin) {
    if (!vin) return null;
    var hit = BUILDS_BY_VIN[String(vin).trim().toUpperCase()];
    return hit || null;
  }

  function getOptionDescription(code) {
    return OPTION_REFERENCE[code] || null;
  }

  // Builds the "Print It"-style itemized breakdown for a matched build:
  // base price + delivery + options total = MSRP (matches the source
  // sheet's own sticker math), plus an itemized list with descriptions
  // where known.
  function getPrintSheet(vin) {
    var build = getBuildByVin(vin);
    if (!build) return null;

    var base = build.modelYear === 2020 ? BASE_PRICE_2020 : null;
    var delivery = build.modelYear === 2020 ? DELIVERY_FEE_2020 : null;
    var optionsTotal = (base !== null && delivery !== null) ? (build.msrp - base - delivery) : null;

    var items = build.optionCodes.map(function (code) {
      var ref = getOptionDescription(code);
      return {
        code: code,
        description: ref ? ref.description : null,
        price: ref ? ref.price : null,
        priceLabel: ref ? ("$" + ref.price.toLocaleString()) : "—",
        takeRate: ref ? ref.takeRate : null
      };
    });

    return {
      vin: build.vin,
      commission: build.commission,
      modelYear: build.modelYear,
      country: build.country,
      productionDate: build.productionDate,
      msrp: build.msrp,
      msrpLabel: "$" + build.msrp.toLocaleString(),
      basePrice: base,
      basePriceLabel: base !== null ? ("$" + base.toLocaleString()) : "—",
      deliveryFee: delivery,
      deliveryFeeLabel: delivery !== null ? ("$" + delivery.toLocaleString()) : "—",
      optionsTotal: optionsTotal,
      optionsTotalLabel: optionsTotal !== null ? ("$" + optionsTotal.toLocaleString()) : "—",
      items: items
    };
  }

  // A build's "rarity score" -- the average take rate of its options that
  // resolve against OPTION_REFERENCE. Lower average = rarer combination
  // (more of its options are low-take-rate choices). This is a real
  // statistic computed from the 151 verified builds we actually have --
  // not a market valuation, and only ever returned for a VIN in that set.
  function rarityScore(build) {
    var rates = [];
    build.optionCodes.forEach(function (code) {
      var ref = OPTION_REFERENCE[code];
      if (ref && ref.takeRate != null) rates.push(ref.takeRate);
    });
    if (!rates.length) return null;
    return rates.reduce(function (a, b) { return a + b; }, 0) / rates.length;
  }

  // Ranks a matched VIN's rarity score against every other verified build
  // in the 151-record sample. Returns null for VINs with no match or no
  // scoreable options -- never a fabricated percentile.
  function getSpecRarityPercentile(vin) {
    var build = getBuildByVin(vin);
    if (!build) return null;
    var thisScore = rarityScore(build);
    if (thisScore === null) return null;

    var scored = BUILDS.map(rarityScore).filter(function (s) { return s !== null; });
    if (scored.length < 2) return null;
    scored.sort(function (a, b) { return a - b; }); // ascending: index 0 = lowest score = rarest

    var rank = scored.findIndex(function (s) { return s >= thisScore; }); // 0-indexed position
    if (rank === -1) rank = scored.length - 1;
    // rarerThanPct = share of the sample with a *higher* (more common) score
    // than this build -- i.e. how much of the field this build is rarer than.
    var rarerThanPct = Math.round(((scored.length - 1 - rank) / (scored.length - 1)) * 100);

    return {
      rarerThanPct: rarerThanPct,
      rank: rank + 1, // 1 = rarest
      sampleSize: scored.length
    };
  }

  window.SophiaSpyderBuilds = {
    builds: BUILDS,
    optionReference: OPTION_REFERENCE,
    msrpDistribution: MSRP_DISTRIBUTION,
    featureDistribution: FEATURE_DISTRIBUTION,
    totalBuildsDatabase: TOTAL_BUILDS_DATABASE,
    getBuildByVin: getBuildByVin,
    getOptionDescription: getOptionDescription,
    getPrintSheet: getPrintSheet,
    getMsrpDistribution: getMsrpDistribution,
    getFeatureDistribution: getFeatureDistribution,
    getSpecRarityPercentile: getSpecRarityPercentile
  };
})();
