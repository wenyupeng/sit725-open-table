const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    res.render("./admin", { pageTitle: "Register", message: null });
});

module.exports = router;