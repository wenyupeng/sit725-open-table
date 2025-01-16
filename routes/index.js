const express = require("express");
const router = express.Router();
const {
  popularMerchants,
  featuredColletions,
} = require("../controllers/MerchantController");

router.get("/", async function (req, res) {
  let popular_mer = await popularMerchants();
  let featured_col = await featuredColletions();

  res.render("./home/home", {
    popular_mer: popular_mer,
    featured_col: featured_col,
  });
});

module.exports = router;
