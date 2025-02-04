let request = require("supertest");
let app = require("../server");
const { before } = require("mocha");
let expect = require("chai").expect;

describe("merchant", () => {
  describe("merchant info", function () {
    it("returns status 200 to get the merchant page successfully", function (done) {
      request(app)
        .get("/merchant/67843620c4e4b645042d08f9")
        .set("Content-Type", "application/json")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it("returns status 404 to get the merchant page failed", function (done) {
      request(app)
        .get("/merchant/67843620c4e4b645042d0812")
        .set("Content-Type", "application/json")
        .end((err, res) => {
          expect(res.status).to.equal(500);
          done();
        });
    });

    it("returns status 200 to query the merchant list successfully", function (done) {
      request(app)
        .get("/api/merchant")
        .set("Content-Type", "application/json")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(JSON.parse(res.text).data.merchants.length).to.be.greaterThan(0);
          done();
        });
    });
  });

  describe("merchant register", function () {

    before(function (done) {
      request(app)
      .delete("/api/merchant/test")
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });

    // it("returns status 200 to register the merchant successfully", function (done) {
    //   let merchant = {
    //     "backgroundImg": "https://ai-public.mastergo.com/ai/img_res/2ebd8f7fb19ed793bd8c1da1c149950b.jpg",
    //     "name": "test",
    //     "category": "Restaurant",
    //     "type": "Romantic Dining",
    //     "description": "Fine Dining Excellence",
    //     "location": "123 Gourmet Street, Culinary District",
    //     "contactPhone": "+1 (555) 123-4367",
    //     "hours": "Mon-Sun: 11:00 AM - 11:00 PM",
    //     "reviews": 127,
    //     "star": 4,
    //     "isDeleted": false,
    //     "password": "123456"
    //   };

    //   request(app)
    //     .post("/api/merchant/register")
    //     .send(merchant)
    //     .set("Content-Type", "application/json")
    //     .end((err, res) => {
    //       expect(res.status).to.equal(200);
    //       done();
    //     });
    // });

    it("returns status 400 to register the merchant failed", function (done) {

      let merchant = {
        "backgroundImg": "https://ai-public.mastergo.com/ai/img_res/2ebd8f7fb19ed793bd8c1da1c149950b.jpg",
        "category": "Restaurant",
        "type": "Romantic Dining",
        "description": "Fine Dining Excellence",
        "location": "123 Gourmet Street, Culinary District",
        "contactPhone": "+1 (555) 123-4567",
        "hours": "Mon-Sun: 11:00 AM - 11:00 PM",
        "reviews": 127,
        "star": 4,
        "isDeleted": false,
        "password": "123456"
      };

      request(app)
        .post("/api/merchant/register")
        .send(merchant)
        .set("Content-Type", "application/json")
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });
});
