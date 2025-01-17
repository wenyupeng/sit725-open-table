const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/api/user.controller");

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
router.get("/", UserController.userlist);

/**
 * user delete
 */
router.delete("/", UserController.userDelete);

module.exports = router;
