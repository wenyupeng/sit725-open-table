const { MenuModel } = require("../models");
const log = require("../utils/utils.logger");

/**
 * get menu by merchantId
 * @returns {Object} menu info
 */
exports.getMenuByMerchantId = async (merchantId) => {
  try {
    let menu = await MenuModel.findOne({
      merchantId: merchantId.toString(),
    }).exec();
    return menu;
  } catch (err) {
    console.log(err);
    log.err(`popularMerchants error, ${JSON.stringify(err)} `);
    return [];
  }
};
