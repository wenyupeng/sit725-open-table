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
// User delete
router.delete('/', UserController.userDelete);
// User Registration
router.post('/register', userController.register);
// User Login
router.post('/login', userController.login);
// User Update (Requires Authentication)
router.put('/update/:id', authenticate, userController.update);

module.exports = router;