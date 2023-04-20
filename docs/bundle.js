(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pnp_calc_1 = require("pnp-calc");
const simulator = new pnp_calc_1.PnpSimulator();
function initDOM() {
    createSkillFields();
    createTalentFields();
    setListeners();
}
function createSkillFields() {
    const skillWrapperDiv = document.getElementById('skillContent');
    for (let stat of Object.values(pnp_calc_1.CharacterStats).filter(x => typeof x === "string")) {
        skillWrapperDiv.appendChild(createSkillElement(stat));
    }
}
function createSkillElement(stat) {
    const div = document.createElement("div");
    div.setAttribute("id", `${stat}Wrapper`);
    div.classList.add("skill-item");
    const textDiv = document.createElement("div");
    textDiv.textContent = stat;
    div.appendChild(textDiv);
    const input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("value", "8");
    input.setAttribute("min", "0");
    input.setAttribute("max", "18");
    div.appendChild(input);
    return div;
}
function createTalentFields() {
    const skillWrapperDiv = document.getElementById('talentWrapper');
    for (let talent of Object.keys(pnp_calc_1.defaultTalents)) {
        skillWrapperDiv.appendChild(createTalentElement(talent));
    }
}
function createTalentElement(talent) {
    const tr = document.createElement("tr");
    tr.setAttribute("id", `${talent}Row`);
    const td1 = document.createElement("td");
    td1.textContent = talent;
    const td2 = document.createElement("td");
    const input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("value", "0");
    input.setAttribute("min", "0");
    input.setAttribute("max", "18");
    td2.appendChild(input);
    const td3 = document.createElement("td");
    const display = document.createElement("input");
    display.classList.add("resultDisplay");
    display.setAttribute("disabled", "true");
    td3.appendChild(display);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    return tr;
}
function simulate() {
    const characterStats = extractSkillValues();
    const talentValues = extractTalentValues();
    const rollAmount = document.getElementById("throwAmount").value;
    if (Number.parseInt(rollAmount)) {
        simulator.rollAmount = Number.parseInt(rollAmount);
    }
    else {
        console.error("Simulate Amount is not a number!");
    }
    simulator.roll();
    const simResult = simulator.evaluate(new pnp_calc_1.Character(characterStats, talentValues));
    assignResults(simResult);
}
function extractSkillValues() {
    return {
        mu: getSkillWrapperValue("MU"),
        kl: getSkillWrapperValue("KL"),
        in: getSkillWrapperValue("IN"),
        ch: getSkillWrapperValue("CH"),
        ff: getSkillWrapperValue("FF"),
        ge: getSkillWrapperValue("GE"),
        ko: getSkillWrapperValue("KO"),
        kk: getSkillWrapperValue("KK")
    };
}
function extractTalentValues() {
    return {
        Gaukelei: getTalentWrapperValue("Gaukelei"),
        Klettern: getTalentWrapperValue("Klettern"),
        Koerperbeherrschung: getTalentWrapperValue("Koerperbeherrschung"),
        Kraftakt: getTalentWrapperValue("Kraftakt"),
        Reiten: getTalentWrapperValue("Reiten"),
        Schwimmen: getTalentWrapperValue("Schwimmen"),
        Selbstbeherrschung: getTalentWrapperValue("Selbstbeherrschung"),
        Singen: getTalentWrapperValue("Singen"),
        Sinnesschärfe: getTalentWrapperValue("Sinnesschärfe"),
        Tanzen: getTalentWrapperValue("Tanzen"),
        Taschendiebstahl: getTalentWrapperValue("Taschendiebstahl"),
        Verbergen: getTalentWrapperValue("Verbergen"),
        Zechen: getTalentWrapperValue("Zechen"),
        Faehrtensuchen: getTalentWrapperValue("Faehrtensuchen"),
        Fesseln: getTalentWrapperValue("Fesseln"),
        Fischen: getTalentWrapperValue("Fischen"),
        Orientierung: getTalentWrapperValue("Orientierung"),
        Pflanzenkunde: getTalentWrapperValue("Pflanzenkunde"),
        Tierkunde: getTalentWrapperValue("Tierkunde"),
        Wildnisleben: getTalentWrapperValue("Wildnisleben"),
        Brettspiele: getTalentWrapperValue("Brettspiele"),
        Geographie: getTalentWrapperValue("Geographie"),
        Geschichtswissen: getTalentWrapperValue("Geschichtswissen"),
        GoetterKulte: getTalentWrapperValue("GoetterKulte"),
        Kriegskunst: getTalentWrapperValue("Kriegskunst"),
        Magiekunnde: getTalentWrapperValue("Magiekunnde"),
        Mechanik: getTalentWrapperValue("Mechanik"),
        Rechnen: getTalentWrapperValue("Rechnen"),
        Rechtskunde: getTalentWrapperValue("Rechtskunde"),
        SagenLegenden: getTalentWrapperValue("SagenLegenden"),
        BekehrenUeberzeugen: getTalentWrapperValue("BekehrenUeberzeugen"),
        Betoeren: getTalentWrapperValue("Betoeren"),
        Einschuechtern: getTalentWrapperValue("Einschuechtern"),
        Etikette: getTalentWrapperValue("Etikette"),
        Gassenwissen: getTalentWrapperValue("Gassenwissen"),
        Menschenkenntnis: getTalentWrapperValue("Menschenkenntnis"),
        Ueberreden: getTalentWrapperValue("Ueberreden"),
        Verkleiden: getTalentWrapperValue("Verkleiden"),
        Willenskraft: getTalentWrapperValue("Willenskraft"),
        Alchimie: getTalentWrapperValue("Alchimie"),
        BooteSchiffe: getTalentWrapperValue("BooteSchiffe"),
        Fahrzeuge: getTalentWrapperValue("Fahrzeuge"),
        Handel: getTalentWrapperValue("Handel"),
        HeilkundeGift: getTalentWrapperValue("HeilkundeGift"),
        HeilkundeKrankheiten: getTalentWrapperValue("HeilkundeKrankheiten"),
        HeilkundeSeele: getTalentWrapperValue("HeilkundeSeele"),
        HeilkundeWunden: getTalentWrapperValue("HeilkundeWunden"),
        Holzbearbeitung: getTalentWrapperValue("Holzbearbeitung"),
        Lebensmittelbearbeitung: getTalentWrapperValue("Lebensmittelbearbeitung"),
        Lederbearbeitung: getTalentWrapperValue("Lederbearbeitung"),
        MalenZeichnen: getTalentWrapperValue("MalenZeichnen"),
        Metallbearbeitung: getTalentWrapperValue("Metallbearbeitung"),
        Musizieren: getTalentWrapperValue("Musizieren"),
        Schloesserknacken: getTalentWrapperValue("Schloesserknacken"),
        Steinbearbeitung: getTalentWrapperValue("Steinbearbeitung"),
        Stoffbearbeitung: getTalentWrapperValue("Stoffbearbeitung")
    };
}
function getSkillWrapperValue(name) {
    const value = document.querySelector(`#${name}Wrapper input`).value;
    if (!Number.isNaN(Number.parseInt(value))) {
        return Number.parseInt(value);
    }
    else {
        throw Error(`${name} is not a number!`);
    }
}
function getTalentWrapperValue(name) {
    const value = document.querySelector(`#${name}Row input`).value;
    if (!Number.isNaN(Number.parseInt(value))) {
        return Number.parseInt(value);
    }
    else {
        throw Error(`${name} is not a number!`);
    }
}
function getTalentOutput(name) {
    try {
        if (Number.parseInt(name[0])) {
            // hack for 1Hit etc.
            return document.querySelector(`#Stat${name} .resultDisplay`);
        }
        return document.querySelector(`#${name}Row .resultDisplay`);
    }
    catch (err) {
        console.error(err);
        return undefined;
    }
}
function setListeners() {
    document.getElementById("simulateButton").addEventListener("click", simulate);
}
initDOM();
function assignResults(simResult) {
    for (let [key, value] of simResult) {
        const outputField = getTalentOutput(key);
        if (outputField) {
            outputField.value = `${(value / simulator.rollAmount * 100).toFixed(2)}%`;
        }
    }
}

},{"pnp-calc":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Character = void 0;
var _stats = require("./stats");
var _talent = require("./talent");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Character = /*#__PURE__*/function () {
  function Character(statValues, talentValues) {
    _classCallCheck(this, Character);
    this.skills = new Map();
    this.talents = new Map();
    this.setSkills(statValues);
    this.setTalents(talentValues);
  }
  _createClass(Character, [{
    key: "setSkills",
    value: function setSkills(statValues) {
      this.skills.set(_stats.CharacterStats.MU, statValues.mu);
      this.skills.set(_stats.CharacterStats.KL, statValues.kl);
      this.skills.set(_stats.CharacterStats.IN, statValues["in"]);
      this.skills.set(_stats.CharacterStats.CH, statValues.ch);
      this.skills.set(_stats.CharacterStats.FF, statValues.ff);
      this.skills.set(_stats.CharacterStats.GE, statValues.ge);
      this.skills.set(_stats.CharacterStats.KO, statValues.ko);
      this.skills.set(_stats.CharacterStats.KK, statValues.kk);
    }
  }, {
    key: "setTalents",
    value: function setTalents(talentValues) {
      this.talents.set(_talent.Talent.Gaukelei, talentValues.Gaukelei);
      this.talents.set(_talent.Talent.Klettern, talentValues.Klettern);
      this.talents.set(_talent.Talent.Koerperbeherrschung, talentValues.Koerperbeherrschung);
      this.talents.set(_talent.Talent.Kraftakt, talentValues.Kraftakt);
      this.talents.set(_talent.Talent.Reiten, talentValues.Reiten);
      this.talents.set(_talent.Talent.Schwimmen, talentValues.Schwimmen);
      this.talents.set(_talent.Talent.Selbstbeherrschung, talentValues.Selbstbeherrschung);
      this.talents.set(_talent.Talent.Singen, talentValues.Singen);
      this.talents.set(_talent.Talent.Sinnesschärfe, talentValues.Sinnesschärfe);
      this.talents.set(_talent.Talent.Tanzen, talentValues.Tanzen);
      this.talents.set(_talent.Talent.Taschendiebstahl, talentValues.Taschendiebstahl);
      this.talents.set(_talent.Talent.Verbergen, talentValues.Verbergen);
      this.talents.set(_talent.Talent.Zechen, talentValues.Zechen);
      this.talents.set(_talent.Talent.Faehrtensuchen, talentValues.Faehrtensuchen);
      this.talents.set(_talent.Talent.Fesseln, talentValues.Fesseln);
      this.talents.set(_talent.Talent.Fischen, talentValues.Fischen);
      this.talents.set(_talent.Talent.Orientierung, talentValues.Orientierung);
      this.talents.set(_talent.Talent.Pflanzenkunde, talentValues.Pflanzenkunde);
      this.talents.set(_talent.Talent.Tierkunde, talentValues.Tierkunde);
      this.talents.set(_talent.Talent.Wildnisleben, talentValues.Wildnisleben);
      this.talents.set(_talent.Talent.Brettspiele, talentValues.Brettspiele);
      this.talents.set(_talent.Talent.Geographie, talentValues.Geographie);
      this.talents.set(_talent.Talent.Geschichtswissen, talentValues.Geschichtswissen);
      this.talents.set(_talent.Talent.GoetterKulte, talentValues.GoetterKulte);
      this.talents.set(_talent.Talent.Kriegskunst, talentValues.Kriegskunst);
      this.talents.set(_talent.Talent.Magiekunnde, talentValues.Magiekunnde);
      this.talents.set(_talent.Talent.Mechanik, talentValues.Mechanik);
      this.talents.set(_talent.Talent.Rechnen, talentValues.Rechnen);
      this.talents.set(_talent.Talent.Rechtskunde, talentValues.Rechtskunde);
      this.talents.set(_talent.Talent.SagenLegenden, talentValues.SagenLegenden);
      this.talents.set(_talent.Talent.BekehrenUeberzeugen, talentValues.BekehrenUeberzeugen);
      this.talents.set(_talent.Talent.Betoeren, talentValues.Betoeren);
      this.talents.set(_talent.Talent.Einschuechtern, talentValues.Einschuechtern);
      this.talents.set(_talent.Talent.Etikette, talentValues.Etikette);
      this.talents.set(_talent.Talent.Gassenwissen, talentValues.Gassenwissen);
      this.talents.set(_talent.Talent.Menschenkenntnis, talentValues.Menschenkenntnis);
      this.talents.set(_talent.Talent.Ueberreden, talentValues.Ueberreden);
      this.talents.set(_talent.Talent.Verkleiden, talentValues.Verkleiden);
      this.talents.set(_talent.Talent.Willenskraft, talentValues.Willenskraft);
      this.talents.set(_talent.Talent.Alchimie, talentValues.Alchimie);
      this.talents.set(_talent.Talent.BooteSchiffe, talentValues.BooteSchiffe);
      this.talents.set(_talent.Talent.Fahrzeuge, talentValues.Fahrzeuge);
      this.talents.set(_talent.Talent.Handel, talentValues.Handel);
      this.talents.set(_talent.Talent.HeilkundeGift, talentValues.HeilkundeGift);
      this.talents.set(_talent.Talent.HeilkundeKrankheiten, talentValues.HeilkundeKrankheiten);
      this.talents.set(_talent.Talent.HeilkundeSeele, talentValues.HeilkundeSeele);
      this.talents.set(_talent.Talent.HeilkundeWunden, talentValues.HeilkundeWunden);
      this.talents.set(_talent.Talent.Holzbearbeitung, talentValues.Holzbearbeitung);
      this.talents.set(_talent.Talent.Lebensmittelbearbeitung, talentValues.Lebensmittelbearbeitung);
      this.talents.set(_talent.Talent.Lederbearbeitung, talentValues.Lederbearbeitung);
      this.talents.set(_talent.Talent.MalenZeichnen, talentValues.MalenZeichnen);
      this.talents.set(_talent.Talent.Metallbearbeitung, talentValues.Metallbearbeitung);
      this.talents.set(_talent.Talent.Musizieren, talentValues.Musizieren);
      this.talents.set(_talent.Talent.Schloesserknacken, talentValues.Schloesserknacken);
      this.talents.set(_talent.Talent.Steinbearbeitung, talentValues.Steinbearbeitung);
      this.talents.set(_talent.Talent.Stoffbearbeitung, talentValues.Stoffbearbeitung);
    }
  }]);
  return Character;
}();
exports.Character = Character;

},{"./stats":3,"./talent":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterStats = void 0;
var CharacterStats;
exports.CharacterStats = CharacterStats;
(function (CharacterStats) {
  CharacterStats[CharacterStats["MU"] = 0] = "MU";
  CharacterStats[CharacterStats["KL"] = 1] = "KL";
  CharacterStats[CharacterStats["IN"] = 2] = "IN";
  CharacterStats[CharacterStats["CH"] = 3] = "CH";
  CharacterStats[CharacterStats["FF"] = 4] = "FF";
  CharacterStats[CharacterStats["GE"] = 5] = "GE";
  CharacterStats[CharacterStats["KO"] = 6] = "KO";
  CharacterStats[CharacterStats["KK"] = 7] = "KK";
})(CharacterStats || (exports.CharacterStats = CharacterStats = {}));

},{}],4:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTalents = exports.Talent = void 0;
var _stats = require("./stats");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var Talent = /*#__PURE__*/_createClass(function Talent(name, first, second, third) {
  _classCallCheck(this, Talent);
  this.name = name;
  this.first = first;
  this.second = second;
  this.third = third;
});
exports.Talent = Talent;
Talent.Gaukelei = new Talent("Gaukelei", _stats.CharacterStats.MU, _stats.CharacterStats.CH, _stats.CharacterStats.FF);
Talent.Klettern = new Talent("Klettern", _stats.CharacterStats.MU, _stats.CharacterStats.GE, _stats.CharacterStats.KK);
Talent.Koerperbeherrschung = new Talent("Koerperbeherrschung", _stats.CharacterStats.GE, _stats.CharacterStats.GE, _stats.CharacterStats.KO);
Talent.Kraftakt = new Talent("Kraftakt", _stats.CharacterStats.KO, _stats.CharacterStats.KK, _stats.CharacterStats.KK);
Talent.Reiten = new Talent("Reiten", _stats.CharacterStats.CH, _stats.CharacterStats.GE, _stats.CharacterStats.KK);
Talent.Schwimmen = new Talent("Schwimmen", _stats.CharacterStats.GE, _stats.CharacterStats.KO, _stats.CharacterStats.KK);
Talent.Selbstbeherrschung = new Talent("Selbstbeherrschung", _stats.CharacterStats.MU, _stats.CharacterStats.MU, _stats.CharacterStats.KO);
Talent.Singen = new Talent("Singen", _stats.CharacterStats.KL, _stats.CharacterStats.CH, _stats.CharacterStats.KO);
Talent.Sinnesschärfe = new Talent("Sinnesschärfe", _stats.CharacterStats.KL, _stats.CharacterStats.IN, _stats.CharacterStats.IN);
Talent.Tanzen = new Talent("Tanzen", _stats.CharacterStats.KL, _stats.CharacterStats.CH, _stats.CharacterStats.GE);
Talent.Taschendiebstahl = new Talent("Taschendiebstahl", _stats.CharacterStats.MU, _stats.CharacterStats.FF, _stats.CharacterStats.GE);
Talent.Verbergen = new Talent("Verbergen", _stats.CharacterStats.MU, _stats.CharacterStats.IN, _stats.CharacterStats.GE);
Talent.Zechen = new Talent("Zechen", _stats.CharacterStats.KL, _stats.CharacterStats.KO, _stats.CharacterStats.KK);
Talent.Faehrtensuchen = new Talent("Faehrtensuchen", _stats.CharacterStats.MU, _stats.CharacterStats.IN, _stats.CharacterStats.GE);
Talent.Fesseln = new Talent("Fesseln", _stats.CharacterStats.KL, _stats.CharacterStats.FF, _stats.CharacterStats.KK);
Talent.Fischen = new Talent("Fischen", _stats.CharacterStats.FF, _stats.CharacterStats.GE, _stats.CharacterStats.KO);
Talent.Orientierung = new Talent("Orientierung", _stats.CharacterStats.KL, _stats.CharacterStats.IN, _stats.CharacterStats.IN);
Talent.Pflanzenkunde = new Talent("Pflanzenkunde", _stats.CharacterStats.KL, _stats.CharacterStats.FF, _stats.CharacterStats.KO);
Talent.Tierkunde = new Talent("Tierkunde", _stats.CharacterStats.MU, _stats.CharacterStats.MU, _stats.CharacterStats.CH);
Talent.Wildnisleben = new Talent("Wildnisleben", _stats.CharacterStats.MU, _stats.CharacterStats.GE, _stats.CharacterStats.KO);
Talent.Brettspiele = new Talent("Brettspiele", _stats.CharacterStats.KL, _stats.CharacterStats.KL, _stats.CharacterStats.IN);
Talent.Geographie = new Talent("Geographie", _stats.CharacterStats.KL, _stats.CharacterStats.KL, _stats.CharacterStats.IN);
Talent.Geschichtswissen = new Talent("Geschichtswissen", _stats.CharacterStats.KL, _stats.CharacterStats.KL, _stats.CharacterStats.IN);
Talent.GoetterKulte = new Talent("GoetterKulte", _stats.CharacterStats.KL, _stats.CharacterStats.KL, _stats.CharacterStats.IN);
Talent.Kriegskunst = new Talent("Kriegskunst", _stats.CharacterStats.MU, _stats.CharacterStats.KL, _stats.CharacterStats.IN);
Talent.Magiekunnde = new Talent("Magiekunnde", _stats.CharacterStats.KL, _stats.CharacterStats.KL, _stats.CharacterStats.IN);
Talent.Mechanik = new Talent("Mechanik", _stats.CharacterStats.KL, _stats.CharacterStats.KL, _stats.CharacterStats.FF);
Talent.Rechnen = new Talent("Rechnen", _stats.CharacterStats.KL, _stats.CharacterStats.KL, _stats.CharacterStats.IN);
Talent.Rechtskunde = new Talent("Rechtskunde", _stats.CharacterStats.KL, _stats.CharacterStats.KL, _stats.CharacterStats.IN);
Talent.SagenLegenden = new Talent("SagenLegenden", _stats.CharacterStats.KL, _stats.CharacterStats.KL, _stats.CharacterStats.IN);
Talent.BekehrenUeberzeugen = new Talent("BekehrenUeberzeugen", _stats.CharacterStats.MU, _stats.CharacterStats.KL, _stats.CharacterStats.CH);
Talent.Betoeren = new Talent("Betoeren", _stats.CharacterStats.MU, _stats.CharacterStats.CH, _stats.CharacterStats.CH);
Talent.Einschuechtern = new Talent("Einschuechtern", _stats.CharacterStats.MU, _stats.CharacterStats.IN, _stats.CharacterStats.CH);
Talent.Etikette = new Talent("Etikette", _stats.CharacterStats.KL, _stats.CharacterStats.IN, _stats.CharacterStats.CH);
Talent.Gassenwissen = new Talent("Gassenwissen", _stats.CharacterStats.KL, _stats.CharacterStats.IN, _stats.CharacterStats.CH);
Talent.Menschenkenntnis = new Talent("Menschenkenntnis", _stats.CharacterStats.KL, _stats.CharacterStats.IN, _stats.CharacterStats.CH);
Talent.Ueberreden = new Talent("Ueberreden", _stats.CharacterStats.MU, _stats.CharacterStats.IN, _stats.CharacterStats.CH);
Talent.Verkleiden = new Talent("Verkleiden", _stats.CharacterStats.IN, _stats.CharacterStats.CH, _stats.CharacterStats.GE);
Talent.Willenskraft = new Talent("Willenskraft", _stats.CharacterStats.MU, _stats.CharacterStats.IN, _stats.CharacterStats.CH);
Talent.Alchimie = new Talent("Alchimie", _stats.CharacterStats.MU, _stats.CharacterStats.KL, _stats.CharacterStats.FF);
Talent.BooteSchiffe = new Talent("BooteSchiffe", _stats.CharacterStats.FF, _stats.CharacterStats.GE, _stats.CharacterStats.KK);
Talent.Fahrzeuge = new Talent("Fahrzeuge", _stats.CharacterStats.CH, _stats.CharacterStats.FF, _stats.CharacterStats.KO);
Talent.Handel = new Talent("Handel", _stats.CharacterStats.KL, _stats.CharacterStats.IN, _stats.CharacterStats.CH);
Talent.HeilkundeGift = new Talent("HeilkundeGift", _stats.CharacterStats.MU, _stats.CharacterStats.KL, _stats.CharacterStats.IN);
Talent.HeilkundeKrankheiten = new Talent("HeilkundeKrankheiten", _stats.CharacterStats.MU, _stats.CharacterStats.IN, _stats.CharacterStats.KO);
Talent.HeilkundeSeele = new Talent("HeilkundeSeele", _stats.CharacterStats.IN, _stats.CharacterStats.CH, _stats.CharacterStats.KO);
Talent.HeilkundeWunden = new Talent("HeilkundeWunden", _stats.CharacterStats.KL, _stats.CharacterStats.FF, _stats.CharacterStats.FF);
Talent.Holzbearbeitung = new Talent("Holzbearbeitung", _stats.CharacterStats.FF, _stats.CharacterStats.GE, _stats.CharacterStats.KK);
Talent.Lebensmittelbearbeitung = new Talent("Lebensmittelbearbeitung", _stats.CharacterStats.IN, _stats.CharacterStats.FF, _stats.CharacterStats.FF);
Talent.Lederbearbeitung = new Talent("Lederbearbeitung", _stats.CharacterStats.FF, _stats.CharacterStats.GE, _stats.CharacterStats.KO);
Talent.MalenZeichnen = new Talent("MalenZeichnen", _stats.CharacterStats.IN, _stats.CharacterStats.FF, _stats.CharacterStats.FF);
Talent.Metallbearbeitung = new Talent("Metallbearbeitung", _stats.CharacterStats.FF, _stats.CharacterStats.KO, _stats.CharacterStats.KK);
Talent.Musizieren = new Talent("Musizieren", _stats.CharacterStats.CH, _stats.CharacterStats.FF, _stats.CharacterStats.KO);
Talent.Schloesserknacken = new Talent("Schloesserknacken", _stats.CharacterStats.IN, _stats.CharacterStats.FF, _stats.CharacterStats.FF);
Talent.Steinbearbeitung = new Talent("Steinbearbeitung", _stats.CharacterStats.FF, _stats.CharacterStats.FF, _stats.CharacterStats.KK);
Talent.Stoffbearbeitung = new Talent("Stoffbearbeitung", _stats.CharacterStats.KL, _stats.CharacterStats.FF, _stats.CharacterStats.FF);
Talent.ALL_TALENTS = [Talent.Gaukelei, Talent.Klettern, Talent.Koerperbeherrschung, Talent.Kraftakt, Talent.Reiten, Talent.Schwimmen, Talent.Selbstbeherrschung, Talent.Singen, Talent.Sinnesschärfe, Talent.Tanzen, Talent.Taschendiebstahl, Talent.Verbergen, Talent.Zechen, Talent.Faehrtensuchen, Talent.Fesseln, Talent.Fischen, Talent.Orientierung, Talent.Pflanzenkunde, Talent.Tierkunde, Talent.Wildnisleben, Talent.Brettspiele, Talent.Geographie, Talent.Geschichtswissen, Talent.GoetterKulte, Talent.Kriegskunst, Talent.Magiekunnde, Talent.Mechanik, Talent.Rechnen, Talent.Rechtskunde, Talent.SagenLegenden, Talent.BekehrenUeberzeugen, Talent.Betoeren, Talent.Einschuechtern, Talent.Etikette, Talent.Gassenwissen, Talent.Menschenkenntnis, Talent.Ueberreden, Talent.Verkleiden, Talent.Willenskraft, Talent.Alchimie, Talent.BooteSchiffe, Talent.Fahrzeuge, Talent.Handel, Talent.HeilkundeGift, Talent.HeilkundeKrankheiten, Talent.HeilkundeSeele, Talent.HeilkundeWunden, Talent.Holzbearbeitung, Talent.Lebensmittelbearbeitung, Talent.Lederbearbeitung, Talent.MalenZeichnen, Talent.Metallbearbeitung, Talent.Musizieren, Talent.Schloesserknacken, Talent.Steinbearbeitung, Talent.Stoffbearbeitung];
var defaultTalents = {
  Gaukelei: 0,
  Klettern: 0,
  Koerperbeherrschung: 0,
  Kraftakt: 0,
  Reiten: 0,
  Schwimmen: 0,
  Selbstbeherrschung: 0,
  Singen: 0,
  Sinnesschärfe: 0,
  Tanzen: 0,
  Taschendiebstahl: 0,
  Verbergen: 0,
  Zechen: 0,
  Faehrtensuchen: 0,
  Fesseln: 0,
  Fischen: 0,
  Orientierung: 0,
  Pflanzenkunde: 0,
  Tierkunde: 0,
  Wildnisleben: 0,
  Brettspiele: 0,
  Geographie: 0,
  Geschichtswissen: 0,
  GoetterKulte: 0,
  Kriegskunst: 0,
  Magiekunnde: 0,
  Mechanik: 0,
  Rechnen: 0,
  Rechtskunde: 0,
  SagenLegenden: 0,
  BekehrenUeberzeugen: 0,
  Betoeren: 0,
  Einschuechtern: 0,
  Etikette: 0,
  Gassenwissen: 0,
  Menschenkenntnis: 0,
  Ueberreden: 0,
  Verkleiden: 0,
  Willenskraft: 0,
  Alchimie: 0,
  BooteSchiffe: 0,
  Fahrzeuge: 0,
  Handel: 0,
  HeilkundeGift: 0,
  HeilkundeKrankheiten: 0,
  HeilkundeSeele: 0,
  HeilkundeWunden: 0,
  Holzbearbeitung: 0,
  Lebensmittelbearbeitung: 0,
  Lederbearbeitung: 0,
  MalenZeichnen: 0,
  Metallbearbeitung: 0,
  Musizieren: 0,
  Schloesserknacken: 0,
  Steinbearbeitung: 0,
  Stoffbearbeitung: 0
};
exports.defaultTalents = defaultTalents;

},{"./stats":3}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Character", {
  enumerable: true,
  get: function get() {
    return _character.Character;
  }
});
Object.defineProperty(exports, "CharacterStats", {
  enumerable: true,
  get: function get() {
    return _stats.CharacterStats;
  }
});
Object.defineProperty(exports, "PnpSimulator", {
  enumerable: true,
  get: function get() {
    return _pnpSimulator.PnpSimulator;
  }
});
Object.defineProperty(exports, "Talent", {
  enumerable: true,
  get: function get() {
    return _talent.Talent;
  }
});
Object.defineProperty(exports, "defaultTalents", {
  enumerable: true,
  get: function get() {
    return _talent.defaultTalents;
  }
});
var _character = require("./character/character");
var _stats = require("./character/stats");
var _talent = require("./character/talent");
var _pnpSimulator = require("./pnpSimulator");

},{"./character/character":2,"./character/stats":3,"./character/talent":4,"./pnpSimulator":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PnpSimulator = void 0;
var _talent = require("./character/talent");
var _critValidator = require("./skillCheckValidator/critValidator");
var _talentValidator = require("./skillCheckValidator/talentValidator");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var PnpSimulator = /*#__PURE__*/function () {
  function PnpSimulator() {
    var rollAmount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
    _classCallCheck(this, PnpSimulator);
    this.rollAmount = rollAmount;
  }
  _createClass(PnpSimulator, [{
    key: "roll",
    value: function roll() {
      var result = [];
      for (var i = 0; i < this.rollAmount; i++) {
        var val = {
          first: PnpSimulator.getDiceResult(),
          second: PnpSimulator.getDiceResult(),
          third: PnpSimulator.getDiceResult()
        };
        result.push(val);
      }
      this.rolls = result;
    }
  }, {
    key: "evaluate",
    value: function evaluate(character) {
      var _this = this;
      if (!this.rolls) {
        this.roll();
      }
      var validationResults = new Map();
      var _iterator = _createForOfIteratorHelper(PnpSimulator.critValidators),
        _step;
      try {
        var _loop = function _loop() {
          var validator = _step.value;
          validationResults.set(validator.skillName(), _this.rolls.filter(function (roll) {
            return validator.validate(roll);
          }).length);
        };
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var _iterator2 = _createForOfIteratorHelper(PnpSimulator.talentValidators),
        _step2;
      try {
        var _loop2 = function _loop2() {
          var validator = _step2.value;
          validationResults.set(validator.skillName(), _this.rolls.filter(function (roll) {
            return validator.validate(roll, character);
          }).length);
        };
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          _loop2();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return validationResults;
    }
  }], [{
    key: "getDiceResult",
    value: function getDiceResult() {
      return Math.floor(Math.random() * 20 + 1);
    }
  }]);
  return PnpSimulator;
}();
exports.PnpSimulator = PnpSimulator;
PnpSimulator.talentValidators = _talent.Talent.ALL_TALENTS.map(function (talent) {
  return new _talentValidator.TalentValidator(talent);
});
PnpSimulator.critValidators = [_critValidator.SingleCritMissValidator, _critValidator.DoubleCritMissValidator, _critValidator.TripleCritMissValidator, _critValidator.SingleCritHitValidator, _critValidator.DoubleCritHitValidator, _critValidator.TripleCritHitValidator];

},{"./character/talent":4,"./skillCheckValidator/critValidator":7,"./skillCheckValidator/talentValidator":9}],7:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TripleCritMissValidator = exports.TripleCritHitValidator = exports.SingleCritMissValidator = exports.SingleCritHitValidator = exports.DoubleCritMissValidator = exports.DoubleCritHitValidator = void 0;
var _skillCheckValidator = require("./skillCheckValidator");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var CritValidator = /*#__PURE__*/function (_SkillCheckValidator) {
  _inherits(CritValidator, _SkillCheckValidator);
  var _super = _createSuper(CritValidator);
  function CritValidator(critAmount, critMethod) {
    var _this;
    _classCallCheck(this, CritValidator);
    _this = _super.call(this);
    if (critAmount > 3) {
      throw Error("Cannot have more than 3 crit misses in a SkillCheck");
    }
    _this.critAmount = critAmount;
    _this.critMethod = critMethod;
    return _this;
  }
  _createClass(CritValidator, [{
    key: "validate",
    value: function validate(diceThrow) {
      var _this2 = this;
      var crits = [diceThrow.first, diceThrow.second, diceThrow.third].filter(function (roll) {
        return _this2.critMethod(roll);
      }).length;
      return crits == this.critAmount;
    }
  }]);
  return CritValidator;
}(_skillCheckValidator.SkillCheckValidator);
var CritMissValidator = /*#__PURE__*/function (_CritValidator) {
  _inherits(CritMissValidator, _CritValidator);
  var _super2 = _createSuper(CritMissValidator);
  function CritMissValidator(critAmount) {
    _classCallCheck(this, CritMissValidator);
    return _super2.call(this, critAmount, _skillCheckValidator.SkillCheckValidator.isCritMiss);
  }
  _createClass(CritMissValidator, [{
    key: "skillName",
    value: function skillName() {
      return "".concat(this.critAmount, "Miss");
    }
  }]);
  return CritMissValidator;
}(CritValidator);
var CritHitValidator = /*#__PURE__*/function (_CritValidator2) {
  _inherits(CritHitValidator, _CritValidator2);
  var _super3 = _createSuper(CritHitValidator);
  function CritHitValidator(critAmount) {
    _classCallCheck(this, CritHitValidator);
    return _super3.call(this, critAmount, _skillCheckValidator.SkillCheckValidator.isCritHit);
  }
  _createClass(CritHitValidator, [{
    key: "skillName",
    value: function skillName() {
      return "".concat(this.critAmount, "Hit");
    }
  }]);
  return CritHitValidator;
}(CritValidator);
var SingleCritMissValidator = new CritMissValidator(1);
exports.SingleCritMissValidator = SingleCritMissValidator;
var DoubleCritMissValidator = new CritMissValidator(2);
exports.DoubleCritMissValidator = DoubleCritMissValidator;
var TripleCritMissValidator = new CritMissValidator(3);
exports.TripleCritMissValidator = TripleCritMissValidator;
var SingleCritHitValidator = new CritHitValidator(1);
exports.SingleCritHitValidator = SingleCritHitValidator;
var DoubleCritHitValidator = new CritHitValidator(2);
exports.DoubleCritHitValidator = DoubleCritHitValidator;
var TripleCritHitValidator = new CritHitValidator(3);
exports.TripleCritHitValidator = TripleCritHitValidator;

},{"./skillCheckValidator":8}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillCheckValidator = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var SkillCheckValidator = /*#__PURE__*/function () {
  function SkillCheckValidator() {
    _classCallCheck(this, SkillCheckValidator);
  }
  _createClass(SkillCheckValidator, null, [{
    key: "isCritMiss",
    value: function isCritMiss(diceResult) {
      return diceResult == 1;
    }
  }, {
    key: "isCritHit",
    value: function isCritHit(diceResult) {
      return diceResult == 20;
    }
  }]);
  return SkillCheckValidator;
}();
exports.SkillCheckValidator = SkillCheckValidator;

},{}],9:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TalentValidator = void 0;
var _skillCheckValidator = require("./skillCheckValidator");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var TalentValidator = /*#__PURE__*/function (_SkillCheckValidator) {
  _inherits(TalentValidator, _SkillCheckValidator);
  var _super = _createSuper(TalentValidator);
  function TalentValidator(talent) {
    var _this;
    _classCallCheck(this, TalentValidator);
    _this = _super.call(this);
    _this.talent = talent;
    return _this;
  }
  _createClass(TalentValidator, [{
    key: "validate",
    value: function validate(diceThrow, character) {
      var _a;
      var remainingTalentPoints = (_a = character.talents.get(this.talent)) !== null && _a !== void 0 ? _a : 0;
      var lostOnFirstSkill = Math.max(0, this.getTalentPointLoss(character.skills.get(this.talent.first), diceThrow.first));
      var lostOnSecondSkill = Math.max(0, this.getTalentPointLoss(character.skills.get(this.talent.second), diceThrow.second));
      var lostOnThirdSkill = Math.max(0, this.getTalentPointLoss(character.skills.get(this.talent.third), diceThrow.third));
      remainingTalentPoints -= lostOnFirstSkill + lostOnSecondSkill + lostOnThirdSkill;
      var hasCritMiss = _skillCheckValidator.SkillCheckValidator.isCritMiss(diceThrow.first) || _skillCheckValidator.SkillCheckValidator.isCritMiss(diceThrow.second) || _skillCheckValidator.SkillCheckValidator.isCritMiss(diceThrow.third);
      var hasCritHit = _skillCheckValidator.SkillCheckValidator.isCritHit(diceThrow.first) || _skillCheckValidator.SkillCheckValidator.isCritHit(diceThrow.second) || _skillCheckValidator.SkillCheckValidator.isCritHit(diceThrow.third);
      return (remainingTalentPoints >= 0 || hasCritHit) && !hasCritMiss;
    }
  }, {
    key: "skillName",
    value: function skillName() {
      return this.talent.name;
    }
  }, {
    key: "getTalentPointLoss",
    value: function getTalentPointLoss(characterStatValue, diceThrow) {
      return 20 - characterStatValue - diceThrow;
    }
  }]);
  return TalentValidator;
}(_skillCheckValidator.SkillCheckValidator);
exports.TalentValidator = TalentValidator;

},{"./skillCheckValidator":8}]},{},[1]);
