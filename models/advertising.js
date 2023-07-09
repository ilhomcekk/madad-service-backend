const mongoose = require("mongoose");

// data schema
const advertisingSchema = {
  name_ru: {
    type: String,
    required: true,
    trim: true,
  },
  name_uz: {
    type: String,
    trim: true,
  },
  name_en: {
    type: String,
    trim: true,
  },
  description_ru: {
    type: String,
    trim: true,
  },
  description_uz: {
    type: String,
    trim: true,
  },
  description_en: {
    type: String,
    trim: true,
  },
  photo: String,
  link: String,
  date: String,
};

// data model
const Advertising = mongoose.model("Advertising", advertisingSchema);

module.exports = Advertising;
