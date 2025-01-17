const { BookingModel } = require("../models");

const getBookingsByMerchantId = async (merchantId) => {
  const bookings = await BookingModel.find({ merchantId })
    .sort({ updatedAt: -1 })
    .lean();
  return bookings;
};

module.exports = {
  getBookingsByMerchantId,
};
