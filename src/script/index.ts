import { CharacterStats, PnpSimulator, Talent, TalentValues, defaultTalents } from "pnp-calc";

const simulator = new PnpSimulator();

function initDOM() {
    createSkillFields();
    createTalentFields();
}

function createSkillFields() {
    for (let stat of Object.values(CharacterStats).filter(x => typeof x === "string")) {
        console.log(stat);
    }
}

function createTalentFields() {
    for (let talent of Object.keys(defaultTalents)) {
        console.log(talent);
    }
}

initDOM()