const log = require("../utils/auth.util");
const authenticate = require("../middlewares/jwt.middleware");
const apiResponse = require("../utils/api-response.util");
const permissions = require("../middlewares/permission.middleware");
const { ReviewModel } = require("../models");
const { ObjectId } = require("mongodb");

const getReviews = async (req, res) => {
  let merchantId = req.params.merchantId;
  try {
    let reviews = await ReviewModel.aggregate([
      { $match: { merchantId: new ObjectId(merchantId) } },
      { $sort: { createdAt: -1 } },
      { $limit: 2 },
      {
        $group: {
          _id: "$userId",
          reviews: { $push: "$$ROOT" },
        },
      },
    ]);

    if (reviews.length === 0) {
      return apiResponse.notFoundResponse(res, "No reviews found");
    }
    return apiResponse.successResponseWithData(res, "Reviews found", reviews);
  } catch (err) {
    log.error(err);
    return apiResponse.ErrorResponse(res, err.message);
  }
};

const addReview = [
  authenticate,
  permissions,
  async (req, res) => {
    let reviews = new ReviewModel(req.body);
    try {
      await reviews.save();
      return apiResponse.successResponse(res, "Review added successfully");
    } catch (err) {
      log.error(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

const updateReview = [
  authenticate,
  permissions,
  async (req, res) => {
    let reviewId = req.params.reviewId;
    try {
      let review = await ReviewModel.findByIdAndUpdate(reviewId, req.body, {
        new: true,
      });
      if (!review) {
        return apiResponse.notFoundResponse(res, "Review not found");
      }
      return apiResponse.successResponse(res, "Review updated successfully");
    } catch (err) {
      log.error(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

const deleteReview = [
  authenticate,
  permissions,
  async (req, res) => {
    let merchantId = req.params.merchantId;
    try {
      await ReviewModel.deleteMany({ merchantId: merchantId });
      return apiResponse.successResponse(res, "Review deleted successfully");
    } catch (err) {
      log.error(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

module.exports = {
  getReviews,
  addReview,
  updateReview,
  deleteReview,
};
