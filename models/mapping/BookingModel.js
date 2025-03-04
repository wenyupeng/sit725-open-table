const mongoose = require("mongoose");

let types = mongoose.SchemaTypes;
const BookingSchema = new mongoose.Schema(
  {
    userId: {
      type: types.ObjectId,
      ref: "users",
      required: true,
    },
    merchantId: {
      type: types.ObjectId,
      ref: "merchants",
      required: true,
    },
    menuItems: [
      {
        menuItemId: { type: types.ObjectId, ref: "Menu" },
        name: types.String,
        img: types.String,
        quantity: types.Number,
        price: types.Number,
      },
    ],
    subTotal: { type: types.Number },
    totalPriceWithGST: { type: types.Number },
    bookingDate: { type: types.Date, required: true },
    bookingTime: { type: types.String, required: true },
    bookingDateTime: { type: types.Date, required: true },
    numberOfGuests: { type: types.Number, required: true },
    specialRequest: { type: types.String },
    isActive: { type: types.Boolean, default: true },
    merchantName: { type: types.String },
    status: { type: String, enum: ["Pending", "Confirmed", "Cancelled"], default: "Pending" },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model("booking", BookingSchema);
