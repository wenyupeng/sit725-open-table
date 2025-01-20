/* eslint-disable no-unused-vars */
const { MenuModel } = require("../models");
const log = require("../utils/utils.logger");
const authenticate = require("../middlewares/jwt");
const apiResponse = require("../utils/utils.apiResponse");
const permissions = require("../middlewares/permissions");

/**
 * get menu by merchantId
 * @returns {Object} menu info
 */
exports.getMenuByMerchantId = async (merchantId) => {
  try {
    let options = {
      merchantId: merchantId,
      isActive: true,
    };

    let menu = await MenuModel.find(options);
    if (!menu) {
      return apiResponse.notFoundResponse("Menu not found");
    }

    let categoryMap = new Map();
    menu.forEach((menuItem) => {
      const categoryName = menuItem.categoryName;
      let subMenu = categoryMap.get(categoryName);
      if (!subMenu) {
        subMenu = [];
        categoryMap.set(categoryName, subMenu);
      }
      subMenu.push(menuItem);
    });

    return categoryMap;
  } catch (err) {
    console.log(err);
    log.err(`popularMerchants error, ${JSON.stringify(err)} `);
    return [];
  }
};

/**
 * add menu
 * @returns {Object}
 */
exports.add = [
  authenticate,
  permissions,
  async (req) => {
    let merchant = req.body;
    let merchantName = merchant.name;
    let phone = merchant.phone;
  },
];

exports.queryPagenation = [authenticate, permissions, async (req, res) => {}];

exports.delete = [authenticate, permissions, async (req, res) => {}];

exports.updateById = [authenticate, permissions, async (req, res) => {}];
