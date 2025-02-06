const express = require("express");
const router = express.Router();
const bookingService = require("../../services/booking.service");
const { ensureAuthenticated } = require("../../middlewares/session");
/**
 * @swagger
 * /api/booking/{merchantId}:
 *   post:
 *     summary: Create a new booking
 *     tags:
 *       - Booking
 *     parameters:
 *       - in: path
 *         name: merchantId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *               customerEmail:
 *                 type: string
 *               customerPhone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Booking created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/:merchantId", ensureAuthenticated, bookingService.handleCreateBooking);

// Render create booking routes
router.get("/:merchantId", ensureAuthenticated, bookingService.renderCreateBooking);

// Render List of bookings for current user
router.get("/:userId/bookings", ensureAuthenticated, bookingService.getLoggedInUserBookings);

router.post("/:userId/bookings/:bookingId/delete", ensureAuthenticated, bookingService.deleteBooking);

module.exports = router;
