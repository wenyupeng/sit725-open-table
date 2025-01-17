const express = require("express");
const router = express.Router();

const {
  getFeaturedColletions,
  getPopularMerchants,
} = require("../services/merchant.service");

router.get("/", async (_, res) => {
  const featuredCol = await getFeaturedColletions();
  const popularMerchants = await getPopularMerchants();
  res.render("./home/home", {
    popular_mer: popularMerchants,
    featured_col: featuredCol,
  });
});

module.exports = router;
