const express = require("express");
const router = express.Router();
const connection = require("../database/database.js");

router.use(express.json());

router.get("/", async (req, res) => {
  try {
    let data = await connection.findAll();
    res.status(200).send(data);
  } catch (err) {
    res.status(404).send("Requested data not found");
  }
});

router.get("/:tag", async (req, res) => {
  try {
    let data = await connection.findByTag(req.params.tag);
    res.status(200).send(data);
  } catch (err) {
    res.status(404).send("Requested data not found");
  }
});

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

router.delete("/:id([0-9]+)", async (req, res) => {
  try {
    await connection.deleteById(req.params.id);
    res.status(204).send(null);
  } catch (err) {
    res.status(400).send("Bad Request: Cannot delete");
  }
});

module.exports = router;
