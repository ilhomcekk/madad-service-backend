const express = require("express");
const router = express.Router();

const tarif = require("../controllers/tarifController");

// create route
router.post("/tarif/create", tarif.tarif_create);

// delete route
router.delete("/tarif/delete/:id", tarif.tarif_delete);

// update route
router.put("/tarif/:id/update", tarif.tarif_update);

// detail route
router.get("/tarif/:id", tarif.tarif_detail);

// read route
router.get("/tarif", tarif.tarif);

router.get("/tariffs/category_id/:id", tarif.tarif_by_category);

module.exports = router;
