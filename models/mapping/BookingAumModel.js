const { getDB } = require("../../db/d_base");
const { ObjectId } = require("mongodb");

class Booking {
  // Add a booking
  static async createBooking(bookingData) {
    const db = getDB();
    await db.collection("bookings").insertOne(bookingData);
  }

  //TODO: update Bookings, list bookings by userid, disable a booking
}

module.exports = Booking;
