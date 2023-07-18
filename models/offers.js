const mongoose = require("mongoose");

// data schema
const offersSchema = {
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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  photo: String,
  date: String,
};

// data model
const Offers = mongoose.model("Offers", offersSchema);

module.exports = Offers;
