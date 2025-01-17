const express = require("express");
const router = express.Router();

const customerRouter = require("./pages/customer-pages.route.js");

router.use("/merchant-dashboard", (_, res) => res.send("ok"));
router.use(customerRouter);

module.exports = router;
