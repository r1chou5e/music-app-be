const router = require("express").Router();

const song = require("../models/song");

router.post("/save", async (req, res) => {
  const newSong = song({
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    songUrl: req.body.songUrl,
    album: req.body.album,
    artist: req.body.artist,
    language: req.body.language,
    category: req.body.category,
  });

  try {
    const savedSong = await newSong.save();
    return res.status(200).send({ success: true, song: savedSong });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

router.get("/get-all", async (req, res) => {
  const options = {
    sort: {
      createdAt: 1,
    },
  };

  const data = await song.find({}, null, options);
  if (data) {
    return res.status(200).send({ success: true, songs: data });
  } else {
    return res.status(400).send({ success: false, msg: "Song not found." });
  }
});

module.exports = router;
