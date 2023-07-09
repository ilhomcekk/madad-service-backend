const express = require("express");
const router = express.Router();
const upload = require("../utils/storage");

const aboutUs = require("../controllers/aboutUsController");

// create route
router.post("/aboutUs/create", upload.single("photo"), aboutUs.aboutUs_create);

// delete route
router.delete("/aboutUs/delete/:id", aboutUs.aboutUs_delete);

// update route
router.put(
  "/aboutUs/:id/update",
  upload.single("photo"),
  aboutUs.aboutUs_update
);

// detail route
router.get("/aboutUs/:id", aboutUs.aboutUs_detail);

// read route
router.get("/aboutUs", aboutUs.aboutUs);

module.exports = router;
