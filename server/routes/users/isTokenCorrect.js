const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const KEY = config.get("PRIVATE-KEY");
const auth = require("../../validation/auth");

router.get("/isTokenCorrect", auth, async (req, res) => {
  res.send("correct");
});

module.exports = router;
