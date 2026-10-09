const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/save-history", async (req, res) => {

  const { userId, weather, occasion, outfit } = req.body;

  try {

    const user = await User.findById(userId);

    user.history.push({
      weather,
      occasion,
      outfit
    });

    await user.save();

    res.json({ message: "History saved" });

  } catch (err) {

    res.status(500).json({ message: "Error saving history" });

  }

});

module.exports = router;