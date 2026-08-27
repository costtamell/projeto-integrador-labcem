async function carregarAmbientes() {

    const token = localStorage.getItem("token");

    if (!token) {

        window.location.href = "index.html";

        return;
    }

    try {

        const resposta = await fetch(
            "http://localhost:5000/ambientes",
            {
                headers: {
                    "Authorization": token
                }
            }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {

            alert(dados.mensagem);

            window.location.href = "index.html";

            return;
        }

        const div = document.getElementById("ambientes");

        div.innerHTML = "";

        dados.forEach(ambiente => {

            const botao = document.createElement("button");

            botao.textContent = ambiente.nome;

            botao.onclick = function() {

                localStorage.setItem(
                    "ambiente",
                    ambiente.nome
                );

                window.location.href =
                    "materias.html";
            };

            div.appendChild(botao);

            div.appendChild(
                document.createElement("br")
            );
        });

    } catch (erro) {

        console.error(erro);

        alert("Erro ao carregar ambientes.");
    }
}


async function logout() {

    const token = localStorage.getItem("token");

    await fetch(
        "http://localhost:5000/logout",
        {
            method: "POST",

            headers: {
                "Authorization": token
            }
        }
    );

    localStorage.clear();

    window.location.href = "index.html";
}


carregarAmbientes();

    