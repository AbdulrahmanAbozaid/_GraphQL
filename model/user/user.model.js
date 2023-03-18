const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 5;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    maxLength: 15,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /.+@.+\.(com|org|email)+/,
      "Must match an email address, tlds: [com|org|email]",
    ],
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  address: {
    type: String,
    required: true,
  },
  books: [
    {
      type: mongoose.Types.ObjectId,
      ref: "books",
    },
  ],
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
