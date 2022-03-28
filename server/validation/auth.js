const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const config = require("config");
const KEY = config.get("PRIVATE-KEY");
const auth = async (req, res, next) => {
  try {
    const id = jwt.verify(req.headers.token, KEY);
    if (id) {
      const user = await User.findOne({ _id: id });
      if (req.headers.token != user.token) {
        return res.status(400).send("not a user");
      }
      req.user = user;
    } else {
      res.send("not auth");
    }
    next();
  } catch (e) {
    if (e.message === "invalid signature") {
      res.status(400).send("not a user");
      return;
    }
    res.status(400).send("error");
  }
};

module.exports = auth;
