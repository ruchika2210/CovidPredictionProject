const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HospitalUser = new Schema({
  Hospitalname: {
    type: String,
    required: true,
    maxlength: 50,
  },

  contactnumber: {
    type: Number,
    required: true,
    maxlength: 10,
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
    maxlength: 8,
  },
});

const Hospitaluser = mongoose.model("hospitaluser", HospitalUser);

//export
module.exports = Hospitaluser;
