const connection = require("./database/database.js");
const routes = require("./routes/words.js");
const express = require("express");
const app = express();
const cors = require("cors");

const server = app.listen(8080, async () => {
  console.log(`Listening on port ${server.address().port}`);
});

app.use(cors());
app.use("/words", routes);

const shutdown = () => {
  console.log("Closing HTTP server");
  server.close(async () => {
    console.log("HTTP server closed");
    try {
      await connection.close();
      console.log("mysql connection closed");
    } catch (err) {
      console.log(err);
    }
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
