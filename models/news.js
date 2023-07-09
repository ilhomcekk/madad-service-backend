const mongoose = require("mongoose");

// data schema
const newsSchema = new mongoose.Schema({
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
  comments: [
    {
      name: {
        type: String,
      },
      phone: {
        type: String,
      },
      comment: {
        type: String,
      },
      date: {
        type: String,
      },
    },
  ],
  viewCount: {
    type: Number,
    default: 0,
  },
  date: String,
});

// data model
const News = mongoose.model("News", newsSchema);

module.exports = News;
