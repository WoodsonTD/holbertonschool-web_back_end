const chai = require('chai');
const sinon = require('sinon');
const sendPaymentRequestToApi = require('./4-payment');
const Utils = require('./utils');

const expect = chai.expect;

describe('sendPaymentRequestToApi', function () {
  it('should stub Utils.calculateNumber and log the result', function () {
    // Stub the calculateNumber function to always return 10
    const calculateNumberStub = sinon.stub(Utils, 'calculateNumber').returns(10);

    // Create a spy to capture console.log
    const consoleLogSpy = sinon.spy(console, 'log');

    // Call the function
    sendPaymentRequestToApi(100, 20);

    // Ensure calculateNumber was called with the correct arguments
    expect(calculateNumberStub.calledWith('SUM', 100, 20)).to.be.true;

    // Ensure the result was logged to the console
    expect(consoleLogSpy.calledWith('The total is: 10')).to.be.true;

    // Restore the stub and the spy to prevent side effects
    calculateNumberStub.restore();
    consoleLogSpy.restore();
  });
});
