const { MenuModel } = require('../models');
const log = require('../utils/utils.logger');
const authenticate = require('../middlewares/jwt');
const apiResponse = require('../utils/utils.apiResponse');
const permissions = require('../middlewares/permissions');

/**
 * get menu by merchantId
 * @returns {Object} menu info
 */
exports.getMenuByMerchantId =
    async (merchantId) => {
        try {
            let menu = await MenuModel.findOne({ merchantId: merchantId.toString() }).exec();
            return menu;
        } catch (err) {
            console.log(err);
            log.err(`popularMerchants error, ${JSON.stringify(err)} `);
            return [];
        }
    }

/**
 * add menu
 * @returns {Object} 
 */
exports.add = [
    authenticate,
    permissions,
    async (req, res) => {
        let merchant = req.body;
        let merchantName = merchant.name;
        let phone = merchant.phone;
    }
]

exports.queryPagenation = [
    authenticate,
    permissions,
    async (req, res) => {

    }
]

exports.delete =[
    authenticate,
    permissions,
    async (req, res) => {

    }
]

exports.updateById= [
    authenticate,
    permissions,
    async (req, res) => {

    }
]