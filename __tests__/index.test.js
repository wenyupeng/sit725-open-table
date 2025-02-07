let request = require("supertest");
let app = require("../src/app");
let expect = require("chai").expect;

describe("home page", () => {
  describe("load home page", function () {
    it("returns status 200 to get the home page successfully", function (done) {
      request(app)
        .get("/")
        .set("Content-Type", "application/json")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it("returns status 404 to get the home page failed", function (done) {
      request(app)
        .get("/index")
        .set("Content-Type", "application/json")
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
});
