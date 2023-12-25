const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: String,
  email: String,
  password: String,
  displayName: String,
  img: { type: String, default: "default-image-url" },
  // Other fields you want to save
});

const User = mongoose.model("User", userSchema);

module.exports = User;
