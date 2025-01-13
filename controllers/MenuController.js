const { MenuModel } = require('../models');
const log = require('../utils/utils.logger');

/**
 * get popular merchants
 * @returns {Object} popular merchants
 */
exports.getMenuByMerchantId =
    async () => {
        try {
            return await MenuModel.find({});;
        } catch (err) {
            console.log(err);
            log.err(`popularMerchants error, ${JSON.stringify(err)} `);
            return [];
        }
    }

