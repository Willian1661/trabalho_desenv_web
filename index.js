const area_introducao = document.getElementById("area_introducao");
const area_simulacao = document.getElementById("area_simulacao");
const botao_voltar_area_simulacao = document.getElementById('botao_voltar_area_simulacao');
const botao_simular_plano = document.getElementById("botao_simular_plano");
const botao_enviar_plano = document.getElementById("botao_enviar_plano");
const card_alert = document.getElementById("card_alert");
const checkbox_genero_masculino = document.getElementById("marcar_masculino");
const checkbox_genero_feminino = document.getElementById("marcar_feminino");
const cards_planos = document.getElementById("cards_planos");

// cards_planos.classList.add('visible');


botao_simular_plano.addEventListener('click', () => {
    botao_simular_plano.parentElement.classList.add('d-none');
    botao_enviar_plano.parentElement.classList.remove('class', 'd-none');

    area_introducao.classList.add('class', 'd-none');
    area_simulacao.classList.remove('class', 'd-none');
});

botao_voltar_area_simulacao.addEventListener('click', () => {
    botao_simular_plano.parentElement.classList.remove('class', 'd-none');
    botao_enviar_plano.parentElement.classList.add('class', 'd-none');

    area_introducao.classList.remove('class', 'd-none');
    area_simulacao.classList.add('class', 'd-none');
})

var elementoIncorreto = false

botao_enviar_plano.addEventListener('click', () => {

    if (!checkbox_genero_masculino.checked && !checkbox_genero_feminino.checked) {
        elementoIncorreto = true;
    }

    const regex_numerico = /^[0-9]+$/;
    document.querySelectorAll('.form-control').forEach((element) => {
        if (element.value == '' || !regex_numerico.test(input_altura) || !regex_numerico.test(input_idade) || !regex_numerico.test(input_nome)) {
            elementoIncorreto = true;
        } else {
            elementoIncorreto = false;
        }

    })

    if (!elementoIncorreto) {
        card_alert.classList.remove('class', 'visible');

        area_simulacao.classList.add('class', 'd-none');
        botao_enviar_plano.parentElement.classList.add('class', 'd-none');

        /* área para pegar os valores dos inputs */
        const input_nome = document.getElementById("input_nome").value;
        const input_idade = document.getElementById("input_idade").value;
        const input_peso = document.getElementById("input_peso").value;
        const input_altura = document.getElementById("input_altura").value;

        const preco_plano_basico = document.getElementById('preco_plano_basico');
        const preco_plano_standard = document.getElementById('preco_plano_standard');
        const preco_plano_premium = document.getElementById('preco_plano_premium');


        const botao_escolher_operadora_a = document.getElementById('botao_escolher_operadora_a');
        const botao_escolher_operadora_b = document.getElementById('botao_escolher_operadora_b');
        const titulo_escolher_operadora = document.getElementById('titulo_escolher_operadora');


        const exibir_detalhe_plano_b = document.getElementById('exibir_detalhe_plano_b');
        const detalhe_plano_b = document.getElementById('detalhe_plano_b');


        titulo_escolher_operadora.insertAdjacentText("afterbegin", input_nome);
        /* logica para alternar entre operadoreas */

        /* inserir preço dos planos nos card */
        preco_plano_basico.innerText = "R$" + calcular_preco_plano_a(
            calcular_imc(
                input_peso,
                input_altura
            ), input_idade).plano_basico;

        preco_plano_standard.innerText = "R$" + calcular_preco_plano_a(
            calcular_imc(
                input_peso,
                input_altura
            ), input_idade).plano_standard;

        preco_plano_premium.innerText = "R$" + calcular_preco_plano_a(
            calcular_imc(
                input_peso,
                input_altura
            ), input_idade).plano_premium;

        /* inserir preço dos planos nos card */

        botao_escolher_operadora_a.addEventListener('click', () => {
            botao_escolher_operadora_a.classList.add('active')
            botao_escolher_operadora_b.classList.remove('active')

            /* inserir preço dos planos nos card */
            preco_plano_basico.innerText = "R$" + calcular_preco_plano_a(
                calcular_imc(
                    input_peso,
                    input_altura
                ), input_idade).plano_basico;

            preco_plano_standard.innerText = "R$" + calcular_preco_plano_a(
                calcular_imc(
                    input_peso,
                    input_altura
                ), input_idade).plano_standard;

            preco_plano_premium.innerText = "R$" + calcular_preco_plano_a(
                calcular_imc(
                    input_peso,
                    input_altura
                ), input_idade).plano_premium;

            /* inserir preço dos planos nos card */


            exibir_detalhe_plano_b.parentElement.classList.add('d-none')

        })


        botao_escolher_operadora_b.addEventListener('click', () => {
            botao_escolher_operadora_a.classList.remove('active')
            botao_escolher_operadora_b.classList.add('active')

            /* inserir preço dos planos nos card */
            preco_plano_basico.innerText = "R$" + calcular_preco_plano_b(
                calcular_imc(input_peso, input_altura)
            ).plano_basico;

            preco_plano_standard.innerText = "R$" + calcular_preco_plano_b(
                calcular_imc(input_peso, input_altura)
            ).plano_standard;

            preco_plano_premium.innerText = "R$" + calcular_preco_plano_b(
                calcular_imc(input_peso, input_altura)
            ).plano_premium;
            /* inserir preço dos planos nos card */

            exibir_detalhe_plano_b.parentElement.classList.remove('d-none')
        })

        /* logica para alternar entre operadoreas */

        area_introducao.parentElement.classList.add('d-none');
        cards_planos.classList.remove('class', 'd-none');

        setTimeout(() => {
            cards_planos.classList.add('visible');
        }, 100);

        /* area para exibir mais detalhes do plano b */
        const cabecalho_planos = document.getElementById('cabecalho_planos');
        const conteudo_planos = document.getElementById('conteudo_planos');

        exibir_detalhe_plano_b.addEventListener('click', () => {
            cabecalho_planos.classList.toggle('d-none');
            conteudo_planos.classList.toggle('d-none');

            detalhe_plano_b.classList.toggle('d-none');
        })
        /* area para exibir mais detalhes do plano b */


        return;
    }

    card_alert.classList.add('visible');
});

/* área lógica da operadora A */
function calcular_preco_plano_a(imc, idade) {

    const plano_basico = (100 + (idade * imc)).toFixed(0);
    const plano_standard = ((150 + (idade * 15)) * (imc / 10)).toFixed(0);
    const plano_premium = ((200 - (imc * 10) + (idade * 20)) * (imc / 10)).toFixed(0);

    return { plano_basico, plano_standard, plano_premium }
}
/* área lógica da operadora A */

/* área lógica da operadora B */
function calcular_preco_plano_b(imc) {
    var fator_comorbidade = 1; // normal
    switch (imc) {
        case imc < 18.5:
            fator_comorbidade = 10; // abaixo do peso
            break;
        case imc >= 25 || imc <= 29.9:
            fator_comorbidade = 6; // sobre-peso
            break;
        case imc >= 30 || imc <= 34.9:
            fator_comorbidade = 10;// obesidade
            break;
        case imc >= 35 || imc <= 39.9:
            fator_comorbidade = 20;// obesidade mórbida
            break;
        case imc > 40:
            fator_comorbidade = 30;// KILOS MORTAIS
            break;
    }

    const plano_basico = (100 + (fator_comorbidade * 10 * (imc / 10))).toFixed(0);
    const plano_standard = ((150 + (fator_comorbidade * 15)) * (imc / 10)).toFixed(0);
    const plano_premium = ((((imc * 10) + (fator_comorbidade * 20)) * (imc / 10)) - 200).toFixed(0);

    return { plano_basico, plano_standard, plano_premium }
}
/* área lógica da operadora B */

function calcular_imc(peso, altura) {
    const latura_cm_para_m = altura / 100
    return (peso / (latura_cm_para_m * latura_cm_para_m)).toFixed(1)
}
/* área lógica da operadora A */


