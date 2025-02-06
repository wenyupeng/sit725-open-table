const express = require("express");
const router = express.Router();

router.get("/register", async (req, res) => {
  res.render("./login/register_user", { pageTitle: "Register", message: null });
});

router.get("/login", async (req, res) => {
  res.render("./login/login_user", { pageTitle: "Login", message: null });
});

router.get("/logout", async (req, res) => {
  req.session.destroy();
  res.render("./login/logout_user", { pageTitle: "LogOut", message: null });
});

router.get("/forgot", async (req, res) => {
  res.render("./login/forgot_password", {
    pageTitle: "forgotpassword",
    message: null,
  });
});

module.exports = router;
