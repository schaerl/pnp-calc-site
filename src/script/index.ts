import { CharacterStats, PnpSimulator, Talent, TalentValues, defaultTalents } from "pnp-calc";

const simulator = new PnpSimulator();

function initDOM() {
    createSkillFields();
    createTalentFields();
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
    tr.appendChild(td1);
    tr.appendChild(td2);
    return tr;
}

initDOM()