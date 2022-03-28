const express = require("express");
const router = express.Router();
const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const config = require("config");
const KEY = config.get("PRIVATE-KEY");
const loginSchema = require("../../validation/loginValidation");
const bcrypt = require("bcrypt");

// handle login

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const { error } = loginSchema.validate({
    email,
    password,
  });
  if (error) {
    res.status(400).send("error," + error);
    return;
  }
  const user = await User.findOne({ email: email });
  if (user) {
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send("דואר אלקטרוני או סיסמה לא תקינים");
    }
  }
  try {
    const token = jwt.sign({ _id: user._id.toString() }, KEY);
    user.token = token;
    await user.save();
    res.status(200).send({
      token: token,
      firstName: req.body.firstName,
      email: req.body.email,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
