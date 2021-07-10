const request = require('supertest');

const app = require('../src/app');

// This should test that the base url responds
describe('GET /', () => {
  it('responds with a json message', (done) => {
    request(app).get('/').set('Accept', 'application/json').expect('Content-Type', /json/).expect(
      200,
      {
        message: '👍👍',
      },
      done
    );
  });
});

// This should test that the rest api responds

// This should test error handling
describe('app', () => {
  it('responds with a not found message', (done) => {
    request(app)
      .get('/what-is-this-even')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});
