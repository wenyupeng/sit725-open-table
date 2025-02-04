const express = require("express");
const router = express.Router();
const MerchantController = require("../controllers/MerchantController");

router.get("/", async function (req, res) {
  const searchQuery = req.query.q;
  const popular_mer = await MerchantController.popularMerchants();
  const featured_col = await MerchantController.featuredColletions();
  const pagination = await MerchantController.queryPagenationForPage(req);

  res.render("./home/home", {
    popular_mer: popular_mer,
    featured_col: featured_col,
    top_six_mer: pagination,
  });
});

module.exports = router;
