const express = require("express");
const router = express.Router();
const MerchantService = require("../controllers/MerchantService");
const { getMenuByMerchantId } = require("../controllers/MenuService");

// Render a merchant details routes
router.get("/:merchantId", MerchantService.renderMerchantDetails);

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
