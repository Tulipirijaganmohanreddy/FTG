import BASE_URL from "../APIS";

export const districtEndPoints = {
  emailSetting: () => {
    `${BASE_URL}/emailSetting/addEmailSettings`;
  },
  mandatesApi: () => {
    `${BASE_URL}/mandates/addMandates`;
  },

  getDistrictForDistrictAdmin: (UUID) =>
    `${BASE_URL}/districts/getDistrictWithDistrictAdmin/${UUID}`,
  getAutoPromote: `${BASE_URL}/promoteStudent/autopromote`,
  updateDistrictForDistrictAdmin: (UUID) =>
    `${BASE_URL}/districts/updateDistrict/${UUID}`,

  getMandates: () => `${BASE_URL}/mandates/getAllMandates`,
  getAllTestItems: () => `${BASE_URL}/mandates/getAllTests`,
  addMandate: () => `${BASE_URL}/mandates/addMandates`,
  updateMandate: (mandateId) =>
    `${BASE_URL}/mandates/updateMandates/${mandateId}`,

  getRolesAndPrivilegesByRole: (role, districtId) =>
    `${BASE_URL}/privileges?role=${role}&district_uuid=${districtId}`,
  updateRolesAndPrivilages: () => `${BASE_URL}/privileges/updatePermission`,
  districtStatistics: (district_uuid) =>
    `${BASE_URL}/districts/getweeklylogins?uuid=${district_uuid}`,
  getAccessLogsCount: (district_uuid) =>
    `${BASE_URL}/districts/getaccesslogscount?uuid=${district_uuid}`,
  recievedNotifications: () => `${BASE_URL}/announcement/getNotifications`,

  getStudentsListForReports: () =>
    `${BASE_URL}/users/getStudentsListForReports`,

  overviewReportSummaryByClass: () =>
    `${BASE_URL}/studentreports/overviewReportSummaryByClass`,

  updateNotificationApproveStatus: () =>
    `${BASE_URL}/announcement/status/updateStatus`,

  deleteAnnouncement: (uuid) => `${BASE_URL}/announcement/${uuid}`,
  getStates: () => `${BASE_URL}/states/getStates`,
  mergeUsers: () => `${BASE_URL}/users/mergeUsers`,
  assignAndUnAssignUsers: () => `${BASE_URL}/userClass/actionAssignAndUnassign`,
  changePasswordDA: () => `${BASE_URL}/users/changePasswordByDA`,

  listOfImportErrors: (data) =>
    `${BASE_URL}/mappings/list-of-import-errors/${data.uuid}/${
      data.type
    }?size=${20}&skip=${data.skip}`,
  deleteMandate: (mandateId) =>
    `${BASE_URL}/mandates/deleteMandates/${mandateId}`,
  dataExport: () => `${BASE_URL}/reports/dataExport`,
  uploadCsvSftp: `${BASE_URL}/mappings/upload-csv-to-sftp`,
  initiateUpload: `${BASE_URL}/mappings/initiateUpload/`,
  uploadCsv: (id) => `${BASE_URL}/mappings/upload?uploadId=${id}`,
  completeUpload: (data) =>
    `${BASE_URL}/mappings/completeUpload?fileName=${data.fileName}&uploadId=${data.uploadId}&mappingUUID=${data.mappingUUID}`,
  //fitnessgram reports apis
  completionReport: () => `${BASE_URL}/reports/completionReport`,
  completionReportCsv: `${BASE_URL}/reports//completionReportCsv`,
  overviewReport: `${BASE_URL}/reports/overviewReport`,
  dataExportFilters: () => `${BASE_URL}/reports/dataExportWithHash`,
  partnerLicenses: `${BASE_URL}/states/getmultiplelicenseforpartner`,
  licenseDistricts: `${BASE_URL}/states/getDistrictsForLicense`, //districts in licenses for state admin and partner in report filters
  schoolsInDistrictsForStateAndPartner: () =>
    `${BASE_URL}/schools/getSchoolsForStateAdmin`,
  schoolAcademicYear: () => `${BASE_URL}/reports/getAcademicDates `,
  downloadAllStudentsReport: () => `${BASE_URL}/reports/downloadStudentsReport`,
  emailAllStudentsReport: `${BASE_URL}/reports/requestForReportEmail`,

  promoteStudents: () => `${BASE_URL}/promoteStudent/promoteRequest`,

  promoteStudentHistory: () => `${BASE_URL}/promoteStudent/history`,
};
