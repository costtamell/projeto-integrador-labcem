async function login() {

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (email === "" || senha === "") {
        alert("Preencha o e-mail e a senha.");
        return;
    }

    try {

        const resposta = await fetch(
            "http://127.0.0.1:5000/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    senha: senha
                })
            }
        );

        const dados = await resposta.json();

        console.log("Resposta do login:", dados);

        if (resposta.ok) {

            // GUARDA O TOKEN
            localStorage.setItem("token", dados.token);

            // GUARDA O USUÁRIO
            localStorage.setItem(
                "usuario",
                JSON.stringify(dados.usuario)
            );

            // TESTE: mostra se o token foi salvo
            console.log(
                "Token salvo:",
                localStorage.getItem("token")
            );

            alert("Login realizado com sucesso!");

            window.location.href = "ambientes.html";

        } else {

            alert(dados.mensagem);

        }

    } catch (erro) {

        console.error("Erro:", erro);

        alert("Não foi possível conectar ao servidor Python.");

    }

}