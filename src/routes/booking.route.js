const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/booking.controller");

router.get("/:merchantId", bookingController.renderCreateBooking);
router.post("/:merchantId", bookingController.handleCreateBooking);

module.exports = router;
