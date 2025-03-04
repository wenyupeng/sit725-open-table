const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const { UserModel } = require("../models");
const authenticate = require("../middlewares/jwt");
const apiResponse = require("../utils/utils.apiResponse");
const permissions = require("../middlewares/permissions");
const nodemailer = require("nodemailer");

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

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return apiResponse.notFoundResponse(res, "User with this email does not exist.");
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = Date.now() + 3600000; // Token valid for 1 hour
    await user.save();
    const resetURL = `${req.protocol}://${req.get("host")}/reset-password/${resetToken}`;
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password
      },
    });

    const mailOptions = {
      from: "no-reply@yourapp.com",
      to: user.email,
      subject: "Password Reset Request",
      text: `Click the link to reset your password: ${resetURL}`,
    };

    await transporter.sendMail(mailOptions);

    return apiResponse.successResponse(res, "Password reset email sent.");
  } catch (err) {
    console.error(err);
    return apiResponse.ErrorResponse(res, "An error occurred while processing your request.");
  }
};

exports.checkStatus = [
  authenticate, permissions,
  async (req, res) => {
    if (!req.session.user) {
      return apiResponse.unauthorizedResponse(res, "User not logged in.");
    } else {
      return apiResponse.successResponse(res, "User is logged in.");
    }
  }];