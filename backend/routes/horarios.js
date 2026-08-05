const express = require("express");

const router = express.Router();

router.get("/",(req,res)=>{

res.json([

"07:15",

"08:05",

"08:55",

"10:00",

"10:50",

"11:35"

]);

});

module.exports = router;