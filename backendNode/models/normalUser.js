const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NormalUser = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255,
  },

  password: {
    type: String,
    required: true,
  },
});

const Normaluser = mongoose.model("normaluser", NormalUser);

//export
module.exports = Normaluser;
