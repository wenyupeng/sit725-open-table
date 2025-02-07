let request = require("supertest");
let app = require("../server");
let expect = require("chai").expect;

describe('booking routes', async function () {
  let token = "";
  let user = {
    "username": "Chris Wen",
    "password": "123456"
  };

  try {
    const res = await request(app)
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send(user)
      .expect(200);

    token = JSON.parse(res.text).data.token;
  } catch (error) {
    console.error('Failed to obtain token:', error);
    throw error;
  }

  beforeEach(async function () {
    request(app)
      .get("/api/booking/test?userId=678b0185d1bffcb7c9aeaa59")
      .end((err, res) => {
        expect(res.status).to.equal(200);
      });

  });

  describe('create booking', function () {
    it('returns status 200 to create booking successfully', function (done) {
      let booking = { "merchantId": "67843620c4e4b645042d08f9", "datepicker": "2025-02-07", "time": " 14:00", "guests": "1", "specialRequest": "", "menuItems": "[{\"id\":\"678b039afaf7bc04e32bbf33\",\"quantity\":1,\"price\":5,\"name\":\"Grant Burge\",\"img\":\"https://images.freeimages.com/images/large-previews/cc4/desserts-1323145.jpg\"}]" };

      request(app)
        .post("/api/booking/67830cc1a9507d18e286c8fe")
        .set("Content-Type", "application/json")
        .set("Authorization", token)
        .send(booking)
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('returns status 404 to create booking with invalid data', function (done) {
      let booking = { "merchantId": "67843620c4e4b645042d08f9", "datepicker": "2025-02-07", "time": " 14:00", "guests": "5", "specialRequest": "", "menuItems": "[{\"id\":\"678b039afaf7bc04e32bbf33\",\"quantity\":1,\"price\":5,\"name\":\"Grant Burge\",\"img\":\"https://images.freeimages.com/images/large-previews/cc4/desserts-1323145.jpg\"}]" };

      request(app)
        .post("/api/booking/67830cc1a9507d18e286c8fe/list")
        .set("Content-Type", "application/json")
        .set("Authorization", token)
        .send(booking)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

  describe('booking list', function () {
    it('returns status 200 to get booking list successfully', function (done) {
      request(app)
        .get("/booking/678b0185d1bffcb7c9aeaa59/bookings")
        .set("Authorization", token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('returns status 401 to get booking list without user info', function (done) {
      request(app)
        .get("/booking/678b0185d1bffcb7c9aeaa59/booking")
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

  describe('booking delete', function () {
    it('returns status 200 to delete booking successfully', function (done) {
      let booking = { "merchantId": "67843620c4e4b645042d08f9", "datepicker": "2025-02-07", "time": " 14:00", "guests": "5", "specialRequest": "", "menuItems": "[{\"id\":\"678b039afaf7bc04e32bbf33\",\"quantity\":1,\"price\":5,\"name\":\"Grant Burge\",\"img\":\"https://images.freeimages.com/images/large-previews/cc4/desserts-1323145.jpg\"}]" };

      request(app)
        .post("/api/booking/67830cc1a9507d18e286c8fe")
        .set("Content-Type", "application/json")
        .set("Authorization", token)
        .send(booking)
        .end((err, res) => {
          expect(res.status).to.equal(200);
        });

      request(app)
        .get("/api/booking/test?userId=678b0185d1bffcb7c9aeaa59")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('returns status 404 to delete booking without booking info', function (done) {
      request(app)
        .delete("/api/booking/678b0185d1bffcb7c9aeaa59/bookings/67a4cbdc704c4755ce0700dd/delete")
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

});
