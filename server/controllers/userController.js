const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* REGISTER USER */
exports.registerUser = async (req, res) => {
  try {

    const { fullName, email, password, gender } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.json({ message: "User already exists, please login" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      gender
    });

    await user.save();

    res.json({ message: "Account created successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* LOGIN USER */
exports.loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User not found. Please register." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      "secretkey",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};