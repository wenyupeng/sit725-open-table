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

  beforeEach(function () {
    request(app)
      .get('/api/booking/test')
      .set('Content-Type', 'application/json')
      .expect(200);

  });

  describe('create booking', function () {
    it('returns status 200 to create booking successfully', function () {
      let booking = {
        menuItems: [{
          name: "Grant Burge",
          img: "https://images.freeimages.com/images/large-previews/cc4/desserts-1323145.jpg",
          quantity: 1,
          price: 5,
          _id: "678b039afaf7bc04e32bbf26"
        }],
        datepicker: "2025-02-05T00:00:00Z",
        time: "13:00",
        guests: 6,
        specialRequest: ""
      };

      request(app)
        .post("/api/booking/67830cc1a9507d18e286c8fe")
        .set("Content-Type", "application/json")
        .set("Authorization", token)
        .send(booking)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });


  });

});
