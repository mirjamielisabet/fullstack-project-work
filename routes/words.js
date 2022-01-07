const express = require("express");
const router = express.Router();
const connection = require("../database/database.js");

router.use(express.json());

router.get("/", async (req, res) => {
  try {
    data = await connection.findAll();
    res.status(200).send(data);
  } catch (err) {
    res.status(404).send("Requested data not found");
  }
});

router.get("/:tag", async (req, res) => {
  try {
    let data = await connection.findByTag(req.params.tag);
    if (data.length === 0) {
      res.status(404).send("Requested data not found");
    } else {
      res.status(200).send(data);
    }
  } catch (err) {
    res.status(400).send("Invalid request");
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

router.put("/:id([0-9]+)", async (req, res) => {
  try {
    let words = req.body;
    await connection.update(words, req.params.id);
    words.id = req.params.id;
    res.status(201).send(words);
  } catch (err) {
    res.status(500).send();
  }
});

router.delete("/:id([0-9]+)", async (req, res) => {
  try {
    let data = await connection.deleteById(req.params.id);
    if (data === 0) {
      res.status(400).send();
    } else {
      res.status(204).send(null);
    }
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
