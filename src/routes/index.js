const express = require("express");

const customerRoute = require("./customer/index");
const merchantRoute = require("./merchant/index");
const adminRoute = require("./admin/index");

// Router
const router = express.Router();

// Domain-specific routing
router.use((req, res, next) => {
  switch (req.appType) {
    case "customer":
      customerRoute(req, res, next);
      break;
    case "merchant":
      merchantRoute(req, res, next);
      break;
    case "admin":
      adminRoute(req, res, next);
      break;
    default:
      res.status(404).send("Invalid domain");
  }
});

module.exports = router;
