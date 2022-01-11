const express = require("express");
const router = express.Router();
const connection = require("../database/database.js");

/**
 * Middleware function: parses incoming requests with JSON payloads.
 */
router.use(express.json());

/**
 * Route for retrieving all data from words.
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get("/", async (req, res) => {
  try {
    let data = await connection.findAll();
    res.status(200).send(data);
  } catch (err) {
    res.status(404).send("Requested data not found");
  }
});

/**
 * Route for retrieving data from words based on tag.
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get("/:tag", async (req, res) => {
  try {
    let data = await connection.findByTag(req.params.tag);
    res.status(200).send(data);
  } catch (err) {
    res.status(404).send("Requested data not found");
  }
});

/**
 * Route for posting data to words.
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post("/", async (req, res) => {
  try {
    let words = req.body;
    let data = await connection.save(words);
    words.id = data;
    res.status(201).send(words);
  } catch (err) {
    res
      .status(400)
      .send(
        "Bad Request: Posting the data failed. Check the inputted data: the text must be at least one (english) or two (finnish) character(s) long"
      );
  }
});

/**
 * Route for updating already existing data from words.
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.put("/:id([0-9]+)", async (req, res) => {
  try {
    let words = req.body;
    await connection.update(words, req.params.id);
    words.id = req.params.id;
    res.status(201).send(words);
  } catch (err) {
    res
      .status(400)
      .send(
        "Bad Request: Editing failed. Check the inputted data: the text must be at least one (english) or two (finnish) character(s) long"
      );
  }
});

/**
 * Route for deleting data from words.
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.delete("/:id([0-9]+)", async (req, res) => {
  try {
    await connection.deleteById(req.params.id);
    res.status(204).send(null);
  } catch (err) {
    res.status(400).send("Bad Request: Cannot delete");
  }
});

/**
 * Routes for routing.
 * @module routes/words
 */

module.exports = router;
