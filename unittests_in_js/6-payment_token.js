// 6-payment_token.js
function getPaymentTokenFromAPI(success) {
  if (success) {
    return Promise.resolve({ data: 'Successful response from the API' });
  } else {
    return Promise.reject(new Error('API request failed'));
  }
}

module.exports = getPaymentTokenFromAPI;
