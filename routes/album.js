const router = require("express").Router();

const album = require("../models/album");

router.post("/save", async (req, res) => {
  const newAlbum = album({
    name: req.body.name,
    imageUrl: req.body.imageUrl,
  });

  try {
    const savedAlbum = await newAlbum.save();
    return res.status(200).send({ success: true, album: savedAlbum });
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

  const data = await album.find({}, null, options);
  if (data) {
    return res.status(200).send({ success: true, albums: data });
  } else {
    return res.status(400).send({ success: false, msg: "Album not found." });
  }
});

router.get("/get/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const data = await album.findOne(filter);

  if (data) {
    return res.status(200).send({ success: true, album: data });
  } else {
    return res.status(400).send({ success: false, msg: "Album not found." });
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
  };

  try {
    const updatedAlbum = await album.findOneAndUpdate(
      filter,
      update,
      options
    );

    if (updatedAlbum) {
      return res.status(200).send({
        success: true,
        msg: "Updated Successfully.",
        data: updatedAlbum,
      });
    } else {
      return res.status(400).send({
        success: false,
        msg: "Album not found.",
      });
    }
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, msg: "Failed to update.", error: error });
  }
});

module.exports = router;
