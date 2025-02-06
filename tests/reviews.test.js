let request = require("supertest");
let app = require("../server");
let expect = require("chai").expect;

describe('Reviews', function () {
  let token = "";
  let user = {
    "username": "Chris Wen",
    "password": "123456"
  };
  request(app)
    .post('/api/auth/login')
    .set('Content-Type', 'application/json')
    .send(user)
    .expect(200)
    .then(res => {
      token = JSON.parse(res.text).data.token;
    });

  beforeEach(function () {
    request(app)
      .delete('/api/reviews/67830cc1a9507d18e286c811')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .expect(200);

    reviews = [];
  });

  describe('addReview', function () {
    it('should add a review to the reviews array', function () {
      let newReview = {
        "merchantId": "67830cc1a9507d18e286c811",
        "menuId": "678b039afaf7bc04e32bbf30",
        "userId": "678b0185d1bffcb7c9aeaa59",
        "photos": [
          "photo1.jpg",
          "photo2.jpg"
        ],
        "descriptions": "This is a good restaurant",
        "star": 4.5
      };

      request(app)
        .post('/api/reviews')
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .send(newReview)
        .expect(200);
    });
  });
  describe('getReviews', function () {
    it('should return an empty array when no reviews are added', function () {
      request(app)
        .get('/api/reviews/67830cc1a9507d18e286c811')
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .expect(404)
        .end(function (err, res) {
          expect(JSON.parse(res.text).status).equal(0);
        });
    });

    it('should return all added reviews', function () {
      let newReview1 = {
        "merchantId": "67830cc1a9507d18e286c811",
        "menuId": "678b039afaf7bc04e32bbf30",
        "userId": "678b0185d1bffcb7c9aeaa59",
        "photos": [
          "photo1.jpg",
          "photo2.jpg"
        ],
        "descriptions": "This is a good restaurant",
        "star": 4.5
      };

      let newReview2 = {
        "merchantId": "67830cc1a9507d18e286c811",
        "menuId": "678b039afaf7bc04e32bbf30",
        "userId": "678b0185d1bffcb7c9aeaa59",
        "photos": [
          "photo1.jpg",
          "photo2.jpg"
        ],
        "descriptions": "This is a bad restaurant",
        "star": 2.5
      };

      request(app)
        .post('/api/reviews')
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .send(newReview1)
        .expect(200);

      request(app)
        .post('/api/reviews')
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .send(newReview2)
        .expect(200);

      request(app)
        .get('/api/reviews/67830cc1a9507d18e286c811')
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .expect(200)
        .end(function (err, res) {
          expect(JSON.parse(res.text).status).equal(0);
        });
    });
  });

  describe('deleteReview', function () {
    it('should delete review by the given merchantId', function () {
      let newReview1 = {
        "merchantId": "67830cc1a9507d18e286c811",
        "menuId": "678b039afaf7bc04e32bbf30",
        "userId": "678b0185d1bffcb7c9aeaa59",
        "photos": [
          "photo1.jpg",
          "photo2.jpg"
        ],
        "descriptions": "This is a good restaurant",
        "star": 4.5
      };


      request(app)
        .post('/api/reviews')
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .send(newReview1)
        .expect(200);

      request(app)
        .delete('/api/reviews/67830cc1a9507d18e286c811')
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .expect(200);
    });

    it('should not delete anything if the merchantId is not exist', function () {
      let newReview = {
        "merchantId": "67830cc1a9507d18e286c811",
        "menuId": "678b039afaf7bc04e32bbf30",
        "userId": "678b0185d1bffcb7c9aeaa59",
        "photos": [
          "photo1.jpg",
          "photo2.jpg"
        ],
        "descriptions": "This is a good restaurant",
        "star": 4.5
      };

      request(app)
        .post('/api/reviews')
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .send(newReview)
        .expect(200);

      request(app)
        .delete('/api/reviews/67830cc1a9507d18e286c811')
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .expect(200);
    });
  });

  describe('deleteReview', function () {

  });
});
