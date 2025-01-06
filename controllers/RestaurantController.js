const { PopularRestModel, FeaturedCollectionsModel } = require('../models');
const log = require('../utils/utils.logger');

/**
 * get popular restaurants
 * @returns {Object} popular restaurants
 */
exports.popularResutaurants =
    async () => {
        try {
            return await PopularRestModel.find({});;
        } catch (err) {
            console.log(err);
            log.err(`popularResutaurants error, ${JSON.stringify(err)} `);
            return [];
        }
    }

/**
 * get featured collections
 * @returns {Object} featured collections
 */
exports.featuredColletions =
    async () => {
        try {
            return await FeaturedCollectionsModel.find({}).limit(Number(4));
        } catch (err) {
            console.log(err);
            log.error(`featuredColletions error, ${JSON.stringify(err)}`);
            return [];
        }
    }
