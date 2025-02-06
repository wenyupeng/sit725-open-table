const express = require("express");
const router = express.Router();
const MerchantController = require("../controllers/merchant.controller");

router.get("/:merchantId", MerchantController.renderMerchantDetails);
router.get("/:merchantId/menu", MerchantController.renderMerchantMenu);

module.exports = router;
