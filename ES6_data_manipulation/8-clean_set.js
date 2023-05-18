export default function cleanSet(set, startString) {
  if (!startString || !startString.length) {
    return '';
  }
  const result = [];
  set.forEach((item) => {
    if (item && item.startsWith(startString)) {
      result.push(item.slice(startString.length));
    }
  });
  return result.join('-');
}
