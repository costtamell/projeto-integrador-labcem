async function login() {

    const email = document.getElementById("email").value;

    const senha = document.getElementById("senha").value;

    try {

        const resposta = await fetch(
            "http://localhost:3000/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    senha
                })
            }
        );

        const dados = await resposta.json();

        console.log("Resposta do servidor:", dados);

        if (resposta.ok) {

            localStorage.setItem(
                "usuario",
                JSON.stringify(dados.usuario)
            );

            window.location.href = "ambientes.html";

        } else {

            alert(dados.mensagem);

        }

    } catch (erro) {

        console.error("Erro:", erro);

        alert("Não foi possível conectar ao servidor.");

    }

}