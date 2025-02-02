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
    // @TODO: location schema for later
    // location: {
    //   address: { type: types.String, required: true },
    //   suburb: { type: types.String, required: true },
    //   state: { type: types.String, required: true },
    //   postCode: { type: types.Number, required: true },
    //   lat: { type: types.Number },
    //   long: { type: types.Number },
    // }, 
    openHours: [
      {
        day: {
          type: String,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ], // Days of the week
          required: true
        },
        slots: [
          { time: { type: String, required: true, match: /^([01]\d|2[0-3]):([0-5]\d)$/ } }, // 24-hour format (e.g., 09:00)
          { availableSlots: { type: String, required: true, min: 0 } }
        ]
      }
    ],
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
