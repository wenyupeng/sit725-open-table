const express = require("express");
const router = express.Router();
const ReviewController = require("../../controllers/review.controller");

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     tags:
 *       - Reviews
 *     summary: Add a new review
 *     description: Add a new review to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               merchantId:
 *                 type: string
 *                 description: merchantId
 *                 example: 67830cc1a9507d18e286c8fe
 *               menuId:
 *                 type: string
 *                 description: menuId
 *                 example: 678b039afaf7bc04e32bbf30
 *               userId:
 *                 type: string
 *                 description: userId
 *                 example: 678b0185d1bffcb7c9aeaa59
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: photos
 *                 example: ["photo1.jpg", "photo2.jpg"]
 *               descriptions:
 *                 type: string
 *                 description: descriptions
 *                 example: This is a good restaurant
 *               star:
 *                 type: number
 *                 description: star
 *                 example: 4.5
 *     responses:
 *       200:
 *         description: Review added successfully
 */
router.post("/", ReviewController.addReview);
/**
 * @swagger
 * /api/reviews/{merchantId}:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: Get all reviews for a merchant
 *     description: Get all reviews for a merchant
 *     parameters:
 *       - in: path
 *         name: merchantId
 *         required: true
 *         schema:
 *           type: string
 *         description: The merchantId of the restaurant
 *     responses:
 *       200:
 *         description: Reviews found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: Reviews not found
 */
router.get("/:merchantId", ReviewController.getReviews);

/**
 * @swagger
 * /api/reviews/{reviewId}:
 *   put:
 *     tags:
 *       - Reviews
 *     summary: Update a review
 *     description: Update a review in the database
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: The reviewId of the review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               merchantId:
 *                 type: string
 *                 description: merchantId
 *                 example: 67830cc1a9507d18e286c8fe
 *               menuId:
 *                 type: string
 *                 description: menuId
 *                 example: 678b039afaf7bc04e32bbf30
 *               userId:
 *                 type: string
 *                 description: userId
 *                 example: 678b0185d1bffcb7c9aeaa59
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: photos
 *                 example: ["photo1.jpg", "photo2.jpg"]
 *               descriptions:
 *                 type: string
 *                 description: descriptions
 *                 example: This is a good restaurant
 *               star:
 *                 type: number
 *                 description: star
 *                 example: 4.5
 *     responses:
 *       200:
 *         description: Review updated successfully
 */
router.put("/:reviewId", ReviewController.updateReview);

/**
 * @swagger
 * /api/reviews/{merchantId}:
 *   delete:
 *     tags:
 *       - Reviews
 *     summary: Delete all reviews for a merchant
 *     description: Delete all reviews for a merchant
 *     parameters:
 *       - in: path
 *         name: merchantId
 *         required: true
 *         schema:
 *           type: string
 *         description: The merchantId of the restaurant
 *     responses:
 *       200:
 *         description: Reviews deleted successfully
 */
router.delete("/:merhcantId", ReviewController.deleteReview);

module.exports = router;
