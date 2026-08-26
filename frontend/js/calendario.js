function selecionarDia(dia) {

    // Dias totalmente reservados
    const diasReservados = [3, 15];

    // Se clicar em um dia vermelho,
    // não faz absolutamente nada
    if (diasReservados.includes(dia)) {
        return;
    }

    // Salva o dia escolhido
    localStorage.setItem("diaSelecionado", dia);

    // Vai para a tela de horários
    window.location.href = "horarios.html";
}