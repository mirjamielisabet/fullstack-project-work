const express = require("express");
const router = express.Router();
const connection = require("../database/database.js");

router.use(express.json());

router.get("/", async (req, res) => {
  try {
    data = await connection.findAll();
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    let words = req.body;
    let data = await connection.save(words);
    words.id = data;
    res.status(201).send(words);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
