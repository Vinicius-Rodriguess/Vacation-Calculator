export default class VacationCalculate {
    proportionalSalary = 0
    oneThirdProportionalSalary = 0
    pecuniaryBonus = 0
    oneThirdPecuniaryBonus = 0
    thirteenthInstallment = 0
    inssDeduction = 0
    irDeduction = 0
    totalEarnings = 0
    totalDeductions = 0
    netTotal = 0

    constructor(baseSalary, vacationDays, averages, bonusCheck, thirteenthCheck, dependentsIr) {
        this.baseSalary = baseSalary
        this.vacationDays = vacationDays
        this.averages = averages
        this.bonusCheck = bonusCheck
        this.thirteenthCheck = thirteenthCheck
        this.dependentsIr = dependentsIr

        this.main(this.baseSalary, this.vacationDays, this.averages, this.bonusCheck, this.thirteenthCheck)
    }

    calculateVacation(baseSalary, vacationDays, averages) {
        this.proportionalSalary = (baseSalary / 30) * vacationDays
        this.oneThirdProportionalSalary = (this.proportionalSalary + averages) / 3
    }

    calculatePecuniaryBonus(baseSalary, averages) {
        this.pecuniaryBonus = ((baseSalary + averages) / 30) * 10
        this.oneThirdPecuniaryBonus = this.pecuniaryBonus / 3
    }

    calculateThirteenthInstallment(baseSalary) {
        this.thirteenthInstallment = baseSalary / 2
    }

    main(baseSalary, vacationDays, averages, bonusCheck, thirteenthCheck) {
        this.calculateVacation(baseSalary, vacationDays, averages)
        if (bonusCheck) this.calculatePecuniaryBonus(baseSalary, averages)
        if (thirteenthCheck) this.calculateThirteenthInstallment(baseSalary)
        this.calculateTotals()
        this.calculateInssDeduction(this.totalEarnings, vacationDays)
        this.calculateTotals()
        this.calculateIrDeduction(this.totalEarnings - this.inssDeduction)
        this.calculateTotals()
        this.displayResults(bonusCheck, thirteenthCheck)
    }

    calculateTotals() {
        this.totalEarnings =
            this.proportionalSalary +
            this.oneThirdProportionalSalary +
            this.pecuniaryBonus +
            this.oneThirdPecuniaryBonus +
            this.thirteenthInstallment +
            this.averages

        this.totalDeductions = this.inssDeduction + this.irDeduction
        this.netTotal = this.totalEarnings - this.totalDeductions
    }

    displayResults(bonusCheck, thirteenthCheck) {
        document.querySelector(".salarioResult").innerText = `R$ ${this.proportionalSalary.toFixed(2)}`
        document.querySelector(".umtercoResult").innerText = `R$ ${this.oneThirdProportionalSalary.toFixed(2)}`
        document.querySelector(".abonoResult").innerText = bonusCheck ? `R$ ${this.pecuniaryBonus.toFixed(2)}` : 'R$ 0.00'
        document.querySelector(".umTercoAbonoResult").innerText = bonusCheck ? `R$ ${this.oneThirdPecuniaryBonus.toFixed(2)}` : 'R$ 0.00'
        document.querySelector(".parcelaDecimoResult").innerText = thirteenthCheck ? `R$ ${this.thirteenthInstallment.toFixed(2)}` : 'R$ 0.00'
        document.querySelector(".mediasResult").innerText = `R$ ${this.averages.toFixed(2)}`
        document.querySelector(".inssResult").innerText = `R$ ${this.inssDeduction.toFixed(2)}`
        document.querySelector(".irResult").innerText = `R$ ${this.irDeduction.toFixed(2)}`
        document.querySelector(".proventosResult").innerText = `R$ ${this.totalEarnings.toFixed(2)}`
        document.querySelector(".descontosResult").innerText = `R$ ${this.totalDeductions.toFixed(2)}`
        document.querySelector(".liquidoResult").innerText = `R$ ${this.netTotal.toFixed(2)}`
    }

    calculateInssDeduction(totalEarnings, vacationDays) {
        let inss = 0

        if (totalEarnings >= 0 && totalEarnings <= 1320)
            inss = (totalEarnings * 0.075) - 99
        else if (totalEarnings >= 1320.01 && totalEarnings <= 2571.29)
            inss = (totalEarnings * 0.09) - 112.62
        else if (totalEarnings >= 2571.30 && totalEarnings <= 3856.94)
            inss = (totalEarnings * 0.12) - 154.28
        else if (totalEarnings >= 3856.95 && totalEarnings <= 7507.29)
            inss = ((totalEarnings * 0.14) - 511.05)
        else if (totalEarnings >= 7507.29) 
            inss = 876.94

        inss = Math.max(inss, 0)

        this.inssDeduction = (vacationDays * inss) / 30
    }

    calculateIrDeduction(totalEarningsLessInss) {
        if (totalEarningsLessInss >= 1903.99 && totalEarningsLessInss < 2826.65)
            this.irDeduction = (totalEarningsLessInss * 0.075) - 158.40
        else if (totalEarningsLessInss >= 2826.66 && totalEarningsLessInss < 3751.05)
            this.irDeduction = (totalEarningsLessInss * 0.15) - 370.40
        else if (totalEarningsLessInss >= 3751.06 && totalEarningsLessInss < 4664.68)
            this.irDeduction = (totalEarningsLessInss * 0.225) - 651.73
        else if (totalEarningsLessInss >= 4664.69)
            this.irDeduction = (totalEarningsLessInss * 0.275) - 884.96
        else
            this.irDeduction = 0
    }
}
