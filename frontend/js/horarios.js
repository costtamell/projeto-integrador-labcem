function selecionarHorario(horario) {

    const dia = localStorage.getItem("diaSelecionado");

    localStorage.setItem("horarioSelecionado", horario);

    console.log("Dia selecionado:", dia);
    console.log("Horário selecionado:", horario);

    window.location.href = "confirmacao.html";
}