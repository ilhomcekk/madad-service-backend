const mongoose = require("mongoose");

// data schema
const tariffsServicesSchema = {
  name_ru: {
    type: String,
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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  photo: String,
  date: String,
};

// data model
const TariffsServicesSchema = mongoose.model(
  "TariffsServices",
  tariffsServicesSchema
);

module.exports = TariffsServicesSchema;
