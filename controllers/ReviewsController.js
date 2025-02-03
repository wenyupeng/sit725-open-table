const log = require("../utils/utils.logger");
const authenticate = require("../middlewares/jwt");
const apiResponse = require("../utils/utils.apiResponse");
const permissions = require("../middlewares/permissions");
const { ReviewsModel } = require("../models");

exports.getReviews = async (req, res) => {
    let merchantId = req.params.merchantId;
    try {
        let reviews = await ReviewsModel.find({ merchantId: merchantId }).limit(2);
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