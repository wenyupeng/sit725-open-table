const express = require("express");
const router = express.Router();
const { renderCreateBooking } = require("../controllers/BookingController");

// Render create booking routes
router.get("/:merchantId", renderCreateBooking);


module.exports = router;
