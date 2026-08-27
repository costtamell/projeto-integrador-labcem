async function carregar() {

    const token = localStorage.getItem("token");

    if (!token) {

        window.location.href = "index.html";

        return;

    }

    try {

        const resposta = await fetch(

            "http://127.0.0.1:5000/reservas",

            {
                method: "GET",

                headers: {
                    "Authorization": token
                }
            }

        );

        const reservas = await resposta.json();

        if (!resposta.ok) {

            alert(reservas.mensagem);

            return;

        }

        const lista = document.getElementById("lista");

        lista.innerHTML = "";

        if (reservas.length === 0) {

            lista.innerHTML =
                "<p>Nenhuma reserva encontrada.</p>";

            return;

        }

        reservas.forEach(function(r) {

            lista.innerHTML += `

                <div class="card">

                    <h3>Reserva #${r.id}</h3>

                    <p>
                        <b>Ambiente:</b>
                        ${r.ambiente}
                    </p>

                    <p>
                        <b>Matéria:</b>
                        ${r.materia}
                    </p>

                    <p>
                        <b>Data:</b>
                        ${r.data}
                    </p>

                    <p>
                        <b>Horário:</b>
                        ${r.hora}
                    </p>

                </div>

                <br>

            `;

        });

    } catch (erro) {

        console.error(erro);

        alert("Erro ao carregar reservas.");

    }

}


carregar();