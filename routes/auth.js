const router = require("express").Router();
const admin = require("../config/firebase.config");

const user = require("../models/user");

router.get("/login", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ message: "Invalid Token" });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (!decodeValue) {
      return res.status(505).json({ message: "Unauthorized !!" });
    } else {
      // checking user exists or not
      const userExists = await user.findOne({ user_id: decodeValue.user_id });
      if (!userExists) {
        createNewUserData(decodeValue, req, res);
      } else {
        updateNewUserData(decodeValue, req, res);
      }
    }
  } catch (error) {
    return res.status(505).json({ message: error });
  }
});

const createNewUserData = async (decodeValue, req, res) => {
  const newUser = new user({
    name: decodeValue.name,
    email: decodeValue.email,
    imageUrl: decodeValue.picture,
    user_id: decodeValue.user_id,
    email_verified: decodeValue.email_verified,
    role: "member",
    auth_time: decodeValue.auth_time,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).send({ user: savedUser });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
};

const updateNewUserData = async (decodeValue, req, res) => {
  const filter = { user_id: decodeValue.user_id };

  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await user.findOneAndUpdate(
      filter,
      { auth_time: decodeValue.auth_time },
      options
    );
    res.status(200).send({ user: result });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
};

router.get("/get-all", async (req, res) => {
  const options = {
    sort: {
      createdAt: 1,
    },
  };

  const data = await user.find({}, null, options);
  if (data) {
    res.status(200).send({ success: true, users: data });
  } else {
    res.status(400).send({ success: false, msg: "User not found." });
  }
});

module.exports = router;
