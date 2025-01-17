const express = require("express");
const router = express.Router();

const authRoute = require("./auth.route");
const bookingRoute = require("./booking.route");

router.use("/auth", authRoute);
router.use("/bookings", bookingRoute);

module.exports = router;
