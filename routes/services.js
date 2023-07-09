const express = require("express");
const router = express.Router();
const upload = require("../utils/storage");

const services = require("../controllers/servicesController");

// create route
router.post(
  "/services/create",
  upload.single("photo"),
  services.services_create
);

// delete route
router.delete("/services/delete/:id", services.services_delete);

// update route
router.put(
  "/services/:id/update",
  upload.single("photo"),
  services.services_update
);

// detail route
router.get("/services/:id", services.services_detail);

// read route
router.get("/services", services.services);

router.get("/services/category_id/:id", services.services_by_category);

module.exports = router;
