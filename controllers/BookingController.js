const { ObjectId } = require("mongodb");
const moment = require("moment");
const { MerchantsModel, MenuModel, BookingModel } = require("../models");
const apiResponse = require("../utils/utils.apiResponse");
const log = require("../utils/utils.logger");
const {
  getUpcomingBookingsByMerchantId,
} = require("../services/booking.service");

/**
 * [Features][Booking] Handle Create Booking
 *
 * @param {ObjectId}  userId  userId
 * @param {ObjectId}  mechantId  restaurantId
 * @param {string}  bookingDate bookingDate
 * @param {string}  bookingTime bookingTime
 * @param {string}  specialRequest specialRequest
 * @param {Array}   menuItems menuItems
 * @param {Int32}   numberOfGuests numberOfGuests
 * @param {Int32}   subTotal subTotal
 * @param {Int32}   totalPriceWithGST totalPriceWithGST
 * @returns {Object} common response
 */
exports.handleCreateBooking = [
  async (req, res) => {
    try {
      const { merchantId } = req.params;
      const merchant = await MerchantsModel.findById(merchantId);

      if (!merchant) {
        return apiResponse.notFoundResponse(res, "Merchant not found");
      } else {

        let slots =merchant.slots;
        if(parseInt(slots)<1){
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

        const parsedMenuItems = JSON.parse(menuItems);

        const subTotal = parsedMenuItems.reduce(
          (sum, item) => sum + item.quantity * item.price,
          0,
        );

        const bookingDateTime = moment(
          `${moment(req.body.datepicker).format("YYYY-MM-DD")} ${req.body.time}`,
          "YYYY-MM-DD HH:mm A",
        );

        console.log("check booking is already exists or not");
        const existingBooking = await BookingModel.findOne({
          userId: { $eq: new ObjectId(req.session.user._id) },
          merchantId: { $eq: merchantId },
          bookingDate: { $eq: req.body.datepicker },
          bookingTime: { $eq: req.body.time },
          isActive: { $eq: true },
        });

        if (existingBooking) {
          return apiResponse.validationErrorWithData(
            res,
            "Booking already exists for this date and time.",
          );
        }

        console.log("update merchant booking slots");
        await MerchantsModel.updateOne({merchantId: merchantId},{$set: {slots: slots-1}});

        console.log("create new booking");
        const booking = new BookingModel({
          userId: new ObjectId(req.session.user._id),
          merchantId: new ObjectId(merchantId),
          menuItems: parsedMenuItems,
          subTotal: subTotal,
          totalPriceWithGST: subTotal * 1.1,
          bookingDate: req.body.datepicker,
          bookingTime: req.body.time,
          bookingDateTime,
          specialRequest: req.body.specialRequest.replace(/[<>]/g, ""),
          numberOfGuests: parseInt(req.body.guests, 10),
          merchantName: merchant.name,
        });

        await booking.save();

        return apiResponse.successResponseWithData(
          res,
          "Booking created successfully",
          res.redirect(`/api/booking/${booking.userId}/bookings`),
        );
        // res.redirect(`/api/booking/${booking.userId}/bookings`);
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
exports.renderCreateBooking = async (req, res) => {
  const { merchantId } = req.params;
  const user = req.session.user;
  const merchant = await MerchantsModel.findById(merchantId);
  const menus = await MenuModel.find({
    merchantId: { $eq: merchantId },
    isActive: { $eq: true },
  });

  res.render("./booking/booking", {
    pageTitle: `Book ${merchant.name}`,
    merchant: merchant,
    menus: menus,
    user: user,
    timeSlots: [
      "11:30 AM",
      "12:00 PM",
      "12:30 PM",
      "13:00 PM",
      "13:30 PM",
      "14:00 PM",
      "14:30 PM",
      "15:00 PM",
      "15:30 PM",
      "16:00 PM",
      "16:30 PM",
      "17:00 PM",
      "17:30 PM",
      "18:00 PM",
      "18:30 PM",
    ],
    guestOptions: Array.from({ length: 10 }, (_, i) => i + 1),
  });
};

// Get all bookings for the logged-in user with pagination
exports.getLoggedInUserBookings = async (req, res) => {
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
exports.deleteBooking = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const disabledBooking = await BookingModel.findByIdAndUpdate(
      bookingId,
      { isActive: false },
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

exports.renderMerchantDashboardBookingsPage = async (req, res) => {
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
