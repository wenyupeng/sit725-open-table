const express = require("express");
const router = express.Router();

const allowedRoles = require("../../middlewares/allowed-roles");

const {
  renderMerchantDashboardMyBooking,
} = require("../../controllers/booking.controller");

router.get("/", allowedRoles(["merchant"]), renderMerchantDashboardMyBooking);

module.exports = router;
