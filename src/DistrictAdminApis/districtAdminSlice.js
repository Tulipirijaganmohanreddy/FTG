import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  emailSettings: [],
  mandatesData: [],
  totalNoOfPages: "",

  getDistrictForDistrictAdminResponse: [],
  mandateData: null,
  testItemsList: [],
  addMandate: null,
  rolesAndPrivilagesByRole: [],
  updateRolesAndPrivilages: [],
  updateRolesAndPrivilagesCode: "",
  districtStatistics: [],
  accessLogCounts: [],
  updateDistrictForDistrictAdminResponse: null,

  notificationsRecievedList: [],

  studentsListForReports: [],

  reportFilterDataObject: {},

  selectedStudentUUIDForReport: null,

  runReportButtonClicked: false,

  overviewReportSummaryByClass: [],

  editAnnouncementFormData: {},
  notificationApprovalStatus: {},
  deleteAnnouncementData: {},
  statesList: null,
  mergeUser: {},
  assignAndUnassignUsers: {},

  listOfImportErrors: [],

  dataExportData: null,

  reportFilterFormDataObject: {},

  reportTitle: "",

  reportFilter: "",

  screenDeviceWidth: "",

  schoolsInDistrictsForStateAndPartner: [],
  partnerLicenses: [], //partner licenses for overview report filter in partner
  licenseDistricts: [], //districts in licenses for overview report filter in partner

  reportPdfData: [],

  schoolAcademicYear: [],
  initialPayloadForReports: {},

  reportInSpanish: false,

  totalCountOfReports : null,
  
};

const districtSlice = createSlice({
  name: "district",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setEmailSettings: (state, action) => {
      state.emailSettings = action.payload;
    },

    setMandateData: (state, action) => {
      state.mandateData = action.payload;
    },
    setTestItemsList: (state, action) => {
      state.testItemsList = action.payload;
    },
    setAddMandate: (state, action) => {
      state.addMandate = action.payload;
    },

    getEmailSettings: (state, action) => {},
    getMandatesData: (state, action) => {},

    setGetDistrictForDistrictAdminResponse: (state, action) => {
      state.getDistrictForDistrictAdminResponse = action.payload;
    },
    setRolesAndPrivilagesByRole: (state, action) => {
      state.rolesAndPrivilagesByRole = action.payload;
    },
    setUpdateRolesAndPrivilages: (state, action) => {
      state.updateRolesAndPrivilages = action.payload;
    },
    setUpdateRolesAndPrivilagesCode: (state, action) => {
      state.updateRolesAndPrivilagesCode = action.payload;
    },
    setDistrictStatistics: (state, action) => {
      state.districtStatistics = action.payload;
    },
    setAccessLogCounts: (state, action) => {
      state.accessLogCounts = action.payload;
    },
    setStatesList: (state, action) => {
      state.statesList = action.payload;
    },
   
    getDistrictForDistrictAdminApiCall: (state, action) => {},
    getMandateData: (state, action) => {},
    getTestItemsList: (state, action) => {},
    postMandate: (state, action) => {},
    updateMandate: (state, action) => {},
    getRolesAndPrivilagesByRole: (state, action) => {},
    updateRolesAndPrivilages: (state, action) => {},
    getDistrictStatistics: (state, action) => {},
    getAccessLogCounts: (state, action) => {},
    // updateMandate:(state,action)=>{},

    getUpdateDistrictForDistrictAdminApiCall: (state, action) => {},

    setUpdateDistrictForDistrictAdminResponse: (state, action) => {
      state.updateDistrictForDistrictAdminResponse = action.payload;
    },

    getNotificationsRecievedApiCall: (state, action) => {},

    setNotificationsRecievedList: (state, action) => {
      state.notificationsRecievedList = action.payload;
    },

    setStudentsListForReports: (state, action) => {
      state.studentsListForReports = action.payload;
    },

    setTotalCountOfReports : (state, action) => {

      state.totalCountOfReports = action.payload;

    },

    getStudentsListForReportsApiCall: (state, action) => {},

    setReportFilterDataObject: (state, action) => {
      state.reportFilterDataObject = action.payload;
    },

    setSelectedStudentUUIDForReport: (state, action) => {
      state.selectedStudentUUIDForReport = action.payload;
    },

    getOverviewReportSummaryByClassApiCall: (state, action) => {},

    setOverviewReportSummaryByClass: (state, action) => {
      state.overviewReportSummaryByClass = action.payload;
    },

    setRunReportButtonClicked: (state, action) => {
      state.runReportButtonClicked = action.payload;
    },

    setEditAnnouncementFormData: (state, action) => {
      state.editAnnouncementFormData = action.payload;
    },

    getApprovalNotificationRequestClicked: (state, action) => {},
    setApproveNotificationRequestClicked: (state, action) => {
      state.notificationApprovalStatus = action.payload;
    },

    deleteAnnoucement: (state, action) => {},
    setDeleteAnnouncement: (state, action) => {
      state.deleteAnnouncementData = action.payload;
    },

    getStatesList: (state, action) => {},

    getMergeUser: (state, action) => {},
    setMergeUser: (state, action) => {
      state.mergeUser = action.payload;
    },
    setAssignAndUnAssignUsers: (state, action) => {
      state.assignAndUnassignUsers = action.payload;
    },
    getAssignAndUnAssignUsers: (state, action) => {},
    changePasswordDA: (state, action) => {},

    getListOfImportErrors: (state, action) => {},
    deleteMandate: (state, action) => {},

    setListOfImportErrors: (state, action) => {
      state.listOfImportErrors = action.payload;
    },

    setDataExportData: (state, action) => {
      state.dataExportData = action.payload;
    },
    getDataExportPFAI: (state, action) => {},

    getCompletionReportApiCall: (state, action) => {},
    getCompletionReportCsvApiCall: (state, action) => {},
    getOverviewReportApiCall: (state, action) => {},

    destroyCompletionReportApiCall: (state, action) => {},

    getDownloadCompletionReportApiCall: (state, action) => {},

    setReportFilterFormDataObject: (state, action) => {
      state.reportFilterFormDataObject = action.payload;
    },

    setReportTitle: (state, action) => {
      state.reportTitle = action.payload;
    },
    setReportFilter: (state, action) => {
      state.reportFilter = action.payload;
    },

    setSchoolsInDistrictsForStateAndPartner: (state, action) => {
      state.schoolsInDistrictsForStateAndPartner = action.payload;
    },
    getSchoolsInDistrictsForStateAndPartner: (state, action) => {},

    setSchoolAcademicYear: (state, action) => {
      state.schoolAcademicYear = action.payload;
    },

    getSchoolAcademicYear: (state, action) => {},

    getDataExportFilter: (state, action) => {},

    getDataExportFilterStateAdmin: (state, action) => {},

    setScreenDeviceWidth: (state, action) => {
      state.screenDeviceWidth = action.payload;
    },
    setReportPdfData: (state, action) => {
      state.reportPdfData = action.payload;
    },
    setInitialPayloadForReports: (state, action) => {
      state.initialPayloadForReports = action.payload;
    },

    setTotalNoOfPages: (state, action) => {
      state.totalNoOfPages = action.payload;
    },
    setPartnerLicenses: (state, action) => {
      state.partnerLicenses = action.payload;
    },
    getPartnerLicenses: (state, action) => {},
    setLicenseDistricts: (state, action) => {
      state.licenseDistricts = action.payload;
    },
    getLicenseDistricts: (state, action) => {},
    getDownloadAllStudentsReportsApi: (state, action) => {},
    getEmailAllStudentsReportsApi: (state, action) => {},
    uploadCsvToSftp: (state, action) => {},
    reset: () => {
      return initialState;
    },
  },
});

export const {
  reset,
  setLoading,
  setMandatesData,
  getMandatesData,
  setGetDistrictForDistrictAdminResponse,
  getDistrictForDistrictAdminApiCall,
  setEmailSettings,
  getEmailSettings,
  getMandateData,
  setMandateData,
  getTestItemsList,
  setTestItemsList,
  postMandate,
  setAddMandate,
  updateMandate,
  getRolesAndPrivilagesByRole,
  setRolesAndPrivilagesByRole,
  setUpdateRolesAndPrivilages,
  updateRolesAndPrivilages,
  setDistrictStatistics,
  getDistrictStatistics,
  setAccessLogCounts,
  getAccessLogCounts,

  getUpdateDistrictForDistrictAdminApiCall,
  setUpdateDistrictForDistrictAdminResponse,

  getNotificationsRecievedApiCall,
  setNotificationsRecievedList,

  setStudentsListForReports,
  getStudentsListForReportsApiCall,

  setReportFilterDataObject,
  setSelectedStudentUUIDForReport,

  getOverviewReportSummaryByClassApiCall,

  setOverviewReportSummaryByClass,

  setRunReportButtonClicked,

  setEditAnnouncementFormData,
  getApprovalNotificationRequestClicked,
  setApproveNotificationRequestClicked,
  deleteAnnoucement,
  setDeleteAnnouncement,
  setStatesList,
  getStatesList,
  getMergeUser,
  setMergeUser,
  getAssignAndUnAssignUsers,
  setAssignAndUnAssignUsers,
  changePasswordDA,

  getListOfImportErrors,
  setListOfImportErrors,
  setUpdateRolesAndPrivilagesCode,

  deleteMandate,
  setDataExportData,
  getDataExportPFAI,
  getDataExportFilter,
  getDataExportFilterStateAdmin,

  setReportFilterFormDataObject,

  setReportTitle,
  setReportFilter,

  setScreenDeviceWidth,

  setReportPdfData,

  getSchoolsInDistrictsForStateAndPartner,
  setSchoolsInDistrictsForStateAndPartner,
  getCompletionReportApiCall,
  getCompletionReportCsvApiCall,
  getOverviewReportApiCall,
  destroyCompletionReportApiCall,
  getDownloadCompletionReportApiCall,

  getSchoolAcademicYear,
  setSchoolAcademicYear,
  setInitialPayloadForReports,
  setTotalNoOfPages,

  getDownloadAllStudentsReportsApi,
  getEmailAllStudentsReportsApi,
  setPartnerLicenses,
  getPartnerLicenses,
  setLicenseDistricts,
  getLicenseDistricts,
  uploadCsvToSftp,

  setTotalCountOfReports,

  
} = districtSlice.actions;

export default districtSlice;
