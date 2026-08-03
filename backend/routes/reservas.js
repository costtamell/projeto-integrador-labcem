const express=require("express");

const router=express.Router();

const reservas=require("../data/reservas");

router.get("/",(req,res)=>{

res.json(reservas);

});

router.post("/",(req,res)=>{

const{

professor,

materia,

ambiente,

data,

hora

}=req.body;

const conflito=reservas.find(

r=>

r.ambiente===ambiente &&

r.data===data &&

r.hora===hora

);

if(conflito){

return res.status(400).json({

mensagem:"Este horário já está reservado."

});

}

const novaReserva={

id:reservas.length+1,

professor,

materia,

ambiente,

data,

hora

};

reservas.push(novaReserva);

res.status(201).json({

mensagem:"Reserva realizada com sucesso.",

novaReserva

});

});

router.delete("/:id",(req,res)=>{

const id=parseInt(req.params.id);

const indice=reservas.findIndex(

r=>r.id===id

);

if(indice==-1){

return res.status(404).json({

mensagem:"Reserva não encontrada."

});

}

reservas.splice(indice,1);

res.json({

mensagem:"Reserva cancelada."

});

});

module.exports=router;