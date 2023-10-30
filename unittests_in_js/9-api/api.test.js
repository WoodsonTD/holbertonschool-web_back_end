// 9-api/api.test.js
const chai = require('chai');
const request = require('request');

const expect = chai.expect;

describe('Index page', function () {
  const baseUrl = 'http://localhost:7865';

  // Start the Express server before running tests
  before(function (done) {
    require('./api.js'); // Start the Express server
    setTimeout(done, 1000); // Wait for the server to start
  });

  it('should return the correct status code', function (done) {
    request.get(baseUrl, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should return the correct result', function (done) {
    request.get(baseUrl, (error, response, body) => {
      expect(body).to.equal('Welcome to the payment system');
      done();
    });
  });

  it('should handle other routes', function (done) {
    request.get(baseUrl + '/other', (error, response, body) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
});

describe('Cart page', function () {
  const baseUrl = 'http://localhost:7865';

  it('should return the correct status code when :id is a number', function (done) {
    request.get(baseUrl + '/cart/123', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should return a 404 status code when :id is NOT a number', function (done) {
    request.get(baseUrl + '/cart/hello', (error, response, body) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
});
