
const formulario = document.querySelector(".formulario");
const buttonSubmit = document.querySelector(".btnSubmit");
const resultado = document.querySelector(".resultado");

buttonSubmit.addEventListener("click", e => {
    e.preventDefault();

    const salario = parseFloat(document.querySelector(".salario").value);
    const medias = parseFloat(document.querySelector(".medias").value) || 0;
    const dias = parseInt(document.querySelector(".dias").value);
    const abono = document.querySelector(".abono").checked;

    new Calcula(salario, dias, medias, abono);

});

class Calcula {
    constructor(salario, dias, medias, abono) {

        this.salario = salario;
        this.dias = dias;

        //medias do que a pessoa recebeu a mais fora o salario, ex hora extra, periculosidade 
        this.medias = medias;

        //venda de ferias, calculo diferente
        this.abono = abono;

        this.abono === true ? this.feriasComAbono() : this.feriasSemAbono();
    }

    feriasSemAbono() {
        //regra de 3 para descobrir o proporcial caso nao seja 30 dias de descanso
        const salarioProporcial = (this.salario * this.dias) / 30;
        const tercoProporcial = (salarioProporcial + this.medias) / 3;

        const proventos = salarioProporcial + tercoProporcial;

        this.descontosBase(proventos);
    }

    feriasComAbono() {
        // isso só ta copiado de cima 
        //regra de 3 para descobrir o proporcial caso nao seja 30 dias de descanso
        const salarioProporcial = (this.salario * this.dias) / 30;
        const tercoProporcial = (salarioProporcial + this.medias) / 3;
        const abono = 1;

        const proventos = salarioProporcial + tercoProporcial + abono;

    }

    descontosBase(proventos){
        //Pegar tabela de bases do inss e de ir para os descontos

        const descontos = 100;
        const liquido = proventos - descontos

        this.exibir(proventos, descontos, liquido);
    }

    exibir(proventos, descontos, liquido){
        resultado.innerHTML = `Proventos: ${proventos.toFixed(2)} - Descontos: ${descontos.toFixed(2)} - Liquido: ${liquido.toFixed(2)}`;
    }


}