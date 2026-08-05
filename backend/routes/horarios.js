const express = require("express");
const router = express.Router();

const reservas = require("../data/reservas");

const horarios = [
    "07:15",
    "08:05",
    "08:55",
    "10:00",
    "10:50",
    "11:35",
    "13:15",
    "14:05"
];

router.get("/", (req, res) => {

    const { ambiente, data } = req.query;

    const lista = horarios.map(horario => {

        const ocupado = reservas.some(r =>
            r.ambiente === ambiente &&
            r.data === data &&
            r.hora === horario
        );

        return {
            horario,
            ocupado
        };

    });

    res.json(lista);

});

module.exports = router;