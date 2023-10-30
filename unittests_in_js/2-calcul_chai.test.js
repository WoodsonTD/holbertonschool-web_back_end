const chai = require('chai');
const expect = chai.expect;
const calculateNumber = require('./2-calcul_chai.js');

describe('calculateNumber', function () {
  it('should round and add two numbers when type is SUM', function () {
    expect(calculateNumber('SUM', 1.4, 4.5)).to.equal(6);
  });

  it('should round and subtract two numbers when type is SUBTRACT', function () {
    expect(calculateNumber('SUBTRACT', 1.4, 4.5)).to.equal(-4);
  });

  it('should round and divide two numbers when type is DIVIDE', function () {
    expect(calculateNumber('DIVIDE', 1.4, 4.5)).to.equal(0.2);
    expect(calculateNumber('DIVIDE', 1.4, 0)).to.equal('Error');
  });

  it('should throw an error for an invalid type', function () {
    expect(() => calculateNumber('INVALID_TYPE', 1.4, 4.5)).to.throw(/Invalid type/);
  });

  it('should throw an error when either argument is not a number', function () {
    expect(() => calculateNumber('SUM', '1.4', 4.5)).to.throw(/Both arguments must be numbers/);
  });
});
