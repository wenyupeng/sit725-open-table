const { PopularMerModel, FeaturedCollectionsModel, MerchantsModel } = require('../models');
const log = require('../utils/utils.logger');
const authenticate = require('../middlewares/jwt');
const apiResponse = require('../utils/utils.apiResponse');
const permissions = require('../middlewares/permissions');

/**
 * get popular merchants
 * @returns {Object} popular merchants
 */
exports.popularMerchants =
    async () => {
        try {
            return await PopularMerModel.find({});;
        } catch (err) {
            console.log(err);
            log.err(`popularMerchants error, ${JSON.stringify(err)} `);
            return [];
        }
    }

/**
 * get featured collections
 * @returns {Object} featured collections
 */
exports.featuredColletions =
    async () => {
        try {
            return await FeaturedCollectionsModel.find({}).limit(Number(4));
        } catch (err) {
            console.log(err);
            log.error(`featuredColletions error, ${JSON.stringify(err)}`);
            return [];
        }
    }

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

