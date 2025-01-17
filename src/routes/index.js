const express = require("express");
const router = express.Router();

const apiRoute = require("./api/index");

const homeRoute = require("./home.route");
const authRoute = require("./auth.route");
const bookingRoute = require("./booking.route");
const merchantRoute = require("./merchant.route");

const merchantDashboardRoute = require("./merchant-dashboard");
const adminDashboardRoute = require("./admin-dashboard");

router.use("/api", apiRoute);

router.use("/auth", authRoute);
router.use("/booking", bookingRoute);
router.use("/merchant", merchantRoute);

// Merchant Dashboard
router.use("/md", merchantDashboardRoute);

// Admin Dashboard
router.use("/ad", adminDashboardRoute);

router.use(homeRoute);

module.exports = router;
