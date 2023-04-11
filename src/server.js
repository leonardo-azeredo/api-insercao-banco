const express = require('express');
const db = require('./db');

const app = express();

app.use(express.json());

app.post('/inserir', (req, res) => {
  const sql = `INSERT INTO ${process.env.DB_SCHEMA}.${process.env.DB_TABLE} (${process.env.COLUNA1}, ${process.env.COLUNA2}) VALUES (?, ?)`;
  db.query(sql, [req.body[process.env.COLUNA1], req.body[process.env.COLUNA2]], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao inserir dados na tabela');
    }
    console.log('Dados inseridos com sucesso!');
    return res.status(201).send('Dados inseridos com sucesso!');
  });
});

module.exports = app;
