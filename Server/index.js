const express = require("express");
const mysql = require("mysql");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

app.listen(5000, () => {
  console.log("Striver Let's Goooo! Yayaaaayyyy");
});

app.post("/submit", async (req, res) => {
  try {
    console.log(req.body);
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      prefer_code_lang VARCHAR(255) NOT NULL,
      stdin VARCHAR(255) NOT NULL,
      src_code VARCHAR(255) NOT NULL,
      time datetime not null
    )`;

    await connection.query(createTableQuery, (err, result) => {
      if (err) {
        console.error("Error creating table:", err);
        return res.send({ s: false });
      }
      console.log("Table created successfully lol!");
    });

    const inserter = `
    INSERT INTO users (username, prefer_code_lang, stdin, src_code, time)
    VALUES (?, ?, ?, ?, ?)`;

    const values = [
      req.body.username,
      req.body.lang,
      req.body.stdin,
      req.body.code,
      req.body.time,
    ];

    await connection.query(inserter, values, (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.send({ s: false, message: "Username already in use." });
      }
      return res.send({ s: true });
    });
    return;
  } catch (error) {
    console.log(error);
    return res.send({ s: false });
  }
});

app.get("/getsub", async (req, res) => {
  try {
    const checkTableQuery = "SHOW TABLES LIKE 'users'";
    connection.query(checkTableQuery, async (err, result) => {
      if (err) {
        console.error("Error checking table:", err);
        return res.send({ s: false });
      }

      if (result.length === 0) {
        console.log("Table 'users' does not exist");
        return res.send({ s: false, message: "Table 'users' does not exist" });
      }

      await connection.query("SELECT * FROM users;", (err, result) => {
        if (err) {
          console.error("Error fetching data:", err);
          return res.send({ s: false });
        }
        return res.send({ s: true, result });
      });
    });
  } catch (error) {
    console.log(error);
    return res.send({ s: false });
  }
});
