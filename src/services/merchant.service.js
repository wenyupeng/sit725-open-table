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

/**
 * get merchant list
 * @returns {Object} merchant list
 */
const queryPaginationForPage = async (req) => {
  let pageNo = req.query.pageNo || 1;
  let pageSize = req.query.pageSize || 6;
  let query = req.query.query || "";
  let sort = req.query.sort || "createdAt";
  let order = req.query.order || "desc";

  let skip = (pageNo - 1) * pageSize;
  let limit = pageSize;

  let queryObj = {};
  if (query) {
    queryObj = {
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { address: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
      isDeleted: { $ne: true },
    };
  }

  let sortObj = {};
  if (sort) {
    sortObj = { [sort]: order };
  }
  let result = {};

  try {
    let merchants = await MerchantsModel.find(queryObj)
      .sort(sortObj)
      .skip(skip)
      .limit(limit);
    let totalCount = await MerchantsModel.countDocuments(queryObj);
    result = {
      merchants: merchants,
      totalCount: totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      pageNo: pageNo,
      pageSize: pageSize,
    };

    return result;
  } catch (err) {
    console.log(err);
    log.error(`queryPagination error, ${JSON.stringify(err)}`);
    return result;
  }
};

module.exports = {
  popularMerchants,
  featuredColletions,
  getMerchantByMerchantId,
  topMerchants,
  queryPaginationForPage
};
