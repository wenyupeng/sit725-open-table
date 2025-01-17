const express = require("express");
const router = express.Router();

const authPageController = require("../controllers/auth.controller");

router.get("/login", authPageController.renderLogin);
router.get("/register", authPageController.renderRegister);

module.exports = router;
