const express = require("express");
const { renderMerchantDashboardBookingsPage } = require('../controllers/BookingController')

const router = express.Router();

router.get("/login", async function (req, res) {
  res.render("./merchant-dashboard/merchant_login", { message: null });
});

router.get("/bookings", renderMerchantDashboardBookingsPage);

module.exports = router;
