const mongoose = require('mongoose');

let types = mongoose.SchemaTypes;
const RestaurantsSchema = new mongoose.Schema({
    _id: {type: types.String, required: false},
    merchantId: {type: types.String, required: true},
    backgroundImg: {type: types.String, required: true},
    name: {type: types.String, required: true},
    type: {type: types.String, required: true},
    description: {type: types.String, required: true},
    location: {type: types.String, required: true},
    contactPhone: {type: types.String, required: true},
    hours: {type: types.String, required: true},
    photoGallery: {type: types.Array,required: true},
    openHours: {type: types.Array,required: true},
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model('restaurants', RestaurantsSchema);