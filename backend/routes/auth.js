const express=require("express");

const router=express.Router();

const usuarios=require("../data/usuarios");

router.post("/",(req,res)=>{

const{email,senha}=req.body;

const usuario=usuarios.find(

u=>u.email===email && u.senha===senha

);

if(usuario){

return res.json({

mensagem:"Login realizado com sucesso.",

usuario

});

}

res.status(401).json({

mensagem:"Email ou senha inválidos."

});

});

module.exports=router;