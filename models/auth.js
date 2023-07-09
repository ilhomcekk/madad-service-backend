const mongoose = require("mongoose");

// data schema
const loginSchema = {
  name: String,
  password: String,
  token: String,
};

// data model
const Login = mongoose.model("Login", loginSchema);

module.exports = Login;
