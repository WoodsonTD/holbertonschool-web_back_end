function getListStudentIds(arr) {
  if (!Array.isArray(arr)) {
    return [];
  }

  return arr.map((obj) => obj.id);
}

export default getListStudentIds;
