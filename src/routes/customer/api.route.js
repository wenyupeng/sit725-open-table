const express = require("express");

const authController = require("../../controllers/customer/auth.controller");
const authenticate = require("../../middlewares/auth.middleware");
const { roles } = require("../../utils/role.util");

const router = express.Router();

// Unprotected routes
router.post("/login", authController.login);
router.post("/register", authController.register);

// Protected routes
router.get("/test", authenticate(roles.CUSTOMER), (req, res) =>
  res.success("yes"),
);

module.exports = router;
