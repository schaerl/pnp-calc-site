import { Character, CharacterStats, PnpSimulator, Talent, TalentValues, defaultTalents } from "pnp-calc";
import { StatValues } from "pnp-calc/dist/character/stats";

const simulator = new PnpSimulator();

function initDOM() {
    createSkillFields();
    createTalentFields();

    setListeners();
}

function createSkillFields() {
    const skillWrapperDiv = document.getElementById('skillContent')!!;
    for (let stat of Object.values(CharacterStats).filter(x => typeof x === "string")) {
        skillWrapperDiv.appendChild(createSkillElement(stat as string));
    }
}

function createSkillElement(stat: string): HTMLElement {
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
    const skillWrapperDiv = document.getElementById('talentWrapper')!!;
    for (let talent of Object.keys(defaultTalents)) {
        skillWrapperDiv.appendChild(createTalentElement(talent as string));
    }
}

function createTalentElement(talent: string): HTMLElement {
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
    const rollAmount = (document.getElementById("throwAmount")!! as HTMLInputElement).value;
    if (Number.parseInt(rollAmount)) {
        simulator.rollAmount = Number.parseInt(rollAmount);
    }
    else {
        console.error("Simulate Amount is not a number!")
    }
    simulator.roll();
    const simResult = simulator.evaluate(new Character(characterStats, talentValues));
    assignResults(simResult);
}

function extractSkillValues(): StatValues {
    return {
        mu: getSkillWrapperValue("MU"),
        kl: getSkillWrapperValue("KL"),
        in: getSkillWrapperValue("IN"),
        ch: getSkillWrapperValue("CH"),
        ff: getSkillWrapperValue("FF"),
        ge: getSkillWrapperValue("GE"),
        ko: getSkillWrapperValue("KO"),
        kk: getSkillWrapperValue("KK")
    }
}

function extractTalentValues(): TalentValues {
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
    }
}

function getSkillWrapperValue(name: string): number {
    const value = (document.querySelector(`#${name}Wrapper input`) as HTMLInputElement).value
    if (!Number.isNaN(Number.parseInt(value))) {
        return Number.parseInt(value);
    }
    else {
        throw Error(`${name} is not a number!`)
    }
}

function getTalentWrapperValue(name: string): number {
    const value = (document.querySelector(`#${name}Row input`) as HTMLInputElement).value
    if (!Number.isNaN(Number.parseInt(value))) {
        return Number.parseInt(value);
    }
    else {
        throw Error(`${name} is not a number!`)
    }
}

function getTalentOutput(name: string): HTMLInputElement | undefined {
    try {
        if (Number.parseInt(name[0])) {
            // hack for 1Hit etc.
            return document.querySelector(`#Stat${name} .resultDisplay`) as HTMLInputElement
        }
        return document.querySelector(`#${name}Row .resultDisplay`) as HTMLInputElement
    }
    catch (err) {
        console.error(err);
        return undefined;
    }
}

function setListeners() {
    document.getElementById("simulateButton")!!.addEventListener("click", simulate);
}

initDOM()
function assignResults(simResult: Map<string, number>) {
    for (let [key, value] of simResult) {
        const outputField = getTalentOutput(key);
        if (outputField) {
            outputField.value = `${(value / simulator.rollAmount * 100).toFixed(2)}%`;
        }
    }
}

