const express = require("express");
const router = express.Router();
const apiResponse = require("../../utils/api-response.util");

router.get("/", function (req, res) {
  apiResponse.successResponse(res, "sit725-skipy");
});

module.exports = router;
