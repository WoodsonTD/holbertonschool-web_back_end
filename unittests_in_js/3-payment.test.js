// 3-payment.test.js
const chai = require('chai');
const sinon = require('sinon');
const sendPaymentRequestToApi = require('./3-payment');
const Utils = require('./utils');

const expect = chai.expect;

describe('sendPaymentRequestToApi', function () {
  it('should call Utils.calculateNumber with SUM type and log the result', function () {
    const calculateNumberSpy = sinon.spy(Utils, 'calculateNumber');
    const consoleLogSpy = sinon.spy(console, 'log');

    sendPaymentRequestToApi(100, 20);

    // Ensure calculateNumber was called with the correct arguments
    expect(calculateNumberSpy.calledWith('SUM', 100, 20)).to.be.true;

    // Ensure the result was logged to the console
    expect(consoleLogSpy.calledWith('The total is: 120')).to.be.true;

    // Restore the spies to prevent side effects
    calculateNumberSpy.restore();
    consoleLogSpy.restore();
  });
});
