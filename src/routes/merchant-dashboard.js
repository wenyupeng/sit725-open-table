const express = require("express");
const {
  renderMerchantDashboardBookingsPage,
  renderMerchantDashboardSettingsPage,
  renderMerchantDashboardMenuPage,
} = require("../controllers/booking.controller");
const {
  ensureMerchantAuthenticated,
} = require("../middlewares/session.middleware");

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

router.get(
  "/settings",
  ensureMerchantAuthenticated,
  renderMerchantDashboardSettingsPage,
);

router.get(
  "/menu",
  ensureMerchantAuthenticated,
  renderMerchantDashboardMenuPage,
);

module.exports = router;
