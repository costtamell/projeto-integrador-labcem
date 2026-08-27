async function carregarMaterias() {

    const token = localStorage.getItem("token");

    console.log("Token recebido:", token);

    if (!token) {

        alert("Você precisa fazer login.");

        window.location.href = "index.html";

        return;
    }

    try {

        const resposta = await fetch(
            "http://127.0.0.1:5000/materias",
            {
                method: "GET",

                headers: {
                    "Authorization": token
                }
            }
        );

        const dados = await resposta.json();

        console.log("Resposta das matérias:", dados);

        if (!resposta.ok) {

            alert(dados.mensagem);

            return;
        }

        const lista = document.getElementById("listaMaterias");

        lista.innerHTML = "";

        dados.forEach(function(m) {

            const card = document.createElement("div");

            card.className = "card";

            const titulo = document.createElement("h3");

            titulo.textContent = m.nome;

            card.appendChild(titulo);

            card.onclick = function() {

                escolher(m.nome);

            };

            lista.appendChild(card);

        });

    } catch (erro) {

        console.error("Erro ao carregar matérias:", erro);

        alert("Erro ao carregar as matérias.");

    }

}


function escolher(nome) {

    localStorage.setItem(
        "materia",
        nome
    );

    window.location.href = "calendario.html";

}


carregarMaterias();