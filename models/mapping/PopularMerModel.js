const mongoose = require("mongoose");

let types = mongoose.SchemaTypes;
const PopularMerchantsSchema = new mongoose.Schema(
  {
    backgroundImg: { type: types.String, required: true },
    name: { type: types.String, required: true },
    description: { type: types.String, required: true },
    star: { type: types.Number, required: true },
    reviews: { type: types.Number, required: true, default: 5 },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model("popular-merchants", PopularMerchantsSchema);
