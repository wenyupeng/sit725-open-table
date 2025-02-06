const mongoose = require("mongoose");

let types = mongoose.SchemaTypes;
const ReviewSchema = new mongoose.Schema(
  {
    merchantId: { type: types.ObjectId, required: true },
    menuId: { type: types.ObjectId, required: true },
    userId: { type: types.ObjectId, required: true },
    photos: { type: types.Array, required: true },
    descriptions: { type: types.String, required: true },
    star: { type: types.Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model("Review", ReviewSchema, "reviews");
