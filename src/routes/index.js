const express = require("express");
const router = express.Router();
const MerchantService = require("../controllers/MerchantService");

router.get("/", async function (req, res) {
  const popular_mer = await MerchantService.popularMerchants();
  const featured_col = await MerchantService.featuredColletions();
  const pagination = await MerchantService.queryPagenationForPage(req);

  res.render("./home/home", {
    popular_mer: popular_mer,
    featured_col: featured_col,
    top_six_mer: pagination,
  });
});

module.exports = router;
