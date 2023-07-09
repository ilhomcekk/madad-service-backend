const express = require("express");
const router = express.Router();
const upload = require("../utils/storage");

const category = require("../controllers/categoryController");

// create route
router.post(
  "/category/create",
  upload.single("photo"),
  category.category_create
);

// delete route
router.delete("/category/delete/:id", category.category_delete);

// update route
router.put(
  "/category/:id/update",
  upload.single("photo"),
  category.category_update
);

// detail route
router.get("/category/:id", category.category_detail);

// read route
router.get("/category", category.category);

module.exports = router;
