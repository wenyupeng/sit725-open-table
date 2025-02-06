const express = require("express");
const router = express.Router();
const userService = require("../../services/user.service");

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *      - Users
 *     summary: Returns users
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: successful operation
 */
router.get("/", userService.userlist);

/**
 * user delete
 */
router.delete("/", userService.userDelete);

// router.checkStatus('/status', authenticate, permissions, userService.checkStatus);

module.exports = router;
