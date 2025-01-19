const express = require('express');
const router = express.Router();
const BookingController = require("../../controllers/BookingController");
const authenticate = require("../../middlewares/jwt");
const permissions = require("../../middlewares/permissions");
const {ensureAuthenticated} = require("../../middlewares/session");
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

router.post("/:merchantId", ensureAuthenticated, BookingController.handleCreateBooking);

// Render create booking routes
router.get("/:merchantId", ensureAuthenticated, BookingController.renderCreateBooking);

// Render List of bookings for current user
router.get('/:userId/bookings', ensureAuthenticated, BookingController.getLoggedInUserBookings); 

router.post('/:userId/bookings/:bookingId/delete', ensureAuthenticated, BookingController.deleteBooking);

module.exports = router;