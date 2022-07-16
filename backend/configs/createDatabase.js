import mysql2 from "mysql2/promise.js";
import dotenv from "dotenv";
dotenv.config();

const initDatabase = async () => {
  const connection = await mysql2.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB};`);

  console.log("Database created");

  connection.end();
};

initDatabase();
