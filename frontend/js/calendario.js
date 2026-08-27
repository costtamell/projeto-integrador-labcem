const token = localStorage.getItem("token");

if (!token) {

    alert("Você precisa fazer login.");

    window.location.href = "index.html";

}


function selecionarDia(dia) {

    const diasReservados = [3, 15];

    if (diasReservados.includes(dia)) {

        alert("Este dia está totalmente reservado.");

        return;

    }

    const diaFormatado = String(dia).padStart(2, "0");

    const data = `2026-07-${diaFormatado}`;

    localStorage.setItem(
        "dataSelecionada",
        data
    );

    window.location.href = "horarios.html";

}