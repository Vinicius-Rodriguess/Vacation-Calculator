import VacationCalculate from "./vacationCalculate.js"

const handleForm = (e) => {
    e.preventDefault()
    const abono = document.querySelector(".abono").checked
    const salario = +document.querySelector(".salario").value
    const medias = +document.querySelector(".medias").value || 0
    const dias = +document.querySelector(".dias").value
    const decimo = document.querySelector(".decimoTerceiro").checked
    const dependentesIr = +document.querySelector(".dependentesIr").value

    new VacationCalculate(salario, dias, medias, abono, decimo, dependentesIr)
}

document.querySelector(".btnSubmit").addEventListener("click", e => handleForm(e))

const inputs = document.querySelectorAll(".inputs")
inputs.forEach(input => {
    input.addEventListener("input", e => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '')
    })
})