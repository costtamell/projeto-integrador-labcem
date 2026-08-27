async function carregarAmbientes() {

    const token = localStorage.getItem("token");

    console.log("Token recebido na página ambientes:", token);

    if (!token) {

        alert("Você precisa fazer login.");

        window.location.href = "index.html";

        return;

    }

    try {

        const resposta = await fetch(
            "http://127.0.0.1:5000/ambientes",
            {
                method: "GET",

                headers: {
                    "Authorization": token
                }
            }
        );

        const dados = await resposta.json();

        console.log("Resposta dos ambientes:", dados);

        if (!resposta.ok) {

            alert(dados.mensagem);

            return;

        }

        const div = document.getElementById("ambientes");

        div.innerHTML = "";

        dados.forEach(function(ambiente) {

            const botao = document.createElement("button");

            botao.textContent = ambiente.nome;

            botao.onclick = function() {

                localStorage.setItem(
                    "ambiente",
                    ambiente.nome
                );

                window.location.href = "materias.html";

            };

            div.appendChild(botao);

            div.appendChild(
                document.createElement("br")
            );

        });

    } catch (erro) {

        console.error("Erro:", erro);

        alert("Erro ao carregar ambientes.");

    }

}


async function logout() {

    const token = localStorage.getItem("token");

    try {

        await fetch(
            "http://127.0.0.1:5000/logout",
            {
                method: "POST",

                headers: {
                    "Authorization": token
                }
            }
        );

    } catch (erro) {

        console.error(erro);

    }

    localStorage.clear();

    window.location.href = "index.html";

}


carregarAmbientes();