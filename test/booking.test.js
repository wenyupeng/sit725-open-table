const supertest = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const request = supertest(app);

describe("Booking Controller", function () {
  it("should create a booking", async function () {
    const userId = new mongoose.Types.ObjectId();
    const subTotal = 20;

    // Mock session middleware
    app.use((req, res, next) => {
      req.session = { userId };
      next();
    });

    const mockRequest = {
      userId: new ObjectId(userId),
      merchantId: new mongoose.Types.ObjectId().toString(),
      menuItems: [],
      subTotal: subTotal,
      totalPriceWithGST: subTotal * 1.1,
      bookingDate: new Date(),
      bookingTime: "12:00 PM",
      specialRequest: "Medium rare",
      numberOfGuests: 2,
      merchantName: "Crown Restaurant",
    };

    request.post("/bookings").send(mockRequest).expect(201); // to be updated
  });
});
