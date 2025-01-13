const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  pictureUrl: {type: String, required: true},
  price: {type: Number, required: true}
})

const MerchantSchema = new mongoose.Schema({
    merchantName: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'MerchantCategory'},
    location: {
        lat: {type: Number},
        long: {type: Number},
        address: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true}
    },
    menus: [MenuSchema],
    logoUrl: {type: String}
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model('Merchant',MerchantSchema);
