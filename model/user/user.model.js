const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  this.password = bcrypt.hash(this.password, saltRounds);
  next();
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
