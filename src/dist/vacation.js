export const vacation = {
    form: document.querySelector("#form-calc"),
    containerResults: document.querySelector(".container-results"),
    error() {
        console.log("error");
    },
    getProps() {
        if (!vacation.form.wage.value || !vacation.form.wadaysge.value)
            vacation.error();
        const prosp = {
            wage: vacation.form.wage.value,
            days: vacation.form.wadaysge.value,
            averages: vacation.form.averages.value || 0,
            dependentIR: vacation.form.dependentIR.value || 0,
            allowance: vacation.form.wage.checked,
            thirteenth: vacation.form.wage.checked,
        };
        return prosp;
    },
    calcRemuneration() {
        const props = vacation.getProps();
        console.log(props);
        return 1;
    },
    showRemuneration(results) {
        const resultsTitles = ["Ferias:", "Abono de Férias:", "1/3 de Férias:", "1/3 de Abono:", "Médias:", "Parcela Decimo:", "INSS:", "IRRF:"];
        let indexTitles = 0;
        let i;
        for (i in results) {
            const title = document.createElement("p");
            title.innerText = resultsTitles[indexTitles];
            const span = document.createElement("span");
            span.classList.add("text-end");
            span.innerHTML = results[i].toString();
            vacation.containerResults.appendChild(title);
            vacation.containerResults.appendChild(span);
            indexTitles++;
        }
    },
};
vacation.showRemuneration({
    wage: 123,
    days: 123,
    averages: 456,
    dependentIR: 123,
    allowance: 123,
    thirteenth: 78,
    inss: 78,
    irrf: 7
});
