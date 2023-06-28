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

router.get("/get/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const data = await song.findOne(filter);

  if (data) {
    return res.status(200).send({ success: true, song: data });
  } else {
    return res.status(400).send({ success: false, msg: "Song not found." });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const filter = {
    _id: req.params.id,
  };

  try {
    const result = await song.deleteOne(filter);
    return res
      .status(200)
      .send({ success: true, msg: "Deleted successfully.", result: result });
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, msg: "Failed to delete.", error: error });
  }
});

router.put("/update/:id", async (req, res) => {
  const filter = {
    _id: req.params.id,
  };

  const options = {
    new: true,
  };

  const update = {
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    songUrl: req.body.songUrl,
    album: req.body.album,
    artist: req.body.artist,
    language: req.body.language,
    category: req.body.category,
  };

  try {
    const updatedSong = await song.findOneAndUpdate(filter, update, options);

    if (updatedSong) {
      return res.status(200).send({
        success: true,
        msg: "Updated Successfully.",
        data: updatedSong,
      });
    } else {
      return res.status(400).send({
        success: false,
        msg: "Song not found.",
      });
    }
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, msg: "Failed to update.", error: error });
  }
});



module.exports = router;
