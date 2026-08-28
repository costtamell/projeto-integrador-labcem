async function carregarMaterias() {

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Você precisa fazer login.");

        window.location.href = "./index.html";

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

        if (!resposta.ok) {

            alert(dados.mensagem);

            return;
        }

        const lista = document.getElementById("listaMaterias");

        lista.innerHTML = "";

        dados.forEach(function(m) {

            const botao = document.createElement("button");

            botao.className = "btn";

            botao.textContent = m.nome;

            botao.addEventListener("click", function() {

                localStorage.setItem(
                    "materia",
                    m.nome
                );

                window.location.href = "./calendario.html";

            });

            lista.appendChild(botao);

        });

    } catch (erro) {

        console.error(
            "Erro ao carregar matérias:",
            erro
        );

        alert("Erro ao carregar as matérias.");

    }

}

carregarMaterias();