export default function createReportObject(employeeList) {
  const allEmployees = {
    ...employeeList,
  };

  return {
    allEmployees,
    getNumberOfDepartments: () => Object.keys(employeeList).length,
  };
}
