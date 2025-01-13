const express = require("express");

// Router
const router = express.Router();

// Get all todos
router.get("/", (req, res) => res.send('yeah'));

module.exports = router;