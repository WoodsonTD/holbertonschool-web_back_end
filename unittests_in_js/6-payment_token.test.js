// 6-payment_token.test.js
const chai = require('chai');
const getPaymentTokenFromAPI = require('./6-payment_token');

const expect = chai.expect;

describe('getPaymentTokenFromAPI', function () {
  it('should resolve with the correct data when success is true', function (done) {
    getPaymentTokenFromAPI(true)
      .then((response) => {
        // Verify that the response data is correct
        expect(response).to.deep.equal({ data: 'Successful response from the API' });

        // Call done to indicate that the async test is complete
        done();
      })
      .catch((error) => {
        // Handle any errors
        done(error);
      });
  });
});
