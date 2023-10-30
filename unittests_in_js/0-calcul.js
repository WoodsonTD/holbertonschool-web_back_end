function calculateNumber(a, b) {
  // Round the values of a and b
  const roundedA = Math.round(a);
  const roundedB = Math.round(b);

  // Calculate and return the sum of the rounded values
  return roundedA + roundedB;
}

module.exports = calculateNumber; // Export the function for use in other files
