const express = require("express");
const router = express.Router();
const MerchantController = require("../controllers/MerchantController");

router.get("/", async function (req, res) {
  const searchQuery = req.query.q;
  const popular_mer = await MerchantController.popularMerchants();
  const featured_col = await MerchantController.featuredColletions();
  const top_six_mer = await MerchantController.topMerchants(searchQuery);
  const pagination = await MerchantController.queryPagenation(req, res,"1");

  console.log(pagination);
  res.render("./home/home", {
    popular_mer: popular_mer,
    featured_col: featured_col,
    top_six_mer: top_six_mer,
    searchQuery,
  });
});

module.exports = router;
