const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: { type: String, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
});

// Ensure the model is only defined once
const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;


