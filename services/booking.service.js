const { BookingModel } = require("../models");
const moment = require("moment");

const getUpcomingBookingsByMerchantId = async (merchantId) => {
  console.log("merchant Id", merchantId);
  const bookings = (
    await BookingModel.find({
      merchantId,
      bookingDateTime: { $gte: new Date() },
    })
      .populate("userId")
      .sort({ bookingDateTime: 1 })
      .lean()
  ).map((booking) => {
    booking.user = booking.userId;
    booking.userId = booking.user?._id;
    booking.displayedBookingDateTime = moment(booking.bookingDateTime).format(
      "ddd, DD-MM-YYYY HH:mm",
    );
    return booking;
  });
  return bookings;
};

module.exports = {
  getUpcomingBookingsByMerchantId,
};
