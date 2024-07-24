import BASE_URL from "../../index";

export const districtsEndPoints = {
  AddDistricts: `${BASE_URL}/districts/addDistricts`,

  UpdateDistricts: (uuid) => `${BASE_URL}/districts/updateDistrict/${uuid}`,
  DeleteDistrict: (uuid) => `${BASE_URL}/districts/deleteDistrict/${uuid}`,
  addSchool: `${BASE_URL}/schools/addSchool`,
  createAdminUser: `${BASE_URL}/users/addUsers`,
  editTeacherInfo: (uuid) => `${BASE_URL}/users/editTeacher/${uuid}`,
  getSchools: `${BASE_URL}/schools/getSchoolsForAdmin`,
  getTeachers: (uuid) => `${BASE_URL}/users/getTeachersBySchool/${uuid}`,
  // addSchoolToDistrict:`${BASE_URL}/schools/addSchool`
  // getAdminByDistrict: (uuid) =>
  //   `${BASE_URL}/districts/getDistrictWithDistrictAdmin/${uuid}`,
  getDistrictAdmin: (uuid) =>
    `${BASE_URL}/districts/getDistrictWithDistrictAdmin/${uuid}`,
  updateAdminDetails: (uuid) => `${BASE_URL}/users/updateUsers/${uuid}`,
  getSchoolsByDistrictId: (uuid) =>
    `${BASE_URL}/districts/getSchoolsBasedOnDistrictId/${uuid}`,
  getDistrictByFilter : () => `${BASE_URL}/districts/getDistricts`,
    updateSchool: (uuid) => `${BASE_URL}/schools/updateSchool/${uuid}`,
  assignAdminToDistrict: (uuid) =>
    `${BASE_URL}/districts/assignAdminToDistrict/${uuid}`,
  deleteAdminUser: (uuid) =>
    `${BASE_URL}/districts/removeAdminFromDistrict/${uuid}`,
  getSchoolAdminsBySchoolId: (uuid) =>
    `${BASE_URL}/schools/getSchoolWithSchoolAdmin/${uuid}`,
  getSchoolsAndTeacherofDistrict: (uuid) =>
    `${BASE_URL}/districts/getSchoolsAndTeacherOfDistrict/${uuid}`,
  getUsersDataById: (uuid) => `${BASE_URL}/users/getUserById/${uuid}`,
  removeSchool: (uuid) => `${BASE_URL}/schools/deleteSchool/${uuid}`,
  checkUniqueFields: `${BASE_URL}/users/checkUniqueFields`,
  getClassOfUsers: `${BASE_URL}/userClass/getClassOfUsers`,
  getDistrictAdminUsersToDistrict:(uuid)=>`${BASE_URL}/users/getUsersToAddDistrictAdmin/${uuid}`,
  getMetricsReport:()=>`${BASE_URL}/reports/getMetricsReport`,

  getExportContact : () => `${BASE_URL}/reports/exportContact`,


  
};
