from app import app


def test_horarios():

    cliente = app.test_client()

    # 1. Fazer login
    resposta_login = cliente.post(
        "/login",
        json={
            "email": "joao@escola.pr.gov.br",
            "senha": "123456"
        }
    )

    assert resposta_login.status_code == 200

    dados_login = resposta_login.get_json()

    assert dados_login["sucesso"] is True

    token = dados_login["token"]

    print("Login realizado com sucesso!")

    # 2. Consultar horários
    resposta_horarios = cliente.get(
        "/horarios?ambiente=1&data=2026-08-26",
        headers={
            "Authorization": token
        }
    )

    assert resposta_horarios.status_code == 200

    horarios = resposta_horarios.get_json()

    print("Horários disponíveis:")
    print(horarios)

    # 3. Verificar se retornou uma lista
    assert isinstance(horarios, list)

    print("Teste de horários passou!")


if __name__ == "__main__":
    test_horarios()
python testes_horarios.py
