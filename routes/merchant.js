const express = require("express");
const router = express.Router();
const merchantService = require("../services/merchant.service");
const { getMenuByMerchantId } = require("../services/menu.service");

// Render a merchant details routes
router.get("/:merchantId", merchantService.renderMerchantDetails);

router.get("/:merchantId/menu", async function (req, res) {
  let merchantId = req.params.merchantId;
  let categoryMap = await getMenuByMerchantId(merchantId);

  // console.log('>>> categoryMap', Object.values(categoryMap))

  // categoryMap.keys().forEach((c) => console.log('>>> ', c))


  res.render("./menu/menu", {
    menu: categoryMap,
  });
});

module.exports = router;
