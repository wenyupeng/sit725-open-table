const { FeaturedCollectionsModel, MerchantsModel } = require("../models");

const log = require("../utils/logger.util");

/**
 * get featured collections
 * @returns {Object} featured collections
 */
const getFeaturedColletions = async () => {
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
const getMerchantByMerchantId = async (merchantId) => {
  try {
    return await MerchantsModel.findById(merchantId);
  } catch (err) {
    console.log(err);
    log.error(`featuredColletions error, ${JSON.stringify(err)}`);
    return {};
  }
};

/**
 * get featured collections
 * @returns {Object} featured collections
 */
const getFeaturedMerchants = async () => {
  try {
    return await MerchantsModel.find({}).limit(Number(4));
  } catch (err) {
    console.log(err);
    log.error(`featuredMerchants error, ${JSON.stringify(err)}`);
    return [];
  }
};

/**
 * get popular merchants sorted by name
 * @returns {Object} popular merchants
 */
const getPopularMerchants = async () => {
  try {
    return await MerchantsModel.find({}).sort({ name: -1 });
  } catch (err) {
    console.log(err);
    log.error(`featuredMerchants error, ${JSON.stringify(err)}`);
    return [];
  }
};

module.exports = {
  getFeaturedColletions,
  getMerchantByMerchantId,
  getFeaturedMerchants,
  getPopularMerchants,
};
