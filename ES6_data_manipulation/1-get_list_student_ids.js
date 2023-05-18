function getListStudentIds(array) {
  if (!Array.isArray(array)) { // if array is not an array
    return []; // return empty array
  }

  return array.map((item) => item.id); // return array of ids
}

export default getListStudentIds; // export function
