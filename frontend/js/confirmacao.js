const reserva = JSON.parse(
    localStorage.getItem("ultimaReserva")
);


const dadosReserva =
    document.getElementById("dadosReserva");


if (reserva) {

    dadosReserva.innerHTML = `

        <p>
            <strong>Ambiente:</strong>
            ${reserva.ambiente}
        </p>

        <p>
            <strong>Matéria:</strong>
            ${reserva.materia}
        </p>

        <p>
            <strong>Data:</strong>
            ${reserva.data}
        </p>

        <p>
            <strong>Horário:</strong>
            ${reserva.hora}
        </p>

    `;

}


function novaReserva() {

    localStorage.removeItem("ambiente");

    localStorage.removeItem("materia");

    localStorage.removeItem("dataSelecionada");

    localStorage.removeItem("horarioSelecionado");

    window.location.href = "ambientes.html";

}


function verReservas() {

    window.location.href = "reservas.html";

}