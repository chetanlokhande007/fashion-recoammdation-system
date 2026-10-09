const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  gender: String
});

module.exports = mongoose.model("User", UserSchema);