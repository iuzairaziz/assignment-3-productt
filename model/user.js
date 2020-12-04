var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  name: String,
  email: String,
  pass: String,
});

var UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
