const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models");
const User = require("../models/mapping/UserAumModel");
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
      .custom((value, { req }) => {
        return UserModel.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject(
              `email ${user.email} has been used, please use another email`
            );
          }
        });
      }),
    body("phone")
      .isLength({ min: 6 })
      .trim()
      .withMessage("password could not be empty or less than 6 character")
      .custom((value, { req }) => {
        return UserModel.findOne({ phone: value }).then((user) => {
          if (user) {
            return Promise.reject(
              `phone number ${user.phone} has been used, please use another phone number`
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
      console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // console.log(errors);
        return apiResponse.validationErrorWithData(
          res.status(400).render("./auth/register", {
            pageTitle: "Register",
            message: "Invalid Input.",
          }),
          errors.array()[0].msg
        );
      } else {
        let encryptPwd = await encryption(req.body.password);
        let newUser = {
          username: req.body.username,
          email: req.body.email,
          phone: req.body.phone,
          password: encryptPwd,
          role: "user",
          status: 1,
          isActive: true,
          dateCreated: new Date(),
          dateModified: new Date(),
        };

        const addInfo = await UserModel.create(newUser);
        if (addInfo) {
          return apiResponse.successResponse(
            res.redirect("/"),
            "registry successfully"
          );
        }
      }
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(
        res.status(500).render("./auth/register", {
          pageTitle: "Register",
          message: "Error registering user",
          error: error.message,
        }),
        err
      );
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
    body("email")
      .isLength({ min: 3 })
      .trim()
      .withMessage("email could not be empty or less than 3 character"),
    body("password")
      .isLength({ min: 6 })
      .trim()
      .withMessage("password could not be empty or less than 6 character"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res.render("./auth/login", {
            pageTitle: "Login",
            message: errors.array()[0].msg,
          }),
          errors.array()[0].msg
        );
      } else {
        // let inputUsername = req.body.email;

        // let query = {
        //     $or: [
        //         { username: inputUsername },
        //         { email: inputUsername },
        //         { phone: inputUsername }
        //     ]
        // };
        //const userInfo = await UserModel.findOne(query);
        console.log("inputUsername", req.body.email); //changed to email
        const userInfo = await User.login(req.body.email, req.body.password);
        console.log("userInfo", userInfo);

        if (!userInfo) {
          
          return apiResponse.unauthorizedResponse(
            res,
            "1: username or password is wrong"
          );
        } else {
          // let isPass = await decryption(req.body.password, userInfo.password);
          // if (!isPass)
          //   return apiResponse.unauthorizedResponse(
          //    res, "2: username or password is wrong"
          //   );

          const userData = {
            _id: userInfo._id,
            username: userInfo.username,
            email: userInfo.email,
            phone: userInfo.phone,
            role: userInfo.role,
          };
          userData.token =
            "Bearer " +
            jwt.sign(userData, process.env.SIGN_KEY, { expiresIn: 3600 * 2 });

          log.info(`user ${userInfo.username} login successfully`);

          req.session.userId = userInfo._id; // Store user ID in session
          req.session.username = userInfo.username;

          res.status(200).redirect("/api/restaurants/restaurants");
          //   return apiResponse.successResponseWithData(
          //     "login successfully",
          //     userData
          //   );
        }
      }
    } catch (err) {     
      log.error(`login fail, ${req.body.username} ${JSON.stringify(err)}`);
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/**
 * Render User register
 */
exports.renderRegister = [
  (req, res) => {
    res.render("./auth/register", { pageTitle: "Register", message: null });
  },
];

/**
 * Render User login
 */
exports.renderLogin = [
  (req, res) => {
    res.render("./auth/login", { pageTitle: "Login", message: null });
  },
];

/**
 * Handle User Logout
 */
exports.logout = [
  async (req, res) => {
    req.session.destroy(() => {
      res.redirect("/api/auth/login");
    });
  },
];
