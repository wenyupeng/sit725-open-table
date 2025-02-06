const { MenuModel } = require("../models");
const log = require("../utils/auth.util");
const apiResponse = require("../utils/api-response.util");

const getMenuByMerchantId = async (merchantId) => {
  try {
    let options = {
      merchantId: merchantId,
      isActive: true,
    };

    let menu = await MenuModel.find(options);
    if (!menu) {
      return apiResponse.notFoundResponse("Menu not found");
    }

    let categoryMap = {};
    menu.forEach((menuItem) => {
      const categoryName = menuItem.categoryName;
      let subMenu = categoryMap[categoryName];
      if (!subMenu) {
        subMenu = [];
        categoryMap[categoryName] = subMenu;
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

module.exports = {
  getMenuByMerchantId,
};
