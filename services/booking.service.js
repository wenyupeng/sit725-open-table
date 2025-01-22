const { BookingModel } = require("../models");

const getUpcomingBookingsByMerchantId = async (merchantId) => {
    const bookings = await BookingModel
        .find({ merchant: merchantId, bookingDateTime: { $gte: new Date() } })
        .sort({ bookingDateTime: 1 })
        .lean();
    return bookings;
}

module.exports = {
    getUpcomingBookingsByMerchantId
}