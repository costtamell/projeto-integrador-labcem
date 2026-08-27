from flask import Flask, request, jsonify
from flask_cors import CORS
import secrets

from data.usuarios import usuarios
from data.materias import materias
from data.horarios import horarios
from data.reservas import reservas


# ==========================================
# CRIA O APLICATIVO FLASK
# ==========================================

app = Flask(__name__)

CORS(app)


# ==========================================
# SESSÕES ATIVAS
# ==========================================

sessoes = []


# ==========================================
# FUNÇÃO PARA VERIFICAR O TOKEN
# ==========================================

def autenticar():

    token = request.headers.get("Authorization")

    if not token:
        return None

    for sessao in sessoes:

        if sessao["token"] == token:

            return sessao

    return None


# ==========================================
# TESTE DO SERVIDOR
# ==========================================

@app.route("/", methods=["GET"])
def inicio():

    return jsonify({
        "mensagem": "Servidor Python do LabCem funcionando!"
    })


# ==========================================
# LOGIN
# ==========================================

@app.route("/login", methods=["POST"])
def login():

    dados = request.get_json()

    # Verifica se recebeu os dados
    if not dados:

        return jsonify({
            "mensagem": "Dados não enviados."
        }), 400


    email = dados.get("email")
    senha = dados.get("senha")


    # Verifica se os campos foram enviados
    if not email or not senha:

        return jsonify({
            "mensagem": "E-mail e senha são obrigatórios."
        }), 400


    usuario_encontrado = None


    # Procura o usuário
    for usuario in usuarios:

        if (
            usuario["email"] == email
            and usuario["senha"] == senha
        ):

            usuario_encontrado = usuario

            break


    # Usuário não encontrado
    if usuario_encontrado is None:

        return jsonify({
            "sucesso": False,
            "mensagem": "E-mail ou senha incorretos."
        }), 401


    # Cria um token
    token = secrets.token_hex(16)


    # Salva a sessão
    sessoes.append({
        "token": token,
        "usuario_id": usuario_encontrado["id"]
    })


    # Retorna os dados para o site
    return jsonify({

        "sucesso": True,

        "mensagem": "Login realizado com sucesso!",

        "token": token,

        "usuario": {

            "id": usuario_encontrado["id"],

            "nome": usuario_encontrado["nome"],

            "email": usuario_encontrado["email"]

        }

    }), 200


# ==========================================
# AMBIENTES
# ==========================================

@app.route("/ambientes", methods=["GET"])
def listar_ambientes():

    sessao = autenticar()


    # Verifica o token
    if sessao is None:

        return jsonify({
            "mensagem": "Acesso negado. Faça login novamente."
        }), 401


    ambientes = [

        {
            "id": 1,
            "nome": "Tablets"
        },

        {
            "id": 2,
            "nome": "Chromebooks"
        },

        {
            "id": 3,
            "nome": "Laboratório de Informática"
        }

    ]


    return jsonify(ambientes), 200


# ==========================================
# MATÉRIAS
# ==========================================

@app.route("/materias", methods=["GET"])
def listar_materias():

    sessao = autenticar()


    if sessao is None:

        return jsonify({
            "mensagem": "Acesso negado. Faça login novamente."
        }), 401


    return jsonify(materias), 200


# ==========================================
# HORÁRIOS DISPONÍVEIS
# ==========================================

@app.route("/horarios", methods=["GET"])
def listar_horarios():

    sessao = autenticar()


    if sessao is None:

        return jsonify({
            "mensagem": "Acesso negado. Faça login novamente."
        }), 401


    ambiente = request.args.get("ambiente")

    data = request.args.get("data")


    # Verifica se ambiente e data foram enviados
    if not ambiente or not data:

        return jsonify({
            "mensagem": "Ambiente e data são obrigatórios."
        }), 400


    horarios_disponiveis = []


    # Verifica cada horário
    for hora in horarios:

        ocupado = False


        # Procura reservas existentes
        for reserva in reservas:

            if (
                reserva["ambiente"] == ambiente
                and reserva["data"] == data
                and reserva["hora"] == hora
            ):

                ocupado = True

                break


        # Se não estiver ocupado, adiciona
        if not ocupado:

            horarios_disponiveis.append(hora)


    return jsonify(horarios_disponiveis), 200


# ==========================================
# CRIAR RESERVA
# ==========================================

@app.route("/reservas", methods=["POST"])
def criar_reserva():

    sessao = autenticar()


    if sessao is None:

        return jsonify({
            "mensagem": "Acesso negado. Faça login novamente."
        }), 401


    dados = request.get_json()


    if not dados:

        return jsonify({
            "mensagem": "Dados da reserva não enviados."
        }), 400


    ambiente = dados.get("ambiente")

    materia = dados.get("materia")

    data = dados.get("data")

    hora = dados.get("hora")


    # Verifica os campos
    if not ambiente or not materia or not data or not hora:

        return jsonify({
            "mensagem": "Preencha todos os dados da reserva."
        }), 400


    # Verifica se o horário já está reservado
    for reserva in reservas:

        if (
            reserva["ambiente"] == ambiente
            and reserva["data"] == data
            and reserva["hora"] == hora
        ):

            return jsonify({
                "mensagem": "Este horário já está reservado."
            }), 400


    # Cria a nova reserva
    nova_reserva = {

        "id": len(reservas) + 1,

        "usuario_id": sessao["usuario_id"],

        "ambiente": ambiente,

        "materia": materia,

        "data": data,

        "hora": hora

    }


    # Salva a reserva
    reservas.append(nova_reserva)


    return jsonify({

        "mensagem": "Reserva realizada com sucesso!",

        "reserva": nova_reserva

    }), 201


# ==========================================
# LISTAR RESERVAS
# ==========================================

@app.route("/reservas", methods=["GET"])
def listar_reservas():

    sessao = autenticar()


    if sessao is None:

        return jsonify({
            "mensagem": "Acesso negado. Faça login novamente."
        }), 401


    return jsonify(reservas), 200


# ==========================================
# LOGOUT
# ==========================================

@app.route("/logout", methods=["POST"])
def logout():

    token = request.headers.get("Authorization")


    if not token:

        return jsonify({
            "mensagem": "Token não informado."
        }), 401


    for sessao in sessoes:

        if sessao["token"] == token:

            sessoes.remove(sessao)


            return jsonify({
                "mensagem": "Logout realizado com sucesso!"
            }), 200


    return jsonify({
        "mensagem": "Token inválido."
    }), 401


# ==========================================
# INICIAR SERVIDOR
# ==========================================

if __name__ == "__main__":

    print("========================================")
    print("      LABCEM - SERVIDOR PYTHON")
    print("========================================")
    print("Servidor iniciado!")
    print("Endereço: http://127.0.0.1:5000")
    print("========================================")

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )