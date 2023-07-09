const mongoose = require("mongoose");

// data schema
const feedbackSchema = {
  name: {
    type: String,
    trim: true,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  date: String,
};

// data model
const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
