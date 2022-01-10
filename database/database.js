const mysql = require("mysql");
require("dotenv").config();
const Validator = require("jsonschema").Validator;
const validator = new Validator();

let config = {
  host: "mydb.tamk.fi",
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  connectionLimit: 10,
};

const connection = mysql.createPool(config);

const wordSchema = {
  type: "object",
  properties: {
    id: {
      type: "number",
      minimum: 1,
    },
    fin_word: {
      type: "string",
      minLength: 2,
    },
    en_word: {
      type: "string",
      minLength: 1,
    },
    tag: {
      type: "string",
    },
  },
  required: ["fin_word", "en_word"],
};

/**
 * A module that includes all the connection functions needed between the database and the application.
 * @module connectionFunctions
 */
let connectionFunctions = {
  /**
   *
   * @returns {Promise}
   */
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

  /**
   *
   * @returns {Promise}
   */
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

  /**
   *
   * @param {*} words
   * @returns {Promise}
   */
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

  /**
   *
   * @param {*} words
   * @param {*} id
   * @returns {Promise}
   */
  update: (words, id) => {
    return new Promise((resolve, reject) => {
      const validation = validator.validate(words, wordSchema);
      if (validation.errors.length > 0) {
        reject(validation.errors);
      } else {
        connection.query(
          "update words set fin_word = ?, en_word = ?, tag = ? where id = ?",
          [words.fin_word, words.en_word, words.tag, id],
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          }
        );
      }
    });
  },

  /**
   * Returns ...
   * @param {*} id - the id based on which a row is removed from the database
   * @returns {Promise} - represents the affected rows after deletion or error message
   */
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

  /**
   * Returns the requested data from the database
   * @param {string} tag - the tag by which the database is filtered
   * @returns {Promise} - represents the requested data or error message
   */
  findByTag: (tag) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "select * from words where tag = ?",
        tag,
        (err, words) => {
          if (err) {
            reject(err);
          } else {
            resolve(words);
          }
        }
      );
    });
  },
};

module.exports = connectionFunctions;
