const express = require('express');
const router = express.Router();
const BookingController = require("../../controllers/BookingController");

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
router.post("/:merchantId", BookingController.handleCreateBooking);

module.exports = router;