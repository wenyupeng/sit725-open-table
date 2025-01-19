const express = require('express');
const router = express.Router();
const { popularMerchants, featuredColletions, topMerchants } = require('../controllers/MerchantController');



router.get('/', async function (req, res) {
    let popular_mer = await popularMerchants();
    let featured_col = await featuredColletions();
    let top_six_mer = await topMerchants();

    res.render('./home/home', {
        popular_mer: popular_mer,
        featured_col: featured_col,
        top_six_mer: top_six_mer
    });
});



module.exports = router;