const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HospitalUser = new Schema({
  hospitalname: {
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
  },
  staff: [
    {
      name: String,
      email: String,
      number: Number,
    },
  ],
});

const Hospitaluser = mongoose.model("hospitaluser", HospitalUser);

//export
module.exports = Hospitaluser;
