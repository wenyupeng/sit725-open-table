const express = require("express");
const {
  renderMerchantDashboardBookingsPage,
} = require("../controllers/BookingController");
const { ensureMerchantAuthenticated } = require("../middlewares/session");

const router = express.Router();

router.get("/login", async function (req, res) {
  res.render("./merchant-dashboard/merchant_login", { message: null });
});

router.get("/logout", async (req, res) => {
  req.session.destroy();
  res.redirect("/merchant-dashboard/login");
});

router.get(
  "/bookings",
  ensureMerchantAuthenticated,
  renderMerchantDashboardBookingsPage,
);

module.exports = router;
