from flask import Flask, request, jsonify
from flask_cors import CORS
import secrets

from data.usuarios import usuarios
from data.materias import materias
from data.horarios import horarios
from data.reservas import reservas


app = Flask(__name__)

CORS(app)


# ==========================================
# SESSÕES
# ==========================================

sessoes = []


# ==========================================
# FUNÇÃO PARA VERIFICAR LOGIN
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
# LOGIN
# ==========================================

@app.route("/login", methods=["POST"])
def login():

    dados = request.get_json()

    email = dados.get("email")
    senha = dados.get("senha")

    usuario = None

    for u in usuarios:

        if u["email"] == email and u["senha"] == senha:

            usuario = u
            break

    if usuario is None:

        return jsonify({
            "sucesso": False,
            "mensagem": "E-mail ou senha incorretos."
        }), 401

    token = secrets.token_hex(16)

    sessoes.append({
        "token": token,
        "usuario_id": usuario["id"]
    })

    return jsonify({

        "sucesso": True,

        "mensagem": "Login realizado com sucesso!",

        "token": token,

        "usuario": {
            "id": usuario["id"],
            "nome": usuario["nome"],
            "email": usuario["email"]
        }

    }), 200


# ==========================================
# LOGOUT
# ==========================================

@app.route("/logout", methods=["POST"])
def logout():

    token = request.headers.get("Authorization")

    for sessao in sessoes:

        if sessao["token"] == token:

            sessoes.remove(sessao)

            return jsonify({
                "mensagem": "Logout realizado com sucesso!"
            })

    return jsonify({
        "mensagem": "Token inválido."
    }), 401


# ==========================================
# AMBIENTES
# ==========================================

@app.route("/ambientes", methods=["GET"])
def listar_ambientes():

    sessao = autenticar()

    if sessao is None:

        return jsonify({
            "mensagem": "Acesso negado. Faça login."
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

    return jsonify(ambientes)


# ==========================================
# MATÉRIAS
# ==========================================

@app.route("/materias", methods=["GET"])
def listar_materias():

    sessao = autenticar()

    if sessao is None:

        return jsonify({
            "mensagem": "Acesso negado. Faça login."
        }), 401

    return jsonify(materias)


# ==========================================
# HORÁRIOS
# ==========================================

@app.route("/horarios", methods=["GET"])
def listar_horarios():

    sessao = autenticar()

    if sessao is None:

        return jsonify({
            "mensagem": "Acesso negado. Faça login."
        }), 401

    ambiente = request.args.get("ambiente")
    data = request.args.get("data")

    horarios_disponiveis = []

    for hora in horarios:

        ocupado = False

        for reserva in reservas:

            if (
                reserva["ambiente"] == ambiente
                and reserva["data"] == data
                and reserva["hora"] == hora
            ):

                ocupado = True
                break

        if not ocupado:

            horarios_disponiveis.append(hora)

    return jsonify(horarios_disponiveis)


# ==========================================
# CRIAR RESERVA
# ==========================================

@app.route("/reservas", methods=["POST"])
def criar_reserva():

    sessao = autenticar()

    if sessao is None:

        return jsonify({
            "mensagem": "Acesso negado. Faça login."
        }), 401

    dados = request.get_json()

    ambiente = dados.get("ambiente")
    materia = dados.get("materia")
    data = dados.get("data")
    hora = dados.get("hora")

    # Verifica se já existe reserva

    for reserva in reservas:

        if (
            reserva["ambiente"] == ambiente
            and reserva["data"] == data
            and reserva["hora"] == hora
        ):

            return jsonify({
                "mensagem": "Este horário já está reservado."
            }), 400

    nova_reserva = {

        "id": len(reservas) + 1,

        "usuario_id": sessao["usuario_id"],

        "ambiente": ambiente,

        "materia": materia,

        "data": data,

        "hora": hora

    }

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
            "mensagem": "Acesso negado."
        }), 401

    return jsonify(reservas)


# ==========================================
# INICIAR SERVIDOR
# ==========================================

if __name__ == "__main__":

    print("================================")
    print("      LABCEM - SERVIDOR")
    print("================================")
    print("Servidor Python iniciado!")
    print("http://localhost:5000")

    app.run(
        host="localhost",
        port=5000,
        debug=True
    )