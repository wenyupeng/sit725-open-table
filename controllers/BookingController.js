const { body, validationResult } = require("express-validator");
const apiResponse = require("../utils/utils.apiResponse");
const log = require("../utils/utils.logger");

const { ObjectId } = require("mongodb");
const Restaurant = require("../models/mapping/RestaurantAumModel");
const Booking = require("../models/mapping/BookingAumModel");

/**
 * Handle booking creation
 * @param {ObjectId}  userId  userId
 * @param {ObjectId}  restaurantId  restaurantId
 * @param {string}  bookingDate bookingDate
 * @param {string}  bookingTime bookingTime
 * @param {boolean}  isActive isActive
 * @param {string}  specialRequest specialRequest
 * @param {Array}  menuItems menuItems
 * @param {Int32}  numberOfGuests numberOfGuests
 * @param {Int32}  subTotal subTotal
 * @param {Int32}  totalPriceWithGST totalPriceWithGST
 * @returns {Object} common response
 */

// Create New Restaurant
exports.handleCreateRestaurantBooking = [
  async (req, res) => {
    try {
      const { restaurantId } = req.params;
      const { datepicker, time, menuItems, specialRequest, guests } = req.body;

      const restaurant = await Restaurant.getRestaurantById(restaurantId);

      if (!restaurant) {
        return res
          .status(404)
          .render("./error/404", { pageTitle: "Restaurant Not Found" });
      }

      const parsedMenuItems = JSON.parse(menuItems);

      const subTotal = parsedMenuItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );

      // Validate inputs
      if (!datepicker || !time || !guests) {
        return res.status(400).render("booking-form", {
          pageTitle: "Booking",
          message: "All fields are required.",
        });
      }

      const booking = {
        userId: new ObjectId(req.session.userId),
        restaurantId: new ObjectId(restaurantId),
        menuItems: parsedMenuItems,
        subTotal: subTotal,
        totalPriceWithGST: subTotal * 1.1,
        bookingDate: req.body.datepicker,
        bookingTime: req.body.time,
        specialRequest: req.body.specialRequest.replace(/[<>]/g, ''),
        numberOfGuests: parseInt(req.body.guests, 10),
        isActive: true,
        dateCreated: new Date(),
        dateModified: new Date(),
      };

      await Booking.createBooking(booking);

      res.redirect(`/api/restaurants/${restaurantId}`);
    } catch (err) {
      
      res.status(500).render("./booking/booking_form", {
        pageTitle: "Booking",
        message: "Error creating restaurant",
      });
    }
  },
];

exports.renderCreateRestaurantBooking = [
  async (req, res) => {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.getRestaurantById(restaurantId);

    if (!restaurant) {
      return res
        .status(404)
        .render("./error/404", { pageTitle: "Restaurant Not Found" });
    }
    console.log("restaurant name:", restaurant.restaurantName);

    const activeMenuItems = restaurant.menu.filter((item) => item.isActive);

    res.render("./booking/booking_form", {
      pageTitle: `Book ${restaurant.restaurantName}`,
      restaurant,
      activeMenuItems,
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
  },
];
