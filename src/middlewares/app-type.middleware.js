const express = require("express");

const config = require("../config/config");
const { roles } = require("../utils/role.util");

const router = express.Router();

// Middleware to route based on domain
router.use((req, res, next) => {
  const host = req.headers.host;
  if (host === config.customerAppHostname) {
    req.appType = roles.CUSTOMER;
  } else if (host === config.merchantAppHostname) {
    req.appType = roles.MERCHANT;
  } else if (host === config.adminAppHostname) {
    req.appType = roles.ADMIN;
  } else {
    res.status(404).send("Invalid domain");
    return;
  }
  next();
});

module.exports = router;
