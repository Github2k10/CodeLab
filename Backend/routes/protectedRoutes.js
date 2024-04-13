const express = require("express");
const router = express.Router();

const userModel = require("../models/user");
const verifyToken = require("../middleware/authMiddleware");

router.post("/addRoom", verifyToken, async (req, res) => {
  try {
    const { roomId } = req.body;

    if (!roomId) {
      return res.status(400).json({ error: "Room Id is required" });
    }

    const user = await userModel.findById(req.userId);
    user.rooms.push(roomId);
    await user.save();

    return res.status(201).json({ message: "Room added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/isLoggedIn", verifyToken, (req, res) => {
  return res.status(200).json({ login: true, message: "User Logged In" });
});

router.get("/logout", verifyToken, (req, res) => {
  res.cookie("AuthToken", "", { maxAge: 0 });

  return res.status(200).json({ message: "Logout successful" });
});

module.exports = router;
