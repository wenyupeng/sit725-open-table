const mongoose = require("mongoose");

let types = mongoose.SchemaTypes;
const PopularMerchantsSchema = new mongoose.Schema(
  {
    merchantId: { type: types.String, required: true },
    img: { type: types.String, required: true },
    name: { type: types.String, required: true },
    descriptions: { type: types.String, required: true },
    star: { type: types.Number, required: true },
    reviews: { type: types.Number, required: true, default: 5 },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model("popular-merchants", PopularMerchantsSchema);
