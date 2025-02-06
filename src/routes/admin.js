const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  // todo
  res.render("./admin/admin", { pageTitle: "adminManagement", message: null });
});

router.get("/login", async (req, res) => {
  res.render("./admin/login_admin", {
    pageTitle: "Admin Login",
    message: null,
  });
});

module.exports = router;
