const express = require("express");
const router = express.Router();
const upload = require("../utils/storage");

const tariffs = require("../controllers/tariffsServicesController");

// create route
router.post(
  "/tariffs/services/create",
  upload.single("photo"),
  tariffs.tariffs_services_create
);

// delete route
router.delete("/tariffs/services/delete/:id", tariffs.tariffs_services_delete);

// update route
router.put(
  "/tariffs/services/:id/update",
  upload.single("photo"),
  tariffs.tariffs_services_update
);

// detail route
router.get("/tariffs/services/:id", tariffs.tariffs_services_detail);

// read route
router.get("/tariffs/services", tariffs.tariffs_services);

router.get(
  "/tariffs/services/category_id/:id",
  tariffs.tariffs_services_by_category
);

module.exports = router;
