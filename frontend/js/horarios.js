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

                headers: {

                    "Authorization": token

                }

            }

        );


        const horarios = await resposta.json();


        if (!resposta.ok) {

            alert(horarios.mensagem);

            return;

        }


        const lista = document.getElementById("lista-horarios");

        lista.innerHTML = "";


        if (horarios.length === 0) {

            lista.innerHTML = `
                <p>Não há horários disponíveis neste dia.</p>
            `;

            return;

        }


        horarios.forEach(function(horario) {

            const botao = document.createElement("button");

            botao.className = "horario";

            botao.textContent = horario;


            botao.addEventListener("click", function() {

                criarReserva(horario);

            });


            lista.appendChild(botao);

            lista.appendChild(
                document.createElement("br")
            );

        });

    } catch (erro) {

        console.error(erro);

        alert("Erro ao carregar horários.");

    }

}



async function criarReserva(horario) {

    const token = localStorage.getItem("token");

    const ambiente = localStorage.getItem("ambiente");

    const materia = localStorage.getItem("materia");

    const data = localStorage.getItem("dataSelecionada");


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

                    hora: horario

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
            "horarioSelecionado",
            horario
        );


        localStorage.setItem(
            "ultimaReserva",
            JSON.stringify(dados.reserva)
        );


        window.location.href = "confirmacao.html";


    } catch (erro) {

        console.error(erro);

        alert("Erro ao realizar reserva.");

    }

}


carregarHorarios();