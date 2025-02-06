const express = require("express");
const router = express.Router();
const apiResponse = require("../../utils/utils.apiResponse");

router.post("/block", function (req, res) {
    console.log('===========')
  apiResponse.successResponse(res, "success block");
});

router.post("/manage", function (req, res) {
    console.log('===========')
  apiResponse.successResponse(res, "success block");
});
module.exports = router;
