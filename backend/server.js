const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/login", require("./routes/auth"));
app.use("/materias", require("./routes/materias"));
app.use("/ambientes", require("./routes/ambientes"));
app.use("/reservas", require("./routes/reservas"));

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado em http://localhost:${PORT}`);
});