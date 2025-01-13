const express = require('express');
const router = express.Router();
const { getMenuByMerchantId } = require('../controllers/MenuController');

let menu = {
    list: [
        ['Appetizers', [
            {
                foodId: 1,
                img: "https://ai-public.mastergo.com/ai/img_res/02a7539e09dbbe5d1e55be92037d3310.jpg",
                name: "Grilled Atlantic Salmon",
                price: 28.99,
                desc: "Fresh Atlantic salmon fillet grilled to perfection, served with seasonal vegetables and lemon butter sauce.",
                star: 4.5,
                reviews: 128
            },
            {
                foodId: 2,
                img: "https://ai-public.mastergo.com/ai/img_res/a38c1ff75b852cb3dc0d28d822dcb978.jpg",
                name: "Beef Tenderloin",
                price: 34.99,
                desc: "Premium cut tenderloin steak cooked to your preference, served with truffle mashed potatoes and red wine reduction.",
                star: 5.0,
                reviews: 156
            }
        ]],
        ['Main Courses', [{
            foodId: 1,
            img: "https://ai-public.mastergo.com/ai/img_res/02a7539e09dbbe5d1e55be92037d3310.jpg",
            name: "Grilled Atlantic Salmon",
            price: 28.99,
            desc: "Fresh Atlantic salmon fillet grilled to perfection, served with seasonal vegetables and lemon butter sauce.",
            star: 4.5,
            reviews: 128
        }]],
        ['Seafood',[{
            foodId: 1,
            img: "https://ai-public.mastergo.com/ai/img_res/02a7539e09dbbe5d1e55be92037d3310.jpg",
            name: "Grilled Atlantic Salmon",
            price: 28.99,
            desc: "Fresh Atlantic salmon fillet grilled to perfection, served with seasonal vegetables and lemon butter sauce.",
            star: 4.5,
            reviews: 128
        }]],
        ['Desserts', [{
            foodId: 2,
            img: "https://ai-public.mastergo.com/ai/img_res/a38c1ff75b852cb3dc0d28d822dcb978.jpg",
            name: "Beef Tenderloin",
            price: 34.99,
            desc: "Premium cut tenderloin steak cooked to your preference, served with truffle mashed potatoes and red wine reduction.",
            star: 5.0,
            reviews: 128
        }]],
        ['Beverages', [{
            foodId: 1,
            img: "https://ai-public.mastergo.com/ai/img_res/a38c1ff75b852cb3dc0d28d822dcb978.jpg",
            name: "Beef Tenderloin",
            price: 34.99,
            desc: "Premium cut tenderloin steak cooked to your preference, served with truffle mashed potatoes and red wine reduction.",
            star: 5.0,
            reviews: 128
        }]]
    ]
}

router.get('/', async function (req, res) {
    let merchantId = req.query.merchantId;
    // let menu = await getMenuByMerchantId(merchantId);

    res.render('./menu/menu', {
        menu: menu
    });
});

module.exports = router;