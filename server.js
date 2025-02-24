console.log("Iniciando o servidor...");


require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error("Erro ao conectar no MySQL:", err);
        return;
    }
    console.log("Conectado ao banco de dados MySQL!");
});

// Rota para listar indivíduos
app.get("/individuals", (req, res) => {
    db.query("SELECT * FROM individuals", (err, result) => {
        if (err) {
            res.status(500).json({ error: err });
            return;
        }
        res.json(result);
    });
});

// Rota para adicionar um novo indivíduo
app.post("/add_individual", (req, res) => {
    const { name } = req.body;
    db.query("INSERT INTO individuals (name) VALUES (?)", [name], (err, result) => {
        if (err) {
            res.status(500).json({ error: err });
            return;
        }
        res.json({ message: "Indivíduo adicionado", id: result.insertId });
    });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3001;
app.listen(3001, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
