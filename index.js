const buttonSubmit = document.querySelector(".btnSubmit");
const salarioResult = document.querySelector(".salarioResult");
const abonoResult = document.querySelector(".abonoResult");
const umtercoResult = document.querySelector(".umtercoResult");
const umTercoAbonoResult = document.querySelector(".umTercoAbonoResult");
const inssResult = document.querySelector(".inssResult");
const irResult = document.querySelector(".irResult");
const mediasResult = document.querySelector(".mediasResult");
const proventosResult = document.querySelector(".proventosResult");
const descontosResult = document.querySelector(".descontosResult");
const liquidoResult = document.querySelector(".liquidoResult");

class Calcula {
    constructor(salarioBase, diasDeFerias, medias, abonoCheck, decimoCheck) {
        this.salarioBase = salarioBase;
        this.diasDeFerias = diasDeFerias;
        this.medias = medias;
        this.abonoCheck = abonoCheck;
        this.decimoCheck = decimoCheck;

        this.salarioProporcional = 0;
        this.tercoSalarioProporcial = 0;

        this.abonoPecuario = 0;
        this.tercoAbonoPecuario = 0;

        this.parcelaDecimoTerceiro = 0;

        this.descontoInss = 0;
        this.descontoIr = 0;
        
        this.proventosTotais = 0
        this.descontosTotais = 0
        this.liquidoTotal = 0

        this.main(this.salarioBase, this.diasDeFerias, this.medias, this.abonoCheck, this.decimoCheck);

    }

    CalculaFerias(salarioBase, diasDeFerias) {
        this.salarioProporcional = (salarioBase / 30) * diasDeFerias;
    }

    CalculaTercoProporcinal(salarioBase, medias){
        this.tercoSalarioProporcial = (salarioBase + medias) / 3;
    }

    CalculaAbonoPecuario(salarioBase) {
        this.abonoPecuario = (salarioBase / 30) * 10;
    }

    CalcularTercoAbonoPecuario(salarioBase){
        this.tercoAbonoPecuario = ((salarioBase / 30) * 10) / 3;
    }

    CalculaParcelaDecimoTerceiro(salarioBase){
       this.parcelaDecimoTerceiro = salarioBase / 2; 
    }

    main(salarioBase, diasDeFerias, medias, abonoCheck, decimoCheck){

        this.CalculaFerias(salarioBase, diasDeFerias);
        this.CalculaTercoProporcinal(salarioBase, medias);

        if(abonoCheck) this.CalculaAbonoPecuario(salarioBase);
        if(abonoCheck) this.CalcularTercoAbonoPecuario(salarioBase);
        if(decimoCheck) this.CalculaParcelaDecimoTerceiro(salarioBase);

        this.calcularDescontoInss(salarioBase);
        this.calcularDescontoIr(salarioBase);

        this.CalculaGerais();

        this.exibirNaTela(abonoCheck, decimoCheck);

    }

    CalculaGerais(){

        this.proventosTotais = 
            this.salarioProporcional +
            this.tercoSalarioProporcial +
            this.abonoPecuario +
            this.tercoAbonoPecuario +
            this.parcelaDecimoTerceiro +
            this.medias;

        this.descontosTotais = this.descontoInss + this.descontoIr;

        this.liquidoTotal = this.proventosTotais - this.descontosTotais;
    }

    exibirNaTela(abonoCheck, decimoCheck) {
        salarioResult.innerText = `R$ ${this.salarioProporcional.toFixed(2)}`;
        umtercoResult.innerText = `R$ ${this.tercoSalarioProporcial.toFixed(2)}`;

        abonoResult.innerText = abonoCheck ? `R$ ${this.abonoPecuario.toFixed(2)}` : '0.00';
        umTercoAbonoResult.innerText = abonoCheck ? `R$ ${this.tercoAbonoPecuario.toFixed(2)}` : '0.00';

        // colocar para exibir a parcela tambem!! usar o decimoCheck para fazer isso igual o abono

        mediasResult.innerText = `R$ ${this.medias.toFixed(2)}`;

        inssResult.innerText = `R$ ${this.descontoInss.toFixed(2)}`;
        irResult.innerText = `R$ ${this.descontoIr.toFixed(2)}`;

        proventosResult.innerText = `Proventos: ${this.proventosTotais.toFixed(2)}`;
        descontosResult.innerText = `Descontos: ${this.descontosTotais.toFixed(2)}`;
        liquidoResult.innerText = `Liquido: ${this.liquidoTotal.toFixed(2)}`;
    }

    calcularDescontoInss(salarioBase) {
        let inss = 0;

        if (salarioBase > 0 && salarioBase < 1320) {
            inss = 0.075; // 7.5%
            this.descontoInss = Math.min(salarioBase * inss, 99);
        } else if (salarioBase >= 1320.01 && salarioBase < 2571.29) {
            inss = 0.09; // 9.0%
            this.descontoInss = Math.min(salarioBase * inss, 112.62);
        } else if (salarioBase >= 2571.30 && salarioBase < 3856.94) {
            inss = 0.12; // 12.0%
            this.descontoInss = Math.min(salarioBase * inss, 154.28);
        } else if (salarioBase >= 3856.95 && salarioBase < 7507.29) {
            inss = 0.14; // 14.0%
            this.descontoInss = Math.min(salarioBase * inss, 511.05);
        } else if (salarioBase > 7507.29) {
            inss = 876.94
            this.descontoInss = inss;
        } else {
            this.descontoInss = 0;
        }

    }

    calcularDescontoIr(salarioBase) {
        let ir = 0;

        if (salarioBase >= 1903.99 && salarioBase < 2826.65) {
            ir = 0.075; // 7.5%
            this.descontoIr = Math.min(salarioBase * ir, 158.40);
        } else if (salarioBase >= 2826.66 && salarioBase < 3751.05) {
            ir = 0.15; // 15%
            this.descontoIr = Math.min(salarioBase * ir, 370.40);
        } else if (salarioBase >= 3751.06 && salarioBase < 4664.68) {
            ir = 0.225; // 22,50%
            this.descontoIr = Math.min(salarioBase * ir, 651.73);
        } else if (salarioBase >= 4664.69) {
            ir = 0.275; // 27,50%
            this.descontoIr = Math.min(salarioBase * ir, 884.96);
            return;
        } else {
            this.descontoIr = 0;
        }

    }
}

buttonSubmit.addEventListener("click", e => {
    e.preventDefault();

    const salario = parseFloat(document.querySelector(".salario").value);
    const medias = parseFloat(document.querySelector(".medias").value) || 0;
    const dias = parseInt(document.querySelector(".dias").value);
    const abono = document.querySelector(".abono").checked;
    const decimo = document.querySelector(".decimoTerceiro").checked;

    new Calcula(salario, dias, medias, abono, decimo);
});


// mudar a forma que esta sendo feitos os descontos, para arrays
// quando tiver abono os dias de ferias nao podem ser superior a 20 dias
