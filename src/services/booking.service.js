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

//Validate Timeslot and Booking Availability
const validateTimeslot = (merchant, datepicker, time) => {
  const selectedDay = new Date(datepicker).toLocaleString("en-us", {
    weekday: "long",
  });

  // Find the open hour for the selected day
  const openHourDay = merchant.openHours.find(
    (hour) => hour.day === selectedDay,
  );

  if (!openHourDay) {
    console.log(`No available slots for ${selectedDay}.`);
    return null;
  }

  // Find the matching time slot
  const foundTime = openHourDay.time
    .split(", ")
    .find((ptime) => ptime === time.trim());

  if (foundTime) {
    console.log(
      `Time slot ${foundTime} is available. Total ${openHourDay.availableSlots} seats.`,
    );
    return openHourDay.availableSlots;
  } else {
    console.log(`Time ${time} is not available.`);
    return null;
  }
};

module.exports = {
  getUpcomingBookingsByMerchantId,
  validateTimeslot,
};
