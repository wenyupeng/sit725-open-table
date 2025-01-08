const { PopularMerModel, FeaturedCollectionsModel, MerchantsModel } = require('../models');
const log = require('../utils/utils.logger');

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

