const express = require("express");

const router = express.Router();

const materias = require("../data/materias");

router.get("/",(req,res)=>{

res.json(materias);

});

module.exports = router;