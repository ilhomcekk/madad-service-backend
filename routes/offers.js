const express = require("express");
const router = express.Router();
const upload = require("../utils/storage");

const offers = require("../controllers/offersController");

// create route
router.post("/offers/create", upload.single("photo"), offers.offers_create);

// delete route
router.delete("/offers/delete/:id", offers.offers_delete);

// update route
router.put("/offers/:id/update", upload.single("photo"), offers.offers_update);

// detail route
router.get("/offers/:id", offers.offers_detail);

// read route
router.get("/offers", offers.offers);

module.exports = router;
