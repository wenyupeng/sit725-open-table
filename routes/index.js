const express = require("express");
const router = express.Router();
const {
  popularMerchants,
  featuredColletions,
  topMerchants,
} = require("../controllers/MerchantController");

router.get("/", async function (req, res) {
  const searchQuery = req.query.q;
  const popular_mer = await popularMerchants();
  const featured_col = await featuredColletions();
  const top_six_mer = await topMerchants(searchQuery);

  res.render("./home/home", {
    popular_mer: popular_mer,
    featured_col: featured_col,
    top_six_mer: top_six_mer,
    searchQuery,
  });
});

module.exports = router;
