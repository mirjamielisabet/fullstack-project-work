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
      minLength: 1,
    },
    en_word: {
      type: "string",
      minLength: 1,
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

  update: (words, id) => {
    return new Promise((resolve, reject) => {
      const validation = validator.validate(words, wordSchema);
      if (validation.errors.length > 0) {
        reject(validation.errors);
      } else {
        connection.query(
          "update words set fin_word = ?, en_word = ? where id = ?",
          [words.fin_word, words.en_word, id],
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result.affectedRows);
            }
          }
        );
      }
    });
  },

  deleteById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query("delete from words where id = ?", id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows);
        }
      });
    });
  },
};

module.exports = connectionFunctions;
