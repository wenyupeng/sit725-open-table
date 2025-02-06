const {
  PopularMerchantModel,
  FeaturedCollectionModel,
  MerchantsModel,
} = require("../models");
const log = require("../utils/logger.util");

/**
 * get popular merchants
 * @returns {Object} popular merchants
 */
const popularMerchants = async () => {
  try {
    return PopularMerchantModel.find({}).sort({ name: -1 }).lean();
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
const featuredColletions = async () => {
  try {
    return FeaturedCollectionModel.find({}).limit(Number(4)).lean();
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
    return MerchantsModel.findById(merchantId);
  } catch (err) {
    console.log(err);
    log.error(`featuredColletions error, ${JSON.stringify(err)}`);
    return {};
  }
};

/**
 * get top 6 Merchants
 * @returns {Object} top six merchants
 */
const topMerchants = async (searchQuery) => {
  try {
    const filter = searchQuery
      ? {
          $or: [
            { name: { $regex: searchQuery, $options: "i" } },
            { location: { $regex: searchQuery, $options: "i" } },
          ],
        }
      : {};
    return MerchantsModel.find(filter).limit(6).sort({ _id: -1 });
  } catch (err) {
    console.log(err);
    log.error(`featuredMerchants error, ${JSON.stringify(err)}`);
    return [];
  }
};

module.exports = {
  popularMerchants,
  featuredColletions,
  getMerchantByMerchantId,
  topMerchants,
};
