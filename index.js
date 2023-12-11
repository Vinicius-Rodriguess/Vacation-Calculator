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
const parcelaDecimoResult = document.querySelector(".parcelaDecimoResult");

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

    CalculaFerias(salarioBase, diasDeFerias, medias) {
        this.salarioProporcional = (salarioBase / 30) * diasDeFerias;

        this.tercoSalarioProporcial = (this.salarioProporcional + medias) / 3;
    }

    CalculaAbonoPecuario(salarioBase, medias) {
        this.abonoPecuario = ((salarioBase + medias) / 30) * 10;

        this.tercoAbonoPecuario = this.abonoPecuario / 3;
    }

    CalculaParcelaDecimoTerceiro(salarioBase){
       this.parcelaDecimoTerceiro = salarioBase / 2; 
    }

    main(salarioBase, diasDeFerias, medias, abonoCheck, decimoCheck){

        this.CalculaFerias(salarioBase, diasDeFerias, medias);

        if(abonoCheck) this.CalculaAbonoPecuario(salarioBase, medias);

        if(decimoCheck) this.CalculaParcelaDecimoTerceiro(salarioBase);
        this.CalculaGerais();
        
        this.calcularDescontoInss(this.proventosTotais, diasDeFerias);
        this.CalculaGerais();

        this.calcularDescontoIr(this.proventosTotais - this.descontoInss);
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

        parcelaDecimoResult.innerText = decimoCheck ? `R$ ${this.parcelaDecimoTerceiro.toFixed(2)}` : '0.00';

        mediasResult.innerText = `R$ ${this.medias.toFixed(2)}`;

        inssResult.innerText = `R$ ${this.descontoInss.toFixed(2)}`;
        irResult.innerText = `R$ ${this.descontoIr.toFixed(2)}`;

        proventosResult.innerText = `Proventos: ${this.proventosTotais.toFixed(2)}`;
        descontosResult.innerText = `Descontos: ${this.descontosTotais.toFixed(2)}`;
        liquidoResult.innerText = `Liquido: ${this.liquidoTotal.toFixed(2)}`;
    }

    calcularDescontoInss(proventosTotais, diasDeFerias) {
        let inss = 0;

        if (proventosTotais >= 0 && proventosTotais <= 1320) {
            inss = (proventosTotais * 0.075) - 99;
            
        } else if (proventosTotais >= 1320.01 && proventosTotais <= 2571.29) {
            inss = (proventosTotais * 0.09) - 112.62;

        } else if (proventosTotais >= 2571.30 && proventosTotais <= 3856.94) {
            inss = (proventosTotais * 0.12) - 154.28;

        } else if (proventosTotais >= 3856.95 && proventosTotais <= 7507.29) {
            inss = ((proventosTotais * 0.14) - 511.05) ;
            
        } else if (proventosTotais >= 7507.29) {
            inss = 876.94;
        } 

        this.descontoInss = (diasDeFerias * inss) / 30;

    }

    calcularDescontoIr(proventosMenosInss) {

        if (proventosMenosInss >= 1903.99 && proventosMenosInss < 2826.65) {
            this.descontoIr = (proventosMenosInss * 0.075) - 158.40;

        } else if (proventosMenosInss >= 2826.66 && proventosMenosInss < 3751.05) {
            this.descontoIr = (proventosMenosInss * 0.15) - 370.40;

        } else if (proventosMenosInss >= 3751.06 && proventosMenosInss < 4664.68) {
            this.descontoIr = (proventosMenosInss * 0.225) - 651.73;

        } else if (proventosMenosInss >= 4664.69) {
            this.descontoIr = (proventosMenosInss * 0.275) - 884.96;
            
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
