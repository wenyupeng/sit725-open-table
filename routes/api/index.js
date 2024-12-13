const express = require('express');
const router = express.Router();
const apiResponse = require('../../utils/utils.apiResponse');

router.get('/', function (req, res) {
    apiResponse.successResponse(res, 'sit725-skipy')
});

module.exports = router;