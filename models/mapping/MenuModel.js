const mongoose = require("mongoose");

let types = mongoose.SchemaTypes;

const MenusSchema = new mongoose.Schema(
  {
    merchantId: { type: types.ObjectId, required: true },
    categoryName: { type: types.String, required: true },
    img: { type: types.String, required: true },
    name: { type: types.String, required: true },
    price: { type: types.Number, required: true },
    desc: { type: types.String, required: true },
    star: { type: types.Number, required: true },
    reviews: { type: types.String, required: true },
    isActive: { type: types.Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model("menus", MenusSchema);
