const express = require("express");
const router = express.Router();

const login = require("../controllers/authController");

// read route
router.post("/register", login.register);

// read route
router.post("/login", login.login);

// read route
router.post("/get/login", login.get_login);

// update route
router.put("/login/update", login.login_update);

module.exports = router;
