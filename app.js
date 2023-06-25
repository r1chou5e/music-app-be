const express = require("express");
const app = express();

const cors = require("cors");

const port = 4000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.get("/", (req, res) => {
    return res.json("Hi there...");
})