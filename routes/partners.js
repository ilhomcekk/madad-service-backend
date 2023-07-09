const express = require("express");
const router = express.Router();
const upload = require("../utils/storage");

const partners = require("../controllers/partnersController");

// create route
router.post(
  "/partners/create",
  upload.single("photo"),
  partners.partners_create
);

// delete route
router.delete("/partners/delete/:id", partners.partners_delete);

// update route
router.put(
  "/partners/:id/update",
  upload.single("photo"),
  partners.partners_update
);

// detail route
router.get("/partners/:id", partners.partners_detail);

// read route
router.get("/partners", partners.partners);

module.exports = router;
