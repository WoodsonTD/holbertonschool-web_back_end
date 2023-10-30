const chai = require('chai');
const sinon = require('sinon');
const sendPaymentRequestToApi = require('./5-payment');

const expect = chai.expect;

describe('sendPaymentRequestToApi', function () {
  let consoleLogSpy;

  // Set up the spy before each test
  beforeEach(function () {
    consoleLogSpy = sinon.spy(console, 'log');
  });

  // Clean up the spy after each test
  afterEach(function () {
    consoleLogSpy.restore();
  });

  it('should log the correct message and be called once for 100 and 20', function () {
    sendPaymentRequestToApi(100, 20);

    // Verify that the console log message is correct
    expect(consoleLogSpy.calledWith('The total is: 120')).to.be.true;

    // Verify that console.log is called only once
    expect(consoleLogSpy.calledOnce).to.be.true;
  });

  it('should log the correct message and be called once for 10 and 10', function () {
    sendPaymentRequestToApi(10, 10);

    // Verify that the console log message is correct
    expect(consoleLogSpy.calledWith('The total is: 20')).to.be.true;

    // Verify that console.log is called only once
    expect(consoleLogSpy.calledOnce).to.be.true;
  });
});
