const express = require('express');
const router = express.Router();
const { getMerchantByMerchantId } = require('../controllers/MerchantController');



router.get('/', async function (req, res) {
    let merchantId =req.query.merchantId;
    let merchant = await getMerchantByMerchantId(merchantId);
    
    res.render('./merchant/merchant', {
        merchant: merchant
    });
});

module.exports = router;