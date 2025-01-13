const mongoose = require('mongoose');

let types = mongoose.SchemaTypes;
const FoodSchema = new mongoose.Schema({
    foodId: { type: types.String, required: true },
    img: { type: types.String, required: true },
    name: { type: types.String, required: true },
    price: { type: types.Number, required: true },
    desc: { type: types.String, required: true },
    star: { type: types.Number, required: true },
    reviews: { type: types.String, required: true },
});

const CategorySchema = new mongoose.Schema({
    categoryName: { type: types.String, required: true },
    items: [FoodSchema],
});


const MenusSchema = new mongoose.Schema({
    merchantId: { type: types.String, required: true },
    list: [CategorySchema],
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model('menus', MenusSchema);