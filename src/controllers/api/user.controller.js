const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const { UserModel } = require("../../models");
const authenticate = require("../../middlewares/jwt");
const apiResponse = require("../../utils/utils.apiResponse");
const permissions = require("../../middlewares/permissions");

/**
 * user list
 */
exports.userlist = [
  authenticate,
  permissions,
  async (req, res) => {
    // console.log(req.auth)
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array(),
        );

      let query = {
        current: 1,
        pageSize: 20,
        params: {},
      };
      let result = await UserModel.find(query.params)
        .skip((Number(query.current) - 1) * Number(query.pageSize))
        .limit(Number(query.pageSize));
      let total = await UserModel.find({}).count();
      return apiResponse.successResponseWithData(
        res,
        "Success.",
        result.length > 0
          ? {
              result,
              current: 1,
              pageSize: 20,
              total,
            }
          : { result: [], total },
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/**
 * user delete
 */
exports.userDelete = [
  authenticate,
  permissions,
  async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.body.id))
      return apiResponse.validationErrorWithData(
        res,
        "Invalid Error.",
        "the input id is not exist",
      );

    try {
      UserModel.findByIdAndDelete(req.body.id).then((user) => {
        if (!user) {
          return apiResponse.notFoundResponse(
            res,
            "user does not exist or have been deleted",
          );
        }
        apiResponse.successResponse(res, `user ${req.body.id} has been delete`);
      });
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
