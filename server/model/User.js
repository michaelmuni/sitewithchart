const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config = require("../config/application");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
});

UserSchema.pre("save", function(next) {
  this.password = bcrypt.hashSync(this.password, config.SALT_ROUNDS);
  next();
});

module.exports = mongoose.model("User", UserSchema);
