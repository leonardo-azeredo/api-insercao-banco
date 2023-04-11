const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv').config();

const app = express();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

// Verifica se o banco de dados existe, se não existir, cria ele
connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_SCHEMA}`, function (err) {
  if (err) throw err;
  console.log(`Banco de dados criado ou já existente!`);

  // Conecta no banco de dados e cria a tabela se ela não existir
  connection.query(`USE ${process.env.DB_SCHEMA}`, function (err) {
    if (err) throw err;
    connection.query(`CREATE TABLE IF NOT EXISTS ${process.env.DB_TABLE} (
        id INT NOT NULL AUTO_INCREMENT,
        ${process.env.COLUNA1} VARCHAR(255) NOT NULL,
        ${process.env.COLUNA2} VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`, function (err) {
        if (err) throw err;
        console.log(`Tabela criada ou já existente!`);
      });

    console.log(`Conectado ao servidor de banco de dados!`);
  });
});

app.use(express.json());

app.post('/inserir', (req, res) => {
  const sql = `INSERT INTO ${process.env.DB_SCHEMA}.${process.env.DB_TABLE} (${process.env.COLUNA1}, ${process.env.COLUNA2}) VALUES (?, ?)`;
  connection.query(sql, [req.body[process.env.COLUNA1], req.body[process.env.COLUNA2]], (err, result) => {
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
