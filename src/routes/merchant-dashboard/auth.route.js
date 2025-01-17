const express = require("express");
const router = express.Router();

const authPageController = require("../../controllers/auth.controller");

router.get("/login", authPageController.renderMerchantDashboardLogin);

module.exports = router;
