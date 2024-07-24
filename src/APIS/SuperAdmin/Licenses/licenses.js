import BASE_URL from "../../index";
export const LiencesEndPoints = {
  fundersList: () => `${BASE_URL}/licenses/funderslist`,
  createLicense: `${BASE_URL}/licenses`,
  getLicenses: `${BASE_URL}/licenses/getLicense`,
  getLicenseById: (uuid) => `${BASE_URL}/licenses/getLicenseById/${uuid}`,
  updateLicenseById: `${BASE_URL}/licenses/updatelicenseById`,
  getLicensedSchools: (uuid) => `${BASE_URL}/licenses/licensedschools/${uuid}`,
  deleteLicense: (uuid) => `${BASE_URL}/licenses/deleteLicense/${uuid}`,
  deleteSchoolLicense: () => `${BASE_URL}/licenses/deleteschoolLicense`,
  schoolsToAddLicense: `${BASE_URL}/licenses/schools`,
  addLicenseToSchool: `${BASE_URL}/licenses/addlicensetoschool`,
  getLicenseHistoryById: (uuid) =>
    `${BASE_URL}/licenses/licensehistory/${uuid}`,
  getEmailTemplates: `${BASE_URL}/resources/getEmailTemplates`,
  getEmailHistory: (district_uuid) =>
    `${BASE_URL}/resources/getEmailHistory/${district_uuid}`,
  addContacts: `${BASE_URL}/licenses/addcontacts`,
  getAllDistrictsOrSchoolBasedOnRole: (role, uuid, searchText) =>
    `${BASE_URL}/licenses/getalldistrictsOrschools?role=${role}&uuid=${uuid}&search=${searchText}`,

  getAllContactsForFunder: (uuid) =>
    `${BASE_URL}/licenses/getAllContacts/${uuid}`,

  sendEmailToContacts: `${BASE_URL}/resources/sendWelcomeMail`,
  deleteContact: `${BASE_URL}/licenses/deleteContacts`,
  deleteEmailHistory: (uuid) =>
    `${BASE_URL}/resources/deleteEmailHistory/${uuid}`,
  exportLicense: `${BASE_URL}/licenses/exportlicenses`,
  updateSchoolDate: `${BASE_URL}/licenses/updateSchoolDate`,

  getAllContacts: (uuid,license_uuid, size, skip, searchText, role) =>
    `${BASE_URL}/licenses/getAllContacts?uuid=${uuid}&size=${size}&skip=${skip}&search=${searchText}&role=${role}&license_uuid=${license_uuid}`,
  checkLicense: (uuid) => `${BASE_URL}/licenses/checkLicense/${uuid}`,
};
