const mysql = require('mysql2');
const dotenv = require('dotenv').config();

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

module.exports = connection;
