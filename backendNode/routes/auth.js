const express = require("express");
const router = express.Router();
const normalUser = require("../models/normalUser");
const hospitalUser = require("../models/hospitalUser");

//Signin route
router.post("/signin", async (req, res) => {});

//signup route
router.post("/signup", async (req, res) => {
  console.log(req.body);
  res.send("OK");
});

//signup hospital route
router.post("/signupHospital", async (req, res) => {});

module.exports = router;
