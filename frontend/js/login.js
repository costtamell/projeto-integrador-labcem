async function login() {

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (email === "" || senha === "") {

        alert("Preencha o e-mail e a senha.");

        return;
    }

    try {

        const resposta = await fetch(
            "http://localhost:5000/login",
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

        console.log(dados);

        if (resposta.ok) {

            localStorage.setItem(
                "token",
                dados.token
            );

            localStorage.setItem(
                "usuario",
                JSON.stringify(dados.usuario)
            );

            alert("Login realizado com sucesso!");

            window.location.href = "ambientes.html";

        } else {

            alert(dados.mensagem);
        }

    } catch (erro) {

        console.error(erro);

        alert(
            "Não foi possível conectar ao servidor Python."
        );
    }
}