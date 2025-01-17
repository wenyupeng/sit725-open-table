const express = require("express");
const router = express.Router();

router.get("/", async (_, res) =>
  res.render("./home/home", { popular_mer: [], featured_col: [] }),
);

module.exports = router;
