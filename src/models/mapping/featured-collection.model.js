const mongoose = require("mongoose");

let types = mongoose.SchemaTypes;
const FeaturedCollectionSchema = new mongoose.Schema(
  {
    backgroundImg: { type: types.String, required: true },
    type: { type: types.String, required: true },
    description: { type: types.String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model(
  "FeaturedCollection",
  FeaturedCollectionSchema,
  "featured-collections",
);
