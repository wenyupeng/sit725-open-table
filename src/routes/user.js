const express = require("express");
const UserController = require("../controllers/user.controller");

const router = express.Router();

router.get("/register", UserController.renderUserRegisterPage);
router.get("/login", UserController.renderUserLoginPage);
router.get("/logout", UserController.renderLogout);
router.get("/forgot", UserController.renderForgotPasswordPage);

module.exports = router;
