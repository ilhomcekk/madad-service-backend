const mongoose = require("mongoose");

// data schema
const tarifSchema = {
  name: {
    type: String,
    trim: true,
  },
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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  tariffs: [
    {
      type: String,
    },
  ],
  price: {
    type: String,
  },
  date: String,
};

// data model
const TarifSchema = mongoose.model("Tarif", tarifSchema);

module.exports = TarifSchema;
