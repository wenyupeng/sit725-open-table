const express = require('express');
const router = express.Router();
const { getMerchantByMerchantId } = require('../controllers/MerchantController');
const { getMenuByMerchantId } = require('../controllers/MenuController');

router.get('/register',async function (req,res) {
    res.render('./merchant/register',{
        
    })
})

router.get('/login',async function (req,res) {
    res.render('./merchant/login',{

    })
})

router.get('/:merchantId', async function (req, res) {
    let merchantId = req.params.merchantId;
    let merchant = await getMerchantByMerchantId(merchantId);

    res.render('./merchant/merchant', {
        merchant: merchant
    });
});


router.get('/:merchantId/menu', async function (req, res) {
    let merchantId = req.params.merchantId;
    let menu = await getMenuByMerchantId(merchantId);

    res.render('./menu/menu', {
        menu: menu
    });
});

module.exports = router;