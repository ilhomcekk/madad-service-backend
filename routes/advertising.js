const express = require("express");
const router = express.Router();
const upload = require("../utils/storage");

const advertising = require("../controllers/advertisingController");

// create route
router.post(
  "/advertisings/create",
  upload.single("photo"),
  advertising.advertising_create
);

// delete route
router.delete("/advertisings/delete/:id", advertising.advertising_delete);

// update route
router.put(
  "/advertisings/:id/update",
  upload.single("photo"),
  advertising.advertising_update
);

// detail route
router.get("/advertisings/:id", advertising.advertising_detail);

// read route
router.get("/advertisings", advertising.advertising);

// read route
router.get("/advertisings/category_id/:id", advertising.advertising_by_category);

module.exports = router;
