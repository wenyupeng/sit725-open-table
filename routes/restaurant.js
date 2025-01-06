const express = require('express');
const router = express.Router();
const { getRestaurantByRestaurantId } = require('../controllers/RestaurantController');



router.get('/', async function (req, res) {
    let restaurantId =req.query.restaurantId;
    let restaurant = await getRestaurantByRestaurantId(restaurantId);
    
    res.render('./restaurant/restaurant', {
        restaurant: restaurant
    });
});

module.exports = router;