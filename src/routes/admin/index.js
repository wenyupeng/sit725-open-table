const express = require("express");
const customerApiRoute = require('./api.route')
const customerViewsRoute = require('./views.route')

const router = express.Router();

router.use('/', customerViewsRoute);
router.use('/api', customerApiRoute);

module.exports = router;