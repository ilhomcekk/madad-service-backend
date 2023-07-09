const mongoose = require("mongoose");

// data schema
const categorySchema = mongoose.Schema({
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
  photo: String,
  date: String,
});

// data model
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
