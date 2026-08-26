// Todos os horários disponíveis no sistema
const todosHorarios = [
    "07:15",
    "08:05",
    "08:55",
    "10:00",
    "10:50",
    "11:35"
];


// Horários que já estão ocupados em cada dia
const horariosOcupados = {

    // Dia 6 é AMARELO
    // Estes horários já estão ocupados
    6: [
        "08:55",
        "10:50",
        "11:35"
    ]

};


// Carrega os horários quando a página abrir
function carregarHorarios() {

    const dia = localStorage.getItem("diaSelecionado");

    const lista = document.getElementById("lista-horarios");

    lista.innerHTML = "";


    // Se nenhum dia foi selecionado,
    // volta para o calendário
    if (!dia) {
        window.location.href = "calendário.html";
        return;
    }


    // Verifica quais horários estão ocupados
    const ocupados = horariosOcupados[dia] || [];


    // Cria os botões dos horários livres
    todosHorarios.forEach(function(horario) {

        // Só cria o botão se o horário estiver livre
        if (!ocupados.includes(horario)) {

            const botao = document.createElement("button");

            botao.className = "horario";

            botao.textContent = horario;

            botao.onclick = function() {
                selecionarHorario(horario);
            };

            lista.appendChild(botao);
        }

    });

}


// Quando clicar em um horário
function selecionarHorario(horario) {

    localStorage.setItem("horarioSelecionado", horario);

    window.location.href = "confirmacao.html";
}


window.addEventListener("DOMContentLoaded", carregarHorarios);