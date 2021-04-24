const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TestTaken = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },

  userID: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const testtaken = mongoose.model("testtaken", TestTaken);

//export
module.exports = testtaken;
