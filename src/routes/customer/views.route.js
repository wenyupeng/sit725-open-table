const express = require("express");

// Router
const router = express.Router();

router.get("/", (req, res) => res.render('customer/home'));
router.get('/merchant', (req, res) => res.render('customer/merchant'));

module.exports = router;