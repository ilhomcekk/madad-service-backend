const mongoose = require("mongoose");

// data schema
const aboutUsSchema = {
  photo: String,
  date: String,
};

// data model
const AboutUs = mongoose.model("AboutUs", aboutUsSchema);

module.exports = AboutUs;
