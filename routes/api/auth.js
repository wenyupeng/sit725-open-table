const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/AuthController');

/**
 * @swagger
 * components:
 *   schemas:
 *     NewUser:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: Chris Wen
 *         email:
 *           type: string
 *           example: testemail@gmail.com
 *         phone:
 *           type: string
 *           example: 0424068221
 *         password:
 *           type: string
 *           example: 123456
 *     RegisterUser:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 0000000001
 *         username:
 *           type: string
 *           example: Chris Wen
 *         email:
 *           type: string
 *           example: testemail@gmail.com
 *         phone:
 *           type: string
 *           example: 0424068221
 *         role:
 *           type: string
 *           example: user
*/

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     operationId: auth-register
 *     tags:
 *       - Auth
 *     summary: Register new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       201:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterUser'
 */
router.post('/register', AuthController.register);
router.get('/register', AuthController.renderRegister);
/**
 * @swagger
 * components:
 *   schemas:
 *     LoginUser:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: Chris Wen
 *         password:
 *           type: string
 *           example: 123456
 *     LoginSuccessUser:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 675cab572d2cf0b46917b34b
 *         username:
 *           type: string
 *           example: Chris Wen
 *         email:
 *           type: string
 *           example: testemail@gmail.com
 *         phone:
 *           type: string
 *           example: 424068221
 *         role:
 *           type: string
 *           example: user
 *         token:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjYWI1NzJkMmNmMGI0NjkxN2IzNGIiLCJ1c2VybmFtZSI6IkNocmlzIFdlbiIsImVtYWlsIjoidGVzdGVtYWlsQGdtYWlsLmNvbSIsInBob25lIjoiNDI0MDY4MjIxIiwiaWF0IjoxNzM0MTI3MzA2LCJleHAiOjE3MzQxMzQ1MDZ9.EaGrM2aHF3Qr3wsRvV-a9mxNoNsGXtjLX18OS4gn0hY
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     operationId: auth-login
 *     tags:
 *       - Auth
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       201:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginSuccessUser'
 */
router.get('/login', AuthController.renderLogin);
router.post('/login', AuthController.login);

module.exports = router;
