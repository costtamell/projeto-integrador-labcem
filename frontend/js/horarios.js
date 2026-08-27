async function carregarHorarios() {

    const token = localStorage.getItem("token");

    const ambiente = localStorage.getItem("ambiente");

    const data = localStorage.getItem("dataSelecionada");

    if (!token) {

        alert("Você precisa fazer login.");

        window.location.href = "index.html";

        return;

    }

    if (!ambiente || !data) {

        alert("Escolha primeiro o ambiente e a data.");

        window.location.href = "calendario.html";

        return;

    }

    try {

        const resposta = await fetch(

            `http://127.0.0.1:5000/horarios?ambiente=${encodeURIComponent(ambiente)}&data=${data}`,

            {
                method: "GET",

                headers: {
                    "Authorization": token
                }
            }

        );

        const dados = await resposta.json();

        if (!resposta.ok) {

            alert(dados.mensagem);

            return;

        }

        const lista = document.getElementById("lista-horarios");

        lista.innerHTML = "";

        if (dados.length === 0) {

            lista.innerHTML = "<p>Nenhum horário disponível.</p>";

            return;

        }

        dados.forEach(function(horario) {

            const botao = document.createElement("button");

            botao.className = "horario";

            botao.textContent = horario;

            botao.onclick = function() {

                selecionarHorario(horario);

            };

            lista.appendChild(botao);

        });

    } catch (erro) {

        console.error("Erro:", erro);

        alert("Erro ao carregar horários.");

    }

}


function selecionarHorario(horario) {

    localStorage.setItem(
        "horarioSelecionado",
        horario
    );

    criarReserva();

}


async function criarReserva() {

    const token = localStorage.getItem("token");

    const ambiente = localStorage.getItem("ambiente");

    const materia = localStorage.getItem("materia");

    const data = localStorage.getItem("dataSelecionada");

    const hora = localStorage.getItem("horarioSelecionado");

    try {

        const resposta = await fetch(

            "http://127.0.0.1:5000/reservas",

            {
                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    "Authorization": token

                },

                body: JSON.stringify({

                    ambiente: ambiente,

                    materia: materia,

                    data: data,

                    hora: hora

                })

            }

        );

        const dados = await resposta.json();

        if (!resposta.ok) {

            alert(dados.mensagem);

            carregarHorarios();

            return;

        }

        localStorage.setItem(

            "reservaRealizada",

            JSON.stringify(dados.reserva)

        );

        window.location.href = "confirmacao.html";

    } catch (erro) {

        console.error("Erro:", erro);

        alert("Erro ao realizar reserva.");

    }

}


carregarHorarios();