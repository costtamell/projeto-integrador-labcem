import requests

URL = "http://localhost:3000/login"


def testar_login(email, senha, descricao):

    print("\n" + "=" * 50)
    print(descricao)
    print("=" * 50)

    dados = {
        "email": email,
        "senha": senha
    }

    try:

        resposta = requests.post(
            URL,
            json=dados
        )

        print("E-mail enviado:", email)
        print("Senha enviada:", senha)

        print("\nStatus Code:", resposta.status_code)

        dados_resposta = resposta.json()

        print("\nResposta do servidor:")

        for chave, valor in dados_resposta.items():
            print(f"{chave}: {valor}")

        if resposta.status_code == 200:
            print("\n✅ TESTE PASSOU")
            print("Login realizado com sucesso!")

        elif resposta.status_code == 401:
            print("\n✅ TESTE PASSOU")
            print("O servidor bloqueou o login incorreto.")

        else:
            print("\n❌ Resultado inesperado.")

    except requests.exceptions.ConnectionError:

        print("\n❌ ERRO DE CONEXÃO")
        print("O servidor Node.js não está rodando.")
        print("Execute no terminal:")
        print("node server.js")

    except Exception as erro:

        print("\n❌ Ocorreu um erro:")
        print(erro)


print("\n")
print("############################################")
print("#      TESTES DE AUTENTICAÇÃO - LABCEM      #")
print("############################################")


# TESTE 1
testar_login(
    "joao@escola.pr.gov.br",
    "123456",
    "TESTE 1 - LOGIN DO PROFESSOR JOÃO"
)


# TESTE 2
testar_login(
    "maria@escola.pr.gov.br",
    "123456",
    "TESTE 2 - LOGIN DA PROFESSORA MARIA"
)


# TESTE 3
testar_login(
    "admin@escola.pr.gov.br",
    "admin123",
    "TESTE 3 - LOGIN DO ADMINISTRADOR"
)


# TESTE 4
testar_login(
    "usuario@escola.pr.gov.br",
    "123456",
    "TESTE 4 - E-MAIL INCORRETO"
)


# TESTE 5
testar_login(
    "joao@escola.pr.gov.br",
    "senhaerrada",
    "TESTE 5 - SENHA INCORRETA"
)


print("\n")
print("############################################")
print("#           FIM DOS TESTES                  #")
print("############################################")