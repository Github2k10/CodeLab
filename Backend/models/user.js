const mongoose = require("mongoose");

mongoose.connect(process.env.mongodb_String);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rooms: [],
});

module.exports = mongoose.model("users", userSchema);
