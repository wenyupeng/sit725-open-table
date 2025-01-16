const express = require("express");
const express = require("express");
const router = express.Router();
const {
  getMerchantByMerchantId,
  renderCreateMerchant,
  handleCreateMerchant,
  renderMerchantDetails,
  renderCreateMerchantPhotoGallery,
  handleCreateMerchantPhotoGallery,
  renderCreateMerchantOpenHours,
  handleCreateMerchantOpenHours,
} = require("../controllers/MerchantController");
const { getMenuByMerchantId } = require("../controllers/MenuController");

const {
  renderCreateBooking,
  handleCreateBooking,
} = require("../controllers/BookingController");

router.get('/register',async function (req,res) {
  res.render('./merchant/register',{
      
  })
})

router.get('/login',async function (req,res) {
  res.render('./merchant/login',{

  })
})

router.get("/:merchantId/menu", async function (req, res) {
  let merchantId = req.params.merchantId;
  let menu = await getMenuByMerchantId(merchantId);

  res.render("./menu/menu", {
    menu: menu,
  });

});

// Render a merchant details routes
router.get("/:merchantId", renderMerchantDetails);

// Render create merchant routes
router.get("/", renderCreateMerchant);

// handle create merchant routes
router.post("/", handleCreateMerchant);

// Render create merchant photogallery routes
router.get("/:merchantId/photo", renderCreateMerchantPhotoGallery);

// handle create merchant photogallery routes
router.post("/:merchantId/photo", handleCreateMerchantPhotoGallery);

// Render create merchant photogallery routes
router.get("/:merchantId/hours", renderCreateMerchantOpenHours);

// handle create merchant photogallery routes
router.post("/:merchantId/hours", handleCreateMerchantOpenHours);

// Render a merchant details routes
router.get("/:merchantId", renderMerchantDetails);


module.exports = router;

