const express = require("express");

const router = express.Router();

const usuarios = require("../data/usuarios");

router.post("/", (req,res)=>{

const {email,senha} = req.body;

const usuario = usuarios.find(u=>

u.email===email &&
u.senha===senha

);

if(usuario){

return res.json({

sucesso:true,

mensagem:"Login realizado.",

usuario

});

}

return res.status(401).json({

sucesso:false,

mensagem:"Email ou senha incorretos."

});

});

module.exports = router;