var express = require("express");
const { User } = require("../model/User");
var bcrypt = require("bcryptjs");
var _ = require("lodash");
var jwt = require("jsonwebtoken");
var config = require("config");
var router = express.Router();

router.post("/register", async function (req, res, next) {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User with given email already exists");
  user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  await user.genHashPass();
  await user.save();
  let token = jwt.sign(
    { _id: user._id, name: user.name, role: user.role },
    config.get("jwtPrivateKey")
  );

  let dataToReturn = {
    name: user.name,
    email: user.email,
    token: token,
  };
  res.send(dataToReturn);
});

router.post("/login", async function (req, res, next) {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User not registered");
  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(401).send("Invalid Password");
  let token = jwt.sign(
    { _id: user._id, name: user.name, role: user.role },
    config.get("jwtPrivateKey")
  );

  res.send(token);
});

module.exports = router;
