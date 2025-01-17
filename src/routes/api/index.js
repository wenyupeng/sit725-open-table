const express = require("express");
const router = express.Router();

const authApiRoutes = require("./auth-api.route");
const userApiRoutes = require("./user-api.route");

router.use("/auth", authApiRoutes);
router.use("/users", userApiRoutes);

module.exports = router;
