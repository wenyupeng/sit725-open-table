const { PopularMerModel, FeaturedCollectionsModel, MerchantsModel,MenuModel} = require('../models');
const { ObjectId } = require("mongodb");
const log = require('../utils/utils.logger');
const authenticate = require('../middlewares/jwt');
const apiResponse = require('../utils/utils.apiResponse');
const permissions = require('../middlewares/permissions');
const { body, validationResult } = require('express-validator');
const { MerchantCategories } = require('../constant/constant')


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
 * merchant login
 * @returns {Object} if login success return token, else return error message
 */
exports.login = [
    [
        body("phone").isLength({ min: 9 }).withMessage("name could not be empty or less than 9 character"),
        body("pwd").notEmpty().withMessage("password could not be empty"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return apiResponse.validationErrorWithData(res, errors.array()[0].msg);
        }

        console.log(req.body)

        let merchant = await MerchantsModel.findOne({ phone: req.body.phone, password: req.body.pwd });
        if (!merchant) {
            return apiResponse.unauthorizedResponse(res, 'Invalid phone or password');
        }

        console.log(merchant);


        merchant.token = 'Bearer ' + jwt.sign(
            merchant,
            process.env.SIGN_KEY,
            { expiresIn: 3600 * 2 }
        );

        req.session.merchant = merchant;
        return apiResponse.successResponseWithData(res, 'Login Success', merchant);
    }
]

/**
 * merchant login
 * @returns {Object} if login success return token, else return error message
 */
exports.login = [
    [
        body("phone").isLength({ min: 9 }).withMessage("name could not be empty or less than 9 character"),
        body("pwd").notEmpty().withMessage("password could not be empty"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return apiResponse.validationErrorWithData(res, errors.array()[0].msg);
        }

        console.log(req.body)

        let merchant = await MerchantsModel.findOne({ phone: req.body.phone, password: req.body.pwd });
        if (!merchant) {
            return apiResponse.unauthorizedResponse(res, 'Invalid phone or password');
        }

        console.log(merchant);


        merchant.token = 'Bearer ' + jwt.sign(
            merchant,
            process.env.SIGN_KEY,
            { expiresIn: 3600 * 2 }
        );

        req.session.merchant = merchant;
        return apiResponse.successResponseWithData(res, 'Login Success', merchant);
    }
]

/**
 * get merchant info by merchantId
 * @returns {Object} merchant info
 */
exports.getMerchantByMerchantId =
    async (merchantId) => {
        try {
            return await MerchantsModel.findById(merchantId);;
        } catch (err) {
            console.log(err);
            log.error(`featuredColletions error, ${JSON.stringify(err)}`);
            return {};
        }
    }

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

/**
 * delete merchant by merchantId
 * @returns {Object} success message
 */
exports.delete = [
    authenticate,
    permissions,
    async (req, res) => {
        try {
            let merchantId = req.params.merchantId;
            let merchant = await MerchantsModel.findById(merchantId);
            if (!merchant) {
                return apiResponse.notFoundResponse(res, 'Merchant not found');
            }

            let flag = await MerchantsModel.UpdateOne({ _id: merchantId }, { $set: { isDeleted: true } });
            if (!flag) {
                return apiResponse.ErrorResponse(res, 'Internal Server Error');
            }

            return apiResponse.successResponse(res, 'Merchant deleted successfully');
        } catch (err) {
            console.log(err);
            log.error(`delete error, ${JSON.stringify(err)}`);
            return apiResponse.ErrorResponse(res, 'Internal Server Error');
        }
    }
]


/**
 * add merchant 
 * @returns {Object} success message
 */
exports.add = [
    [
        body("name").isLength({ min: 3 }).trim().withMessage("name could not be empty or less than 3 character"),
        body("contactPhone").isLength({ min: 9 }).trim().withMessage("contactPhone could not be empty or less than 9 character"),
    ],
    authenticate,
    permissions,
    async (req, res) => {
        try {
            let merchant = req.body;
            let name = merchant.name;
            let contactPhone = merchant.contactPhone;
            let existingMerchant = await MerchantsModel.findOne({ _id: merchantId });
            if (existingMerchant) {
                return apiResponse.ErrorResponse(res, 'Merchant already exists');
            }

            let obj = {
                backgroundImg: "",
                name: merchant.name,
                category: merchant.category,
                type: merchant.type,
                description: merchant.description,
                location: merchant.location,
                contactPhone: contactPhone,
                hours: merchant.hours,
                photoGallery: merchant.photoGallery,
                openHours: merchant.openHours,
            }


            let flag = await MerchantsModel.save(merchant);
            if (!flag) {
                return apiResponse.ErrorResponse(res, 'Internal Server Error');
            }
            return apiResponse.successResponseWithData(res, 'Merchant added successfully', merchant);
        } catch (err) {
            console.log(err);
            log.error(`add error, ${JSON.stringify(err)}`);
            return apiResponse.ErrorResponse(res, 'Internal Server Error');
        }
    }
]

/**
 * update merchant
 * @returns {Object} common message
 */
exports.update = [
    authenticate,
    permissions,
    async (req, res) => {
        try {
            let merchantId = req.params.merchantId;
            let merchant = await MerchantsModel.findById(merchantId);
            if (!merchant) {
                return apiResponse.notFoundResponse(res, 'Merchant not found');
            }

            let updatedMerchant = await MerchantsModel.findByIdAndUpdate(merchantId, req.body, { new: true });
            return apiResponse.successResponseWithData(res, 'Merchant updated successfully', updatedMerchant);
        } catch (err) {
            console.log(err);
            log.error(`update error, ${JSON.stringify(err)}`);
            return apiResponse.ErrorResponse(res, 'Internal Server Error');
        }
    }
]

/**
 * update merchant info by merchantId
 * @returns {Object} common message
 */
exports.updateById = [
    authenticate,
    permissions,
    async (req, res) => {
        let merchantId = req.params.merchantId;
        let merchant = await MerchantsModel.findById(merchantId);
        if (!merchant) {
            return apiResponse.notFoundResponse(res, 'Merchant not found');
        }

        let updatedMerchant = await MerchantsModel.findByIdAndUpdate(merchantId, req.body, { new: true });
        if (!updatedMerchant) {
            return apiResponse.ErrorResponse(res, 'Internal Server Error');
        }
        return apiResponse.successResponseWithData(res, 'Merchant updated successfully', updatedMerchant);
    }
]

/**
 * get merchant list
 * @returns {Object} merchant list
 */

exports.queryPagenation = [
    authenticate,
    permissions,
    async (req, res) => {
        let pageNo = req.query.pageNo || 1;
        let pageSize = req.query.pageSize || 10;
        let query = req.query.query || '';
        let sort = req.query.sort || 'createdAt';
        let order = req.query.order || 'desc';

        let skip = (pageNo - 1) * pageSize;
        let limit = pageSize;

        let queryObj = {};
        if (query) {
            queryObj = {
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } },
                    { category: { $regex: query, $options: 'i' } },
                    { address: { $regex: query, $options: 'i' } },
                    { phone: { $regex: query, $options: 'i' } },
                    { email: { $regex: query, $options: 'i' } },
                ],
                isDeleted: { $ne: true }
            }
        }

        let sortObj = {};
        if (sort) {
            sortObj = { [sort]: order };
        }

        try {
            let merchants = await MerchantsModel.find(queryObj).sort(sortObj).skip(skip).limit(limit);
            let totalCount = await MerchantsModel.countDocuments(queryObj);
            let result = {
                merchants: merchants,
                totalCount: totalCount,
                pageNo: pageNo,
                pageSize: pageSize,
            }
            return apiResponse.successResponseWithData(res, result);
        } catch (err) {
            console.log(err);
            log.error(`queryPagenation error, ${JSON.stringify(err)}`);
            return apiResponse.ErrorResponse(res, { message: 'Internal Server Error' });
        }
    }

]

