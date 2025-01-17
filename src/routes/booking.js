const express = require("express");
const router = express.Router();
const {
  renderCreateBooking,
  handleCreateBooking,
} = require("../controllers/BookingController");

// Render create booking routes
router.get("/:merchantId", renderCreateBooking);

// handle create booking routes
router.post("/:merchantId", handleCreateBooking);

module.exports = router;
