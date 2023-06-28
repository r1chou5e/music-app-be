const router = require("express").Router();

const artist = require("../models/artist");

router.post("/save", async (req, res) => {
  const newArtist = artist({
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    twitter: req.body.twitter,
    instagram: req.body.instagram,
  });

  try {
    const savedArtist = await newArtist.save();
    return res
      .status(200)
      .send({ success: true, msg: "Saved successfully.", artist: savedArtist });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

router.get("/get/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const data = await artist.findOne(filter);

  if (data) {
    return res.status(200).send({ success: true, artist: data });
  } else {
    return res.status(400).send({ success: false, msg: "Artist not found." });
  }
});

router.get("/get-all", async (req, res) => {
  const options = {
    sort: {
      createdAt: 1,
    },
  };

  const data = await artist.find({}, null, options);
  if (data) {
    return res.status(200).send({ success: true, artists: data });
  } else {
    return res.status(400).send({ success: false, msg: "Artist not found." });
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
    twitter: req.body.twitter,
    instagram: req.body.instagram,
  };

  try {
    const updatedArtist = await artist.findOneAndUpdate(
      filter,
      update,
      options
    );

    if (updatedArtist) {
      return res.status(200).send({
        success: true,
        msg: "Updated Successfully.",
        data: updatedArtist,
      });
    } else {
      return res.status(400).send({
        success: false,
        msg: "Artist not found.",
      });
    }
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, msg: "Failed to update.", error: error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const filter = {
    _id: req.params.id,
  };

  try {
    const result = await artist.deleteOne(filter);
    return res
      .status(200)
      .send({ success: true, msg: "Deleted successfully.", result: result });
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, msg: "Failed to delete.", error: error });
  }
});

module.exports = router;
