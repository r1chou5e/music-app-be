require("dotenv/config");

const express = require("express");
const app = express();

const cors = require("cors");
const { default: mongoose } = require("mongoose");

app.use(cors({ origin: true }));
app.use(express.json());

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => console.log("Connected to MongoDB !!"))
  .on("error", (error) => console.log(`Error: ${error}`));

// user authentication route
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

// artist route
const artistRoute = require("./routes/artist");
app.use("/api/artist/", artistRoute);

// album route
const albumRoute = require("./routes/album");
app.use("/api/album/", albumRoute);

// song route
const songRoute = require("./routes/song");
app.use("/api/song/", songRoute);

const port = 4000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.get("/", (req, res) => {
  return res.json("Hi there...");
});
