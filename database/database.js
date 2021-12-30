const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});

let connectionFunctions = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      connection.query("select * from words", (err, words) => {
        if (err) {
          reject(err);
        } else {
          resolve(words);
        }
      });
    });
  },
};

module.exports = connectionFunctions;
