const express = require("express");
const AdminController = require("../controllers/admin.controller");

const router = express.Router();

router.get("/", AdminController.renderAdminHomePage);
router.get("/login", AdminController.renderAdminLoginPage);

module.exports = router;
