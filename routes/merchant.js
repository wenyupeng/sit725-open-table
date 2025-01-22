const express = require("express");
const router = express.Router();
const {
  renderMerchantDetails,
  renderCreateMerchantPhotoGallery,
  handleCreateMerchantPhotoGallery,
  renderCreateMerchantOpenHours,
  handleCreateMerchantOpenHours,
} = require("../controllers/MerchantController");
const { getMenuByMerchantId } = require("../controllers/MenuController");

router.get("/register", async function (req, res) {
  res.render("./merchant/merchant_register", {
    pageTitle: "Merchant",
    message: null,
  });
});

router.get("/login", async function (req, res) {
  res.render("./merchant-dashboard/merchant_login", {});
});

// Render a merchant details routes
router.get("/:merchantId", renderMerchantDetails);

router.get("/:merchantId/menu", async function (req, res) {
  let merchantId = req.params.merchantId;
  let categoryMap = await getMenuByMerchantId(merchantId);

  res.render("./menu/menu", {
    menu: categoryMap,
  });
});

// Render create merchant photogallery routes
router.get("/:merchantId/photo", renderCreateMerchantPhotoGallery);

// handle create merchant photogallery routes
router.post("/:merchantId/photo", handleCreateMerchantPhotoGallery);

// Render create merchant photogallery routes
router.get("/:merchantId/hours", renderCreateMerchantOpenHours);

// handle create merchant photogallery routes
router.post("/:merchantId/hours", handleCreateMerchantOpenHours);

module.exports = router;
