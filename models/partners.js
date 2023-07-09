const mongoose = require("mongoose");

// data schema
const partnersSchema = {
  name: {
    type: String,
    trim: true,
  },
  photo: String,
  link: String,
  date: String,
};

// data model
const Partners = mongoose.model("Partners", partnersSchema);

module.exports = Partners;
