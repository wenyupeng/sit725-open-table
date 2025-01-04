const express = require("express");

const BookingController = require("../../controllers/BookingController");
const router = express.Router();

const ensureAuthenticated = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/api/auth/login");
  }
  next();
};
/**
 * @swagger
 * /api/bookings/{restaurantId}:
 *   post:
 *     summary: Create a booking for a restaurant
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         description: Restaurant ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *               time:
 *                 type: string
 *               guests:
 *                 type: integer
 *               menuItems:
 *                 type: array
 *               specialRequest:
 *                 type: string
 *     responses:
 *       201:
 *         description: Booking created successfully
 */

// Booking routes
router.post(
  "/:restaurantId",
  ensureAuthenticated,
  BookingController.handleCreateRestaurantBooking
);

/**
 * @swagger
 * /api/bookings/{restaurantId}:
 *   get:
 *     summary: Render booking form for a restaurant
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         description: Restaurant ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking form rendered successfully
 */
router.get(
  "/:restaurantId",
  ensureAuthenticated,
  BookingController.renderCreateRestaurantBooking
);

module.exports = router;
