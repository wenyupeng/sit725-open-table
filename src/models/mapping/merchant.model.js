const mongoose = require("mongoose");

let types = mongoose.SchemaTypes;

const locationSchema = new mongoose.Schema({
  address: { type: types.String, required: true },
  suburb: { type: types.String, required: true },
  state: { type: types.String, required: true },
  postCode: { type: types.Number, required: true },
  lat: { type: types.Number },
  long: { type: types.Number },
});

const OpenHourSchema = new mongoose.Schema({
  day: {
    type: types.String, // Day of the week
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
  },
  time: { type: types.String, required: true },
  availableSlots: { type: types.Number, required: true, min: 0 },
});

const MerchantsSchema = new mongoose.Schema(
  {
    backgroundImg: { type: types.String, required: true },
    name: { type: types.String, required: true },
    category: { type: types.String, required: true },
    type: { type: types.String, required: true },
    description: { type: types.String, required: true },

    location: [locationSchema], // Contact address required for map API
    openHours: [OpenHourSchema], // Opening hours with timeslots,

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

module.exports = mongoose.model("Merchant", MerchantsSchema, "merchants");
