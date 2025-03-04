const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models");
const apiResponse = require("../utils/utils.apiResponse");
const { encryption, decryption } = require("../utils/utils.others");
const log = require("../utils/utils.logger");

/**
 * User register
 * @param {string}  username full name of user
 * @param {string}  email  email
 * @param {string}  phone  phone
 * @param {string}  password password
 * @returns {Object} common response
 */
exports.register = [
  [
    body("username")
      .isLength({ min: 3 })
      .trim()
      .withMessage("username could not be empty or less than 3 character"),
    body("email")
      .isLength({ min: 1 })
      .trim()
      .withMessage("email could not be empty")
      .isEmail()
      .normalizeEmail()
      .withMessage("email format is wrong")
      .custom((value) => {
        return UserModel.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject(
              `email ${user.email} has been used, please use another email`,
            );
          }
        });
      }),
    body("phone")
      .isLength({ min: 6 })
      .trim()
      .withMessage("password could not be empty or less than 6 character")
      .custom((value) => {
        return UserModel.findOne({ phone: value }).then((user) => {
          if (user) {
            return Promise.reject(
              `phone number ${user.phone} has been used, please use another phone number`,
            );
          }
        });
      }),
    body("password")
      .isLength({ min: 6 })
      .trim()
      .withMessage("password could not be empty or less than 6 character"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // console.log(errors);
        return apiResponse.validationErrorWithData(res, errors.array()[0].msg);
      } else {
        let encryptPwd = await encryption(req.body.password);
        let newUser = {
          username: req.body.username,
          email: req.body.email,
          phone: req.body.phone,
          password: encryptPwd,
          role: "user",
          status: 1,
        };

        const addInfo = await UserModel.collection.insertOne(newUser);
        if (addInfo) {
          return apiResponse.successResponse(res, "registry successfully");
        } else {
          return apiResponse.validationErrorWithData(
            res,
            "registry fail, data save fail",
          );
        }
      }
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/**
 * user login
 * @param {string}  username username, email or phone
 * @param {string}  password password
 * @returns {Object} common response
 */
exports.login = [
  [
    body("username")
      .isLength({ min: 3 })
      .trim()
      .withMessage("username could not be empty or less than 3 character"),
    body("password")
      .isLength({ min: 6 })
      .trim()
      .withMessage("password could not be empty or less than 6 character"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(res, errors.array()[0].msg);
      } else {
        let inputUsername = req.body.username;
        let query = {
          $or: [
            { username: inputUsername },
            { email: inputUsername },
            { phone: inputUsername },
          ],
        };
        const userInfo = await UserModel.findOne(query).populate("merchant");
        if (!userInfo)
          return apiResponse.unauthorizedResponse(
            res,
            "1: username or password is wrong",
          );

        let isPass = await decryption(req.body.password, userInfo.password);
        if (!isPass)
          return apiResponse.unauthorizedResponse(
            res,
            "2: username or password is wrong",
          );

        let userData = {
          _id: userInfo._id,
          username: userInfo.username,
          email: userInfo.email,
          phone: userInfo.phone,
          role: userInfo.role,
          merchant: userInfo.merchant,
        };
        userData.token =
          "Bearer " +
          jwt.sign(userData, process.env.SIGN_KEY, { expiresIn: 3600 * 2 });

        log.info(`user ${userInfo.username} login successfully`);

        // Store user data in session
        req.session.user = userData;

        return apiResponse.successResponseWithData(
          res,
          "login successfully",
          userData,
        );
      }
    } catch (err) {
      console.log(err);
      log.error(`login fail, ${req.body.username} ${JSON.stringify(err)}`);
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
