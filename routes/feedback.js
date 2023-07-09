const express = require("express");
const router = express.Router();

const feedback = require("../controllers/feedbackController");

// create route
router.post("/feedback/create", feedback.feedback_create);

// delete route
router.delete("/feedback/delete/:id", feedback.feedback_delete);

// detail route
router.get("/feedback/:id", feedback.feedback_detail);

// read route
router.get("/feedback", feedback.feedback);

module.exports = router;
