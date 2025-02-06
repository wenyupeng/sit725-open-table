const express = require("express");
const router = express.Router();
const merchantService = require("../services/merchant.service");

router.get("/", async function (req, res) {
  const searchQuery = req.query.q;
  const popular_mer = await merchantService.popularMerchants();
  const featured_col = await merchantService.featuredColletions();
  const pagination = await merchantService.queryPagenationForPage(req);

  res.render("./home/home", {
    popular_mer: popular_mer,
    featured_col: featured_col,
    top_six_mer: pagination,
  });
});

module.exports = router;
