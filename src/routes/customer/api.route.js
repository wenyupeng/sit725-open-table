const express = require("express");

const authController = require('../../controllers/customer/auth.controller')

// Router
const router = express.Router();

// Get all todos
router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;