const log = require("../utils/utils.logger");
const authenticate = require("../middlewares/jwt");
const apiResponse = require("../utils/utils.apiResponse");
const permissions = require("../middlewares/permissions");
const { ReviewsModel } = require("../models");
const { ObjectId } = require("mongodb");

exports.getReviews = async (req, res) => {
    let merchantId = req.params.merchantId;
    try {
        let reviews = await ReviewsModel.aggregate([
            { $match: { merchantId: new ObjectId(merchantId) } },
            { $sort: { createdAt: -1 } },
            { $limit: 2 },
            {$group: {
                _id: "$userId",
                reviews: { $push: "$$ROOT" }
            }}
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

exports.addReview = [
    authenticate,
    permissions,
    async (req, res) => {
        let reviews = new ReviewsModel(req.body);
        try {
            await reviews.save();
            return apiResponse.successResponse(res, "Review added successfully");
        } catch (err) {
            log.error(err);
            return apiResponse.ErrorResponse(res, err.message);
        }
    }];

exports.updateReview = [
    authenticate,
    permissions,
    async (req, res) => {
        let reviewId = req.params.reviewId;
        try {
            let review = await ReviewsModel.findByIdAndUpdate(
                reviewId,
                req.body,
                { new: true }
            );
            if (!review) {
                return apiResponse.notFoundResponse(res, "Review not found");
            }
            return apiResponse.successResponse(res, "Review updated successfully");
        } catch (err) {
            log.error(err);
            return apiResponse.ErrorResponse(res, err.message);
        }
    }];

exports.deleteReview = [
    authenticate,
    permissions,
    async (req, res) => {
        let merchantId = req.params.merchantId;
        try {
            await ReviewsModel.deleteMany({ merchantId: merchantId });
            return apiResponse.successResponse(res, "Review deleted successfully");
        } catch (err) {
            log.error(err);
            return apiResponse.ErrorResponse(res, err.message);
        }
    }];