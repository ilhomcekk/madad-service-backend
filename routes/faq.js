const express = require("express");
const router = express.Router();

const faq = require("../controllers/faqController");

// create route
router.post("/faq/create", faq.faq_create);

// delete route
router.delete("/faq/delete/:id", faq.faq_delete);

// update route
router.put("/faq/:id/update", faq.faq_update);

// detail route
router.get("/faq/:id", faq.faq_detail);

// read route
router.get("/faq", faq.faq);

module.exports = router;
