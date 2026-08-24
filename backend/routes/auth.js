const express = require("express");

const router = express.Router();

const usuarios = require("../data/usuarios");


router.post("/", (req, res) => {

    const { email, senha } = req.body;


    const usuario = usuarios.find(
        usuario =>
            usuario.email === email &&
            usuario.senha === senha
    );


    if (usuario) {

        return res.status(200).json({

            sucesso: true,

            mensagem: "Login realizado com sucesso!",

            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }

        });

    }


    return res.status(401).json({

        sucesso: false,

        mensagem: "E-mail ou senha incorretos."

    });

});


module.exports = router;