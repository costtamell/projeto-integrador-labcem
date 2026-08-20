function selecionarDia(dia) {

    localStorage.setItem("diaSelecionado", dia);

    window.location.href = "horarios.html";
}