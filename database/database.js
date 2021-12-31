const mysql = require("mysql");
require("dotenv").config();
const Validator = require("jsonschema").Validator;
const validator = new Validator();

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});

const wordSchema = {
  type: "object",
  properties: {
    id: {
      type: "number",
      minimum: 1,
    },
    fin_word: {
      type: "string",
    },
    en_word: {
      type: "string",
    },
  },
  required: ["fin_word", "en_word"],
};

let connectionFunctions = {
  close: () => {
    return new Promise((resolve, reject) => {
      connection.end((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },

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

  save: (words) => {
    return new Promise((resolve, reject) => {
      const validation = validator.validate(words, wordSchema);
      if (validation.errors.length > 0) {
        reject(validation.errors);
      } else {
        connection.query("insert into words set ?", words, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.insertId);
          }
        });
      }
    });
  },
};

module.exports = connectionFunctions;
