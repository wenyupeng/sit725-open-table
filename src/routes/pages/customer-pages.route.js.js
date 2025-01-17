const express = require("express");
const router = express.Router();

const bookingController = require("../../controllers/BookingController");
const authPageController = require("../../controllers/pages/auth-page.controller");

router.get("/auth/login", authPageController.renderLogin);
router.get("/auth/register", authPageController.renderRegister);

router.get("/booking/:merchantId", bookingController.renderCreateBooking);
router.post("/booking/:merchantId", bookingController.handleCreateBooking);

router.get("/", async (_, res) =>
  res.render("./home/home", { popular_mer: [], featured_col: [] }),
);

module.exports = router;
