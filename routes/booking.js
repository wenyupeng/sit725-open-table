const express = require("express");
const router = express.Router();
const bookingService = require("../services/booking.service");

router.get("/:merchantId", bookingService.renderCreateBooking);

router.get("/:userId/bookings", bookingService.getLoggedInUserBookings);

module.exports = router;
