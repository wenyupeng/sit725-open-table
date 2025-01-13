const mongoose = require("mongoose");

const merchantCategory = new mongoose.Schema(
  {
    categoryName: { type: String, required: true },
    iconUrl: { type: String },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("MerchantCategory", merchantCategory);
