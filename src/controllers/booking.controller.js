const { ObjectId } = require("mongodb");
const { MerchantsModel, MenuModel, BookingModel } = require("../models");

const log = require("../utils/utils.logger");

const { getBookingsByMerchantId } = require("../services/booking.service");

/**
 * [Features][Booking] Handle Create Booking
 *
 * @returns {Object} featured collections
 * @param {ObjectId}  userId  userId
 * @param {ObjectId}  restaurantId  restaurantId
 * @param {string}  bookingDate bookingDate
 * @param {string}  bookingTime bookingTime
 * @param {string}  specialRequest specialRequest
 * @param {Array}   menuItems menuItems
 * @param {Int32}   numberOfGuests numberOfGuests
 * @param {Int32}   subTotal subTotal
 * @param {Int32}   totalPriceWithGST totalPriceWithGST
 * @returns {Object} common response
 */
const handleCreateBooking = async (req, res) => {
  try {
    const { merchantId } = req.params;
    const merchant = await MerchantsModel.findById(merchantId);

    if (!merchant) {
      return res
        .status(404)
        .render("./error/404", { pageTitle: "Merchant Not Found" });
    } else {
      const menu = await MenuModel.findOne({ merchantId: { $eq: merchantId } });

      if (!menu) {
        return res
          .status(404)
          .render("./error/404", { pageTitle: "No Menuitems Found" });
      }
      const { datepicker, time, menuItems, guests } = req.body;
      // Validate inputs
      if (!datepicker || !time || !guests) {
        return res.status(400).render("./booking/booking", {
          pageTitle: "Booking",
          message: "All fields are required.",
        });
      }
      const parsedMenuItems = JSON.parse(menuItems);

      const subTotal = parsedMenuItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0,
      );

      const booking = new BookingModel({
        userId: new ObjectId(req.session.userId),
        merchantId: new ObjectId(merchantId),
        menuItems: parsedMenuItems,
        subTotal: subTotal,
        totalPriceWithGST: subTotal * 1.1,
        bookingDate: req.body.datepicker,
        bookingTime: req.body.time,
        specialRequest: req.body.specialRequest.replace(/[<>]/g, ""),
        numberOfGuests: parseInt(req.body.guests, 10),
      });

      await booking.save();

      res.redirect(`/merchant/${merchantId}`);
    }
  } catch (err) {
    log.error(`Add Merchant error, ${JSON.stringify(err)}`);
    res.status(500).render("./booking/booking", {
      pageTitle: "Booking",
      message: "Error creating booking",
    });
  }
};

/**
 * [Features][Booking] Render Create Booking
 * @returns {Object} featured collections
 */
const renderCreateBooking = async (req, res) => {
  const { merchantId } = req.params;

  const merchant = await MerchantsModel.findById(merchantId);
  const menu = await MenuModel.findOne({ merchantId: { $eq: merchantId } });

  res.render("./booking/booking", {
    pageTitle: `Book ${merchant.name}`,
    merchant: merchant,
    menu: menu || [],
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

const renderMerchantDashboardMyBooking = async (req, res) => {
  const bookings = await getBookingsByMerchantId;
  res.render("./merchant-dashboard/bookings", { bookings });
};

module.exports = {
  handleCreateBooking,
  renderCreateBooking,
  renderMerchantDashboardMyBooking,
};
