const express = require("express");
const router = express.Router();
const bookingService = require("../../services/booking.service");
const authenticate = require("../../middlewares/jwt");
const permissions = require("../../middlewares/permissions");

router.get("/test", bookingService.test);
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
router.post("/:merchantId", authenticate, permissions, bookingService.handleCreateBooking);

// Render List of bookings for current user

router.post("/:userId/bookings/:bookingId/delete", authenticate, permissions, bookingService.deleteBooking);

router.post("/:userId/bookings/:bookingId/edit", authenticate, permissions, bookingService.renderUpdateBooking);

module.exports = router;
