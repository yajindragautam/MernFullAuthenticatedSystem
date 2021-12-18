const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    trim: true,
  },
  role: {
    type: Number,
    default: 0, // 0 for user, 1 for admin
  },
  avator: {
    type: String,
    default:
      "https://res.cloudinary.com/manix/image/upload/v1639722719/avator/istockphoto-1214428300-170667a_c4fsdt.jpg",
  },
});
//! Exporting User Modules
module.exports = mongoose.model("Users", userSchema);