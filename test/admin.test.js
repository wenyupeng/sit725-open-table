const request = require('supertest');
const { expect } = require('chai');
const app = require('../server'); // Import your Express app

describe('admin API', () => {
  let authToken;

  // Login to get an authentication token
  before(async () => {
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'admin',
        password: 'admin123',
      });

    authToken = loginResponse.body.token;
  });

  describe('GET /api/stats', () => {
    it('should return platform usage stats', async () => {
      const response = await request(app)
        .get('/api/stats')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).to.have.property('activeUsers');
      expect(response.body).to.have.property('merchantReservations');
      expect(response.body).to.have.property('userComments');
    });

    it('should return 401 if not authenticated', async () => {
      await request(app)
        .get('/api/stats')
        .expect(401);
    });
  });

  describe('GET /api/comments', () => {
    it('should return filtered comments by sentiment', async () => {
      const response = await request(app)
        .get('/api/comments?sentiment=Good')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).to.be.an('array');
      response.body.forEach((comment) => {
        expect(comment.sentiment).to.equal('Good');
      });
    });

    it('should return 401 if not authenticated', async () => {
      await request(app)
        .get('/api/comments?sentiment=Good')
        .expect(401);
    });
  });

  describe('POST /api/users/block', () => {
    it('should block a user', async () => {
      const response = await request(app)
        .post('/api/users/block')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ userId: '12345' })
        .expect(200);

      expect(response.body).to.have.property('message', 'User blocked successfully');
    });

    it('should return 401 if not authenticated', async () => {
      await request(app)
        .post('/api/users/block')
        .send({ userId: '12345' })
        .expect(401);
    });
  });

  describe('POST /api/merchants/manage', () => {
    it('should manage a merchant', async () => {
      const response = await request(app)
        .post('/api/merchants/manage')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ merchantId: '67890' })
        .expect(200);

      expect(response.body).to.have.property('message', 'Merchant managed successfully');
    });

    it('should return 401 if not authenticated', async () => {
      await request(app)
        .post('/api/merchants/manage')
        .send({ merchantId: '67890' })
        .expect(401);
    });
  });
});