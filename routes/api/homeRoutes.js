// routes/homeRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('./home/home', { pageTitle: 'Home' });
});

module.exports = router;