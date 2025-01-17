const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.get('/register', async (req, res) => {
    res.render("./login/register", { pageTitle: "Register", message: null });
});

router.get('/login', async (req, res) => {
    res.render("./login/login", { pageTitle: "Login", message: null });
});

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect("/api/auth/login");
    });
});


module.exports = router;