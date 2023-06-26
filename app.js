require("dotenv/config");

const express = require("express");
const app = express();

const cors = require("cors");
const { default: mongoose } = require("mongoose");

// app.use(cors({ origin: true }));

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => console.log("Connected to MongoDB !!"))
  .on("error", (error) => console.log(`Error: ${error}`));

// user authentication route
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

const port = 4000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.get("/", (req, res) => {
  return res.json("Hi there...");
});
