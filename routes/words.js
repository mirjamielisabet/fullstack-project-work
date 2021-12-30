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

module.exports = router;
