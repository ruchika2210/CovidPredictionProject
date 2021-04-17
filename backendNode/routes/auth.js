const express = require("express");
const router = express.Router();
const normalUser = require("../models/normalUser");
const hospitalUser = require("../models/hospitalUser");

// For hashing of password to encrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;

//Signin route
router.post("/signin", async (req, res) => {});

//signup route
router.post("/signup", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    //Checks if user exists already
    const existeduser = await normalUser.find({ email });
    if (!existeduser.length) {
      bcrypt.hash(password, saltRounds).then(async (password) => {
        const user = new normalUser({ name, email, password });
        await user.save();
        res.send({ res: "Successful" });
      });
    } else {
      res.send({ res: "User Already Exists" });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//signup hospital route
router.post("/signupHospital", async (req, res) => {
  const hospitalName = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const contactNumber = req.body.number;
  try {
    //Checks if user exists already
    const existeduser = await normalUser.find({ email });
    if (!existeduser.length) {
      bcrypt.hash(password, saltRounds).then(async (password) => {
        const user = new hospitalUser({
          hospitalName,
          contactNumber,
          email,
          password,
        });
        await user.save();
        res.send({ res: "Successful" });
      });
    } else {
      res.send({ res: "User Already Exists" });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;
