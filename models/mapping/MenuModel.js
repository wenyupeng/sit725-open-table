const mongoose = require('mongoose');

let types = mongoose.SchemaTypes;
const MenuSchema = new mongoose.Schema({
    id: {type: types.String, required: true},
    backgroundImg: {type: types.String, required: true},
    name: {type: types.String, required: true},
    type: {type: types.String, required: true},
    location: {type: types.String, required: true},
    contactPhone: {type: types.String, required: true},
    Hours: {type: types.String, required: true},
    photoGallery: {type: types.Array,required: true},
    openHours: {type: types.Array,required: true},
    
    descriptions: {type: types.String, required: true},
    star: {type: types.Number, required: true},
    reviews: {type: types.Number, required: true, default: 5},
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model('menu', MenuSchema);