import mysql2 from "mysql2/promise.js";
import dotenv from "dotenv";
dotenv.config();

const initDatabaseConnection = async () => {
  try {
    const connection = await mysql2.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB,
    });

    console.log("Connected to database");
    return connection;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const database = await initDatabaseConnection();

export default database;
