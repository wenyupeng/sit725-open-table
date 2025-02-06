const { ObjectId } = require("mongodb");
const moment = require("moment");
const { MerchantsModel, MenuModel, BookingModel } = require("../models");
const apiResponse = require("../utils/api-response.util");
const log = require("../utils/auth.util");
const SocketIOService = require("../services/socket.service");
const { validateTimeslot } = require("../services/booking.service");

const {
  getUpcomingBookingsByMerchantId,
} = require("../services/booking.service");

/**
 * [Features][Booking] Handle Create Booking
 *
 * @param {ObjectId}  userId  userId
 * @param {ObjectId}  merchantId  merchantId
 * @param {String}  merchantName  merchantName
 * @param {Date}  bookingDate bookingDate
 * @param {String}  bookingTime bookingTime
 * @param {String}  specialRequest specialRequest
 * @param {Array}   menuItems menuItems
 * @param {Int32}   numberOfGuests numberOfGuests
 * @param {Int32}   subTotal subTotal
 * @param {Boolean} isActive  isActive
 * @param {Int32}   totalPriceWithGST totalPriceWithGST
 * @returns {Object} common response
 */
const handleCreateBooking = [
  async (req, res) => {
    try {
      const { merchantId } = req.params;
      const merchant = await MerchantsModel.findById(merchantId);

      if (!merchant) {
        return apiResponse.notFoundResponse(res, "Merchant not found");
      } else {
        let slots = merchant.slots;
        if (parseInt(slots) < 1) {
          return apiResponse.notFoundResponse(res, "No slots available");
        }

        const menus = await MenuModel.find({
          merchantId: { $eq: merchantId },
          isActive: { $eq: true },
        });

        if (!menus) {
          return apiResponse.notFoundResponse(res, "No Menuitems Found");
        }

        const { datepicker, time, menuItems, guests } = req.body;

        // Validate inputs
        if (!datepicker || !time || !guests) {
          return apiResponse.validationErrorWithData(
            res,
            "All fields are required.",
          );
        }

        const bookingAvailability = validateTimeslot(
          merchant,
          datepicker,
          time,
        );
        console.log("bookingAvailability:", bookingAvailability);

        // Get total number of guests already booked for this timeslot
        const existingBookings = await BookingModel.find({
          merchantId,
          bookingDate: datepicker,
          isActive: true,
          bookingTime: time.trim(),
        });

        console.log("existingBookings", existingBookings);

        const totalGuests = existingBookings.reduce(
          (sum, booking) => sum + booking.numberOfGuests,
          0,
        );

        console.log("totalGuests:", totalGuests);

        console.log(
          "totalGuests + parseInt(req.body.guests):",
          totalGuests + parseInt(req.body.guests),
        );

        console.log("result:", parseInt(bookingAvailability));

        // Check if adding the new booking would exceed available slots
        if (
          totalGuests + parseInt(req.body.guests) >
          parseInt(bookingAvailability)
        ) {
          console.log(
            `Booking exceeds available slots. Only ${bookingAvailability - totalGuests} seats left.`,
          );
          return apiResponse.ErrorResponse(
            res,
            `Booking exceeds available slots. Only ${bookingAvailability - totalGuests} seats left.`,
          );
        }

        const parsedMenuItems = JSON.parse(menuItems);

        const subTotal = parsedMenuItems.reduce(
          (sum, item) => sum + item.quantity * item.price,
          0,
        );

        const bookingDateTime = moment(
          `${moment(req.body.datepicker).format("YYYY-MM-DD")} ${req.body.time}`,
          "YYYY-MM-DD HH:mm A",
        );

        console.log("create new booking");
        const booking = new BookingModel({
          userId: new ObjectId(req.session.user._id),
          merchantId: new ObjectId(merchantId),
          menuItems: parsedMenuItems,
          subTotal: subTotal,
          totalPriceWithGST: subTotal * 1.1,
          bookingDate: req.body.datepicker,
          bookingTime: req.body.time.trim(),
          bookingDateTime: bookingDateTime,
          specialRequest: req.body.specialRequest.replace(/[<>]/g, ""),
          numberOfGuests: parseInt(req.body.guests, 10),
          merchantName: merchant.name,
        });

        await booking.save();

        SocketIOService.sendMessage(
          `merchant-${merchantId}`,
          "new-booking",
          booking.toJSON(),
        );

        res.redirect(`/api/booking/${booking.userId}/bookings`);
        // return apiResponse.successResponseWithData(
        //   res, "Booking created successfully",
        //   res.redirect(`/api/booking/${booking.userId}/bookings`)
        // );
        // return apiResponse.successResponseWithData(res, "Booking created successfully", booking);
      }
    } catch (err) {
      console.log(err);
      log.error(`Add Booking error, ${err.message}`);
      return apiResponse.ErrorResponse(
        res,
        "Error creating booking" + err.message,
      );
    }
  },
];

/**
 * [Features][Booking] Render Create Booking
 *
 * */
const renderCreateBooking = async (req, res) => {
  const { merchantId } = req.params;
  const user = req.session.user;
  const merchant = await MerchantsModel.findById(merchantId);
  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];
  const menus = await MenuModel.find({
    merchantId: { $eq: merchantId },
    isActive: { $eq: true },
  });

  res.render("./booking/booking", {
    pageTitle: `Book ${merchant.name}`,
    merchant: merchant,
    menus: menus,
    user: user,
    timeSlots: timeSlots,
    guestOptions: Array.from({ length: 10 }, (_, i) => i + 1),
  });
};

// Get all bookings for the logged-in user with pagination
const getLoggedInUserBookings = async (req, res) => {
  try {
    const { page = 1, limit = 3 } = req.query; // Pagination parameters
    const userId = req.session.user._id;
    const totalCount = await BookingModel.countDocuments({
      userId: userId,
      isActive: true,
    });

    // Retrieve bookings for the logged-in user
    const bookings = await BookingModel.find({ userId: userId, isActive: true })
      .populate()
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ bookingDate: -1 }); // Sort by date (most recent first)

    res.render("./bookings/user-bookings", {
      pageTitle: "My Bookings",
      bookings: bookings,
      userId: userId,
      page: parseInt(page),
      limit: parseInt(limit),
      totalCount: totalCount,
    });
  } catch (err) {
    log.error(`Get Bookings error, ${JSON.stringify(err)}`);
    return apiResponse.ErrorResponse(
      res,
      "Error creating booking" + err.message,
    );
  }
};

// Disable a booking (soft delete)
const deleteBooking = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const disabledBooking = await BookingModel.findByIdAndUpdate(
      bookingId,
      { isActive: false, status: "Cancelled" },
      { new: true },
    );

    if (!disabledBooking) {
      return apiResponse.notFoundResponse(res, "Booking not found");
    }
    const userId = req.session.user._id;
    res.status(200).redirect(`/api/booking/${userId}/bookings`);
  } catch (err) {
    log.error(`Delete Bookings error, ${JSON.stringify(err)}`);
    return apiResponse.ErrorResponse(
      res,
      "Error deleting booking" + err.message,
    );
  }
};

const renderMerchantDashboardBookingsPage = async (req, res) => {
  try {
    const merchantId = req.session.user.merchant?._id;
    const upcomingBookings = await getUpcomingBookingsByMerchantId(merchantId);
    console.log("UPCOMING BOOKINGS", upcomingBookings);
    res.render("./merchant-dashboard/bookings", {
      message: null,
      upcomingBookings,
    });
  } catch (err) {
    return apiResponse.ErrorResponse(
      res,
      "Error rendering bookings page " + err.message,
    );
  }
};

const renderMerchantDashboardSettingsPage = async (req, res) => {
  try {
    const merchantId = req.session.user.merchant?._id;
    const merchant = await MerchantsModel.findById(merchantId).lean();
    res.render("./merchant-dashboard/settings", {
      message: null,
      merchant,
    });
  } catch (err) {
    return apiResponse.ErrorResponse(
      res,
      "Error rendering settings page " + err.message,
    );
  }
};

const renderMerchantDashboardMenuPage = async (req, res) => {
  try {
    const merchantId = req.session.user.merchant?._id;
    const merchant = await MerchantsModel.findById(merchantId).lean();
    res.render("./merchant-dashboard/menu", {
      message: null,
      merchant,
    });
  } catch (err) {
    return apiResponse.ErrorResponse(
      res,
      "Error rendering menu page " + err.message,
    );
  }
};

module.exports = {
  handleCreateBooking,
  renderCreateBooking,
  getLoggedInUserBookings,
  deleteBooking,
  renderMerchantDashboardBookingsPage,
  renderMerchantDashboardSettingsPage,
  renderMerchantDashboardMenuPage,
};
