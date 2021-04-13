const express = require("express");
const app = express();
const port = 3000;
const request = require("request");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/CovidTest", (req, res) => {});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
