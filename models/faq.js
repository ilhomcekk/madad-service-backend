const mongoose = require("mongoose");

// data schema
const faqSchema = {
  question_ru: {
    type: String,
    trim: true,
  },
  answer_ru: {
    type: String,
    trim: true,
  },
  question_uz: {
    type: String,
    trim: true,
  },
  answer_uz: {
    type: String,
    trim: true,
  },
  question_en: {
    type: String,
    trim: true,
  },
  answer_en: {
    type: String,
    trim: true,
  },
  date: String,
};

// data model
const Faq = mongoose.model("Faq", faqSchema);

module.exports = Faq;
