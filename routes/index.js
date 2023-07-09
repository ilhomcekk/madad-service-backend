const express = require("express");
const router = express.Router();

const news = require("./news");
const offers = require("./offers");
const advertising = require("./advertising");
const partners = require("./partners");
const aboutUs = require("./aboutUs");
const services = require("./services");
const faq = require("./faq");
const category = require("./category");
const feedback = require("./feedback");
const telegram = require("./telegram");
const tarif = require("./tarif");
const tariffsServices = require("./tariffsServices");
const auth = require("./auth");

router.use("/", news);
router.use("/", offers);
router.use("/", advertising);
router.use("/", partners);
router.use("/", aboutUs);
router.use("/", services);
router.use("/", faq);
router.use("/", category);
router.use("/", feedback);
router.use("/", telegram);
router.use("/", tarif);
router.use("/", tariffsServices);
router.use("/", auth);

module.exports = router;
