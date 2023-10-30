function calculateNumber(type, a, b) {
  // Ensure a and b are numbers
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  }

  if (type === 'SUM') {
    return Math.round(a) + Math.round(b);
  } else if (type === 'SUBTRACT') {
    return Math.round(a) - Math.round(b);
  } else if (type === 'DIVIDE') {
    if (Math.round(b) === 0) {
      return 'Error';
    }
    return Math.round(a) / Math.round(b);
  } else {
    throw new Error('Invalid type. Use SUM, SUBTRACT, or DIVIDE.');
  }
}

module.exports = calculateNumber;
