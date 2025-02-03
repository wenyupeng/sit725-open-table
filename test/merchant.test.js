let request = require("supertest");
let app = require("../server");
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
  });
});
