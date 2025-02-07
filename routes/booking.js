const express = require("express");
const router = express.Router();
const bookingService = require("../services/booking.service");

router.get("/:merchantId", bookingService.renderCreateBooking);

router.get("/:userId/bookings", bookingService.getLoggedInUserBookings);

router.get("/:userId/bookings/:bookingId/edit", bookingService.renderUpdateBooking);

module.exports = router;
