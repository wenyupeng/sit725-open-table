const { body, validationResult } = require("express-validator");
const { ObjectId } = require("mongodb");
const {
  PopularMerModel,
  FeaturedCollectionsModel,
  MerchantsModel,
  MenuModel  
} = require("../models");

const log = require("../utils/utils.logger");

/**
 * get popular merchants
 * @returns {Object} popular merchants
 */
exports.popularMerchants = async () => {
  try {
    return await PopularMerModel.find({});
  } catch (err) {
    console.log(err);
    log.err(`popularMerchants error, ${JSON.stringify(err)} `);
    return [];
  }
};

/**
 * get featured collections
 * @returns {Object} featured collections
 */
exports.featuredColletions = async () => {
  try {
    return await FeaturedCollectionsModel.find({}).limit(Number(4));
  } catch (err) {
    console.log(err);
    log.error(`featuredColletions error, ${JSON.stringify(err)}`);
    return [];
  }
};

/**
 * get merchant info by merchantId
 * @returns {Object} merchant info
 */
exports.getMerchantByMerchantId = async (merchantId) => {
  try {
    return await MerchantsModel.findById(merchantId);
  } catch (err) {
    console.log(err);
    log.error(`featuredColletions error, ${JSON.stringify(err)}`);
    return {};
  }
};

/**
 * Create merchant 
 */
exports.handleCreateMerchant = [
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("location").notEmpty().withMessage("Address is required"),
    body("contactPhone")
      .isLength({ min: 6 })
      .trim()
      .withMessage("password could not be empty or less than 6 character"),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render("./merchant/merchantAumCreate-form", {
          pageTitle: "Add Merchant",
          message: errors.array(),
        });
      } else {
        const merchant = new MerchantsModel({
          name: req.body.name.replace(/[<>]/g, ""),
          description: req.body.description.replace(/[<>]/g, ""),
          location: req.body.location.replace(/[<>]/g, ""),
          contactPhone: req.body.contactPhone.replace(/[<>]/g, ""),
          type: req.body.type,
          category: req.body.category,
          backgroundImg: req.body.backgroundImg,
          hours: req.body.hours,
          photoGallery: req.body.photoGallery || [],
          openHours: req.body.openHours || [],
        });
        await merchant.save();
        res.redirect("/");
      }
    } catch (err) {
      log.error(`Add Merchant error, ${JSON.stringify(err)}`);

      res.status(500).render("./merchant/merchantAumCreate-form", {
        pageTitle: "Add Merchant",
        message: err.message,
      });
    }
  },
];

// Render create a merchant
exports.renderCreateMerchant = [
  (req, res) => {
    res.render("./merchant/merchantAumCreate-form", {
      pageTitle: "Merchant",
      message: null,
    });
  },
];

// Render a merchant details
exports.renderMerchantDetails = [
  async (req, res) => {
    const { merchantId } = req.params;

    const merchant = await MerchantsModel.findById(merchantId);

    const menu = await MenuModel.findOne({merchantId: { $eq:  merchantId } });

    res.render("./merchant/merchant", {
      pageTitle: "Merchant Details",
      merchant: merchant,
      menu: menu  || []    
    });
  },
];

/**
 * get featured collections
 * @returns {Object} featured collections
 */
exports.featuredMerchants = async () => {
  try {
    return await MerchantsModel.find({}).limit(Number(4));
  } catch (err) {
    console.log(err);
    log.error(`featuredMerchants error, ${JSON.stringify(err)}`);
    return [];
  }
},
  /**
   * get popular merchants sorted by name
   * @returns {Object} popular merchants 
   */
 exports.popularMerchants = async () => {
    try {
      return await MerchantsModel.find({}).sort({ name: -1 });
    } catch (err) {
      console.log(err);
      log.error(`featuredMerchants error, ${JSON.stringify(err)}`);
      return [];
    }
  };

/**
 * Add photo to a merchant 
 */
exports.handleCreateMerchantPhotoGallery = [
  [body("ImageUrl").notEmpty().withMessage("Image Url is required")],
  async (req, res) => {
    try {
      const { merchantId } = req.params;

      const merchantImageUrl = {
        _id: new ObjectId(),
        imageUrl: req.body.ImageUrl,
      };

      await MerchantsModel.findByIdAndUpdate(
        merchantId,
        { $push: { photoGallery: merchantImageUrl } },
        { new: true }
      );
      res.redirect(`/merchant/${merchantId}`);
    } catch (err) {
      res.status(500).render("./merchant/merchant_add_photo", {
        pageTitle: "Add Merchant Photo Gallery",
        message: err.message,
      });
    }
  },
];

/**
 *  Render a merchant create photogallery
 * 
 */
exports.renderCreateMerchantPhotoGallery = async (req, res) => {
  const { merchantId } = req.params;
  const merchant = await MerchantsModel.findById(merchantId);
  console.log("merchant", merchant);
  res.render("./merchant/merchant_add_photo", {
    pageTitle: "Add Merchant Photo Gallery",
    merchant: merchant,
  });
};

/**
 * Add OpenHours to a merchant 
 */
exports.handleCreateMerchantOpenHours = async (req, res) => {
  try {
    const { merchantId } = req.params;

    const merchantOpenHours = {
      _id: new ObjectId(),
      Monday: req.body.mondayTime,
      Tuesday: req.body.tuesdayTime,
      Wednesday: req.body.wednesdayTime,
      Thursday: req.body.thursdayTime,
      Friday: req.body.fridayTime,
      Saturday: req.body.saturdayTime,
      Sunday: req.body.sundayTime,
    };

    await MerchantsModel.findByIdAndUpdate(
      merchantId,
      { $push: { openHours: merchantOpenHours } },
      { new: true }
    );
    res.redirect(`/merchant/${merchantId}`);
  } catch (err) {
    res.status(500).render("./merchant/merchant_add_hours", {
      pageTitle: "Add Merchant Open Hours",
      message: err.message,
    });
  }
};
/**
 * Render a merchant openhours
 */
exports.renderCreateMerchantOpenHours = async (req, res) => {
    const { merchantId } = req.params;
    const merchant = await MerchantsModel.findById(merchantId);
    console.log("merchant", merchant);
    res.render("./merchant/merchant_add_hours", {
      pageTitle: "Add Merchant OpenHours",
      merchant: merchant,
    });
  };
