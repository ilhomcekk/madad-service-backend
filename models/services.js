const mongoose = require("mongoose");

// data schema
const servicesSchema = {
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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
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
  date: String,
};

// data model
const Services = mongoose.model("Services", servicesSchema);

module.exports = Services;
