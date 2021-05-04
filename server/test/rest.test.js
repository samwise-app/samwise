const request = require('supertest');

const app = require('../src/app');

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app).get('/api/v1').set('Accept', 'application/json').expect('Content-Type', /json/).expect(
      200,
      {
        message: 'API Functioning - 👋',
      },
      done
    );
  });
});

describe('GET /api/v1/books', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1/books')
      .set('Accept', 'application/json')
      // .set('Body', '{title: "Good"}')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
