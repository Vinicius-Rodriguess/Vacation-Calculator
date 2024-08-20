import { vacation } from "./vacation";
const inputs = document.querySelectorAll(".hover-input");
const btnCalculate = document.querySelector("#btn-calculate");
const addEventInputs = (input) => {
    input.addEventListener("input", (e) => {
        const target = e.target;
        const inputValue = target.value.replace(/[a-zA-Z]+/g, '');
        target.value = inputValue;
    });
};
inputs.forEach((input) => addEventInputs(input));
btnCalculate.addEventListener("click", () => {
    vacation.calcRemuneration();
});
