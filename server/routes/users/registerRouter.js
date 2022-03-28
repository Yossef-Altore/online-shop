const express = require("express");
const router = express.Router();
const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const config = require("config");
const KEY = config.get("PRIVATE-KEY");
const registerSchema = require("../../validation/registerValidation");

// register a new user
//send back the token
router.post("/register", async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const password = req.body.password;
  const validateValue = registerSchema.validate({
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
  });
  if (validateValue.error) {
    res.status(400).send("error," + validateValue.error);
    return;
  }
  const isEmailAlreadyExisted = await User.findOne({ email: req.body.email });
  if (isEmailAlreadyExisted != null) {
    return res.status(400).send("email already exists");
  }
  const user = new User(req.body);
  try {
    const token = jwt.sign({ _id: user._id.toString() }, KEY);
    user.token = token;
    await user.save();
    res.status(201).send({
      token: token,
      firstName: req.body.firstName,
      email: req.body.email,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
