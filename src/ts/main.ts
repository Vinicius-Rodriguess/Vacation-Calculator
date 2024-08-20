import { vacation } from "./vacation"

const inputs = document.querySelectorAll<HTMLInputElement>(".hover-input")
const btnCalculate = document.querySelector("#btn-calculate") as HTMLButtonElement

const addEventInputs = (input: HTMLInputElement): void => {
    input.addEventListener("input", (e: Event) => {
        const target = e.target as HTMLInputElement
        const inputValue = target.value.replace(/[a-zA-Z]+/g, '')
        target.value = inputValue
    })
}

inputs.forEach((input) => addEventInputs(input))

btnCalculate.addEventListener("click", () => {
    vacation.calcRemuneration()  
})