const express=require('express');
const mysql = require('mysql');
require('dotenv').config();
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});
app.listen(3000,()=>{
    console.log("Striver Let's Goooo! Yayaaaayyyy");
})
const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://judge0-ce.p.rapidapi.com/about',
  headers: {
    'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
app.post("/submit", async(req, res) => {
  try {
    console.log(req.body);

  
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      prefer_code_lang VARCHAR(255) NOT NULL,
      stdin VARCHAR(255) NOT NULL,
      src_code VARCHAR(255) NOT NULL
    )`;

  await connection.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating table:', err);
      return res.status(500).send('Error creating table');
    }
    console.log('Table created successfully lol!');
  });

  const inserter = `
    INSERT INTO users (username, prefer_code_lang, stdin, src_code)
    VALUES (?, ?, ?, ?)`;
  
  const values = [
    req.body.username,
    req.body.lang,
    req.body.stdin,
    req.body.code
  ];

  await connection.query(inserter, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Error inserting data');
    }
    console.log('Data inserted successfully!');
  });

  await connection.query("SELECT * FROM users;", (err, result) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Error fetching data');
    }
    console.log(result);
  });
  return res.send("done");
  } catch (error) {
    console.lof(error);
    return error;
  }
});