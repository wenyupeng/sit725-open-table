const { expect } = require("chai");
const sinon = require("sinon");
const moment = require("moment");
const { BookingModel } = require("../models");
const bookingService = require("../services/booking.service");

describe("Booking Service", () => {
  describe("getUpcomingBookingsByMerchantId", () => {
    let findStub;

    beforeEach(() => {
      findStub = sinon.stub(BookingModel, "find");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("should return upcoming bookings for a given merchantId", async () => {
      const mockBookings = [
        {
          _id: "1",
          merchantId: "merchant123",
          bookingDateTime: new Date(Date.now() + 1000000),
          userId: { _id: "user1", name: "John Doe" },
        },
      ];

      const query = {
        populate: sinon.stub().returnsThis(),
        sort: sinon.stub().returnsThis(),
        lean: sinon.stub().resolves(mockBookings),
      };
      findStub.returns(query);
      
      
      const result = await bookingService.getUpcomingBookingsByMerchantId("merchant123");

      expect(result).to.be.an("array");
      expect(result[0]).to.have.property("displayedBookingDateTime");
      expect(result[0].userId).to.equal("user1");
    });
  });

  describe("validateTimeslot", () => {
    it("should return available slots when the time is available", () => {
      const merchant = {
        openHours: [
          { day: "Monday", time: "10:00, 12:00", availableSlots: 5 },
        ],
      };
      const datepicker = "2024-02-05"; // Monday
      const time = "10:00";

      const result = bookingService.validateTimeslot(merchant, datepicker, time);
      expect(result).to.equal(5);
    });

    it("should return null when the time is not available", () => {
      const merchant = {
        openHours: [
          { day: "Monday", time: "10:00, 12:00", availableSlots: 5 },
        ],
      };
      const datepicker = "2024-02-05"; // Monday
      const time = "14:00";

      const result = bookingService.validateTimeslot(merchant, datepicker, time);
      expect(result).to.be.null;
    });

    it("should return null when no available slots for the selected day", () => {
      const merchant = {
        openHours: [
          { day: "Tuesday", time: "10:00, 12:00", availableSlots: 5 },
        ],
      };
      const datepicker = "2024-02-05"; // Monday
      const time = "10:00";

      const result = bookingService.validateTimeslot(merchant, datepicker, time);
      expect(result).to.be.null;
    });
  });
});
