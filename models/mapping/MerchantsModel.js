const mongoose = require("mongoose");

let types = mongoose.SchemaTypes;
const MerchantsSchema = new mongoose.Schema(
  {
    backgroundImg: { type: types.String, required: true },
    name: { type: types.String, required: true },
    category: { type: types.String, required: true },
    type: { type: types.String, required: true },
    description: { type: types.String, required: true },
    location: { type: types.String, required: true },
    openHours: { type: types.Array, required: true },
    slots: {type: types.Number, default: 2, required: true},
    contactPhone: { type: types.String, required: true },
    hours: { type: types.String, required: true },
    photoGallery: { type: types.Array, required: true },
    password: { type: types.String, required: true },
    isDeleted: { type: types.Boolean, required: true, default: false },
    star: { type: types.Number },
    reviews: { type: types.Number, default: 5 },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model("merchants", MerchantsSchema);
