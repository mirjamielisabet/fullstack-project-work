const mysql = require("mysql");
require("dotenv").config();
const Validator = require("jsonschema").Validator;
const validator = new Validator();

/**
 * @type {Object} config - Options for the connection
 * @property {string} host - The hostname of the database
 * @property {string} user - The MySQL user
 * @property {string} password - The password of the MySQL user
 * @property {string} database - Name of the database to use for this connection
 * @property {number} connectionLimit - The maximum number of connections to create at once
 */
let config = {
  host: "mydb.tamk.fi",
  user: process.env.user || process.env.DB_USER,
  password: process.env.password || process.env.DB_PASSWORD,
  database: process.env.database || process.env.DB_DB,
  connectionLimit: 10,
};

/**
 * Create a connection pool.
 */
const connection = mysql.createPool(config);

/**
 * Schema for validating the inputted data.
 */
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
 * @module database/database
 */
let connectionFunctions = {
  /**
   * Function for closing the connection.
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
   * Function for finding all words, returns error or the result of the sql query.
   * @returns {Promise} - represents the result or the error message
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
   * Function for saving new words, returns error or the info of the insert id.
   * @param {Object} words - the data to be saved
   * @returns {Promise} - represents the result or the error message
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
   * Function for updating data, if error occurs returns error.
   * @param {Object} words - the data to be saved
   * @param {string} id - the id of the data row to be updated
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
   * Function for deleting data, returns error or the info of the rows affected.
   * @param {string} id - the id based on which a row is removed from the database
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
   * Function for finding words filtered by a tag, returns error or the result of the sql query.
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
