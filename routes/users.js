var express = require("express");
const UserModel = require("../model/user");
var router = express.Router();
var userModel = require("../model/user");
/* GET users listing. */
router.get("/register", function (req, res, next) {
  res.render("user/register");
});

router.get("/login", function (req, res, next) {
  res.render("user/login");
});

router.get("/logout", function (req, res, next) {
  req.session.user = null;
  res.redirect("/users/login");
});

router.post("/register", async function (req, res, next) {
  var user = new UserModel(req.body);
  await user.save();
  res.redirect("/");
});

router.post("/login", async function (req, res, next) {
  var email = req.body.email;
  var pass = req.body.pass;
  var user = await UserModel.findOne({ email, pass });
  if (!user) return res.render("user/login");
  req.session.user = user;

  res.redirect("/");
});

module.exports = router;
