const express = require('express');
const router = express.Router();
const { popularResutaurants, featuredColletions } = require('../controllers/RestaurantController');



router.get('/', async function (req, res) {
    let popular_rest = await popularResutaurants();
    let featured_col = await featuredColletions();
    console.log(featured_col)

    res.render('./home/home', {
        popular_rest: popular_rest,
        featured_col: featured_col
    });
});

module.exports = router;