const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv').config();

const app = express();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SCHEMA,
});

app.use(express.json());

const coluna1 = process.env.COLUNA1;
const coluna2 = process.env.COLUNA2;

app.post('/inserir', (req, res) => {
  const sql = `INSERT INTO ${process.env.DB_SCHEMA}.${process.env.DB_TABLE} (${coluna1}, ${coluna2}) VALUES (?, ?)`;
  connection.query(sql, [req.body[coluna1], req.body[coluna2]], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao inserir dados na tabela');
    }
    console.log('Dados inseridos com sucesso!');
    return res.status(201).send('Dados inseridos com sucesso!');
  });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`${process.env.RODANDO_STATUS} ${PORT}`);
});

// console.log(`COLUNA1: ${coluna1}, COLUNA2: ${coluna2}`);
