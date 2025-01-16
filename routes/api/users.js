const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/UserController');

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

// User lsit
router.get('/', UserController.userlist);


module.exports = router;