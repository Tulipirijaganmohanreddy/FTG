import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  licenceLoading: false,
  newDistrict: [],
  updateDistrict: [],
  getSubjects: [],
  addSubject: [],
  updateSubject: [],
  deleteSubject: [],

  deleteSSOConfig: [],
  deleteDistrict: [],
  addSchool: [],
  license: [],
  updatedState: [],
  getAllStatesInfo: [],
  deleteState: [],
  addAdminUser: [],
  editTeacherInfo: [],
  getSchoolsResponse: [],
  getTeachersResponse: [],
  districtData: [],
  districtsSchools: [],
  getDistrictDataByFilter: null,
  updateSchools: [],
  assignAdminToDistrictResponse: [],
  updateAdminUsersResponse: [],
  deleteAdminUserResponse: [],
  schoolAdminsResponse: [],
  ManageUsersResponse: [],
  rolesPrivilegesResponse: [],
  helpDeskPrivilegesResponse: [],
  TeachersAndSchoolsByDistricts: [],
  distrcitIDForDistrict: null,
  schoolBySchoolId: null,
  testsList: [],
  audienceList: [],
  districtAdminsData: [],
  UsersById: [],
  CMSSubjectStatus: [],
  currentCMSContent: [],
  removeSchool: [],
  superAdmins: [],
  helpDeskUsers: [],
  deleteAdminOrHelpDesk: [],
  stateId: [],
  stateName: [],
  fundersList: [],
  licensesList: [],
  licenseData: [],
  updatedLicense: [],
  funderId: "",
  licensedSchools: [],
  deleteLicense: [],
  deleteSchoolLicense: [],
  schoolsToAddLicense: [],
  AddLicenseToSchool: [],
  licenseHistory: [],
  storeFunderType: "",
  emailTemplate: [],
  storeLicenseId: "",
  contactData: [],
  funderName: "",
  licenseStatus: "",
  districtsOrSchoolsByRole: [],
  ContactsList: [],
  emailsToContacts: [],
  emailHistoryData: [],
  deletContactInfo: [],
  CMSResourcesFilterData: null,
  deletedEmailHistory: [],
  emailTemplateResource: [],
  exportLicenseInfo: [],
  uniqueFieldsResponse: null,
  licenseSchoolLimit: 0,
  schoolsAssignedToLicense: 0,
  updateSchoolDate: [],
  licenseStartDate: "",
  licenseEndDate: "",
  districtsForChangeRole: [],
  districtsBySearchInDistrcitLookUp: [],
  districtState: "",
  districtZipcode: "",
  districtSSOID: "",
  districtAdminUsers: null,
  addSchoolRequirements: {},
  updateLicenceByIdCode: "",
  codeUpdate: null,
  stateAdminsList: [],

  ssoConfigDataById: {},

  ssoFiletredDistricts: [],

  stateByFilterData: null,

  licenesesUuids: null,

  statePartnerDataByID: null,

  ssoConfigByFilterData: null,

  ssoFiletredDistricts: [],

  districtsForStateOrPartner: [],
  stateOrPartnerLicencesList: [],

  allContactsList: [],

  superAdminDistrictsOrSchoolSByRole: [],

  districtAdminDistrictsOrSchoolSByRole: [],

  stateAdminDistrictsOrSchoolSByRole: [],

  partnerDistrictsOrSchoolSByRole: [],
  checkLicenseStatus: null,
};

const superAdminSlice = createSlice({
  name: "superAdmin",
  initialState,
  reducers: {
    getNewDistrict: (state, action) => {},
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLicenceLoading: (state, action) => {
      state.licenceLoading = action.payload;
    },
    setNewDistrict: (state, action) => {
      state.newDistrict = action.payload;
    },

    getUpdateDistrict: (state, action) => {},
    setUpdateDistrict: (state, action) => {
      state.updateDistrict = action.payload;
    },

    getCMSContent: (state, action) => {},

    getAllSubjects: (state, action) => {},
    setAllSubjects: (state, action) => {
      state.getSubjects = action.payload;
    },
    AddNewSubject: (state, action) => {},
    setNewSubject: (state, action) => {
      state.addSubject = action.payload;
    },
    getUpdatedCMSSubject: (state, action) => {},
    setUpdatedCMSSubject: (state, action) => {
      state.updateSubject = action.payload;
    },
    deleteCMSSubject: (state, action) => {},
    setDeleteCMSSubject: (state, action) => {
      state.deleteSubject = action.payload;
    },

    getNewSSOConfig: (state, action) => {},

    getDeleteSSOConfigById: (state, action) => {},
    setDeleteSSOConfigById: (state, action) => {
      state.deleteSSOConfig = action.payload;
    },
    getUpdatedSSOConfigById: (state, action) => {},

    getDeletedDistrict: (state, action) => {},
    setDeletedDistrict: (state, action) => {
      state.deleteDistrict = action.payload;
    },

    getSchool: (state, action) => {},
    setSchool: (state, action) => {
      state.addSchool = action.payload;
    },
    addState: (state, action) => {},

    updateState: (state, action) => {},
    setUpdatedState: (state, action) => {
      state.updatedState = action.payload;
    },
    getAllStates: (state, action) => {},
    setAllStates: (state, action) => {
      state.getAllStatesInfo = action.payload;
    },
    DeleteStateById: (state, action) => {},
    setDeleteStateById: (state, action) => {
      state.deleteState = action.payload;
    },

    getAdminUser: (state, action) => {},
    setAdminUser: (state, action) => {
      state.addAdminUser = action.payload;
    },
    getDeletedCMSContentById: (state, action) => {},

    getEditTeacherInfoById: (state, action) => {},
    setEditTeacherInfoById: (state, action) => {
      state.editTeacherInfo = action.payload;
    },
    getAllSchools: (state, action) => {},
    setAllSchools: (state, action) => {
      state.getSchoolsResponse = action.payload;
    },
    getAllTeachers: (state, action) => {},
    setAllTeachers: (state, action) => {
      state.getTeachersResponse = action.payload;
    },

    getDistrictsAdminById: (state, action) => {},
    setDistrictAdminById: (state, action) => {
      state.districtData = action.payload;
    },
    getSchoolsByDistrictId: (state, action) => {},
    setSchoolsByDistrictId: (state, action) => {
      state.districtsSchools = action.payload;
    },
    getDistrictsByFilter: (state, action) => {},
    setDistrictsByFilter: (state, action) => {
      state.getDistrictDataByFilter = action.payload;
    },
    getUpdatedSchoolById: (state, action) => {},
    setUpdatedSchoolById: (state, action) => {
      state.updateSchools = action.payload;
    },
    getAdminToDistrict: (state, action) => {},
    setAdminToDistrict: (state, action) => {
      state.assignAdminToDistrictResponse = action.payload;
    },
    getUpdatedAdminUser: (state, action) => {},
    setUpdatedAdminUser: (state, action) => {
      state.updateAdminUsersResponse = action.payload;
    },
    getDeletedAdminUser: (state, action) => {},
    setDeletedAdminUser: (state, action) => {
      state.deleteAdminUserResponse = action.payload;
    },
    getSchoolAdmins: (state, action) => {},
    setSchoolAdmins: (state, action) => {
      state.schoolAdminsResponse = action.payload;
    },
    getManageUsersData: (state, action) => {},
    setManageUsersData: (state, action) => {
      state.ManageUsersResponse = action.payload;
    },
    getRolesPrivilegesData: (state, action) => {},
    setRolesPrivilegesData: (state, action) => {
      state.rolesPrivilegesResponse = action.payload;
    },
    getHelpDeskPrivilegesData: (state, action) => {},
    setHelpDeskPrivielgesData: (state, action) => {
      state.helpDeskPrivilegesResponse = action.payload;
    },

    setDistrcitIDForDistrict: (state, action) => {
      state.distrcitIDForDistrict = action.payload;
    },

    setSchoolBySchoolId: (state, action) => {
      state.schoolBySchoolId = action.payload;
    },

    getTeachersAndSchoolsByDistrict: (state, action) => {},
    setTeachersAndSchoolsByDistrictId: (state, action) => {
      state.TeachersAndSchoolsByDistricts = action.payload;
    },

    getCMSTestsLists: (state, action) => {},
    setCMSTestsLists: (state, action) => {
      state.testsList = action.payload;
    },

    getCMSAudienceList: (state, action) => {},
    setCMSAudienceList: (state, action) => {
      state.audienceList = action.payload;
    },
    setDistrictsAdminData: (state, action) => {
      state.districtAdminsData = action.payload;
    },
    getUsersById: (state, action) => {},
    setUsersById: (state, action) => {
      state.UsersById = action.payload;
    },
    getCMSSubjectStatus: (state, action) => {},
    setCMSSubjectStatus: (state, action) => {
      state.CMSSubjectStatus = action.payload;
    },
    getUpdatedCMSContent: (state, action) => {},

    setCurrentCMSContent: (state, action) => {
      state.currentCMSContent = action.payload;
    },

    getRemovedSchool: (state, action) => {},
    setRemovedSchool: (state, action) => {
      state.removeSchool = action.payload;
    },

    getSuperAdmins: (state, action) => {},
    setSuperAdmins: (state, action) => {
      state.superAdmins = action.payload;
    },
    getAllHelpDeskUsers: (state, action) => {},
    setAllHelpDeskUsers: (state, action) => {
      state.helpDeskUsers = action.payload;
    },
    getDeletedAdminOrHelpDeskData: (state, action) => {},
    setDeletedAdminOrHelpDeskData: (state, action) => {
      state.deleteAdminOrHelpDesk = action.payload;
    },

    storeStateId: (state, action) => {
      state.stateId = action.payload;
    },
    storeStateName: (state, action) => {
      state.stateName = action.payload;
    },
    getFundersList: (state, action) => {},
    setFundersList: (state, action) => {
      state.fundersList = action.payload;
    },
    createLicenses: (state, action) => {},
    setCreatedLicense: (state, action) => {
      state.license = action.payload;
    },

    getLicenseList: (state, action) => {},
    filterLicenseList: (state, action) => {},
    setLicenseList: (state, action) => {
      state.licensesList = action.payload;
    },

    getLicenseById: (state, action) => {},
    setLicenseById: (state, action) => {
      state.licenseData = action.payload;
    },
    updateLicenseById: (state, action) => {},
    setUpdatedLicenseById: (state, action) => {
      state.updatedLicense = action.payload;
    },
    setFunderId: (state, action) => {
      state.funderId = action.payload;
    },
    getLicensedSchoolInfo: (state, action) => {},
    setLicensedSchoolInfo: (state, action) => {
      state.licensedSchools = action.payload;
    },
    deleteLicenseById: (state, action) => {},
    setDeletedLicenseById: (state, action) => {
      state.deleteLicense = action.payload;
    },
    deleteSchoolLicenseById: (state, action) => {},
    setDeletedSchoolLicenseById: (state, action) => {
      state.deleteSchoolLicense = action.payload;
    },
    getSchoolsToAddLicense: (state, action) => {},
    setSchoolsToAddLicense: (state, action) => {
      state.schoolsToAddLicense = action.payload;
    },
    addLicenseToSchool: (state, action) => {},
    setLicenseToSchool: (state, action) => {
      state.AddLicenseToSchool = action.payload;
    },
    getLicenseHistory: (state, action) => {},
    setLicenseHistory: (state, action) => {
      state.licenseHistory = action.payload;
    },
    setFunderTypeID: (state, action) => {
      state.storeFunderType(action.payload);
    },
    getEmailTemplate: (state, action) => {},
    setEmailTemplate: (state, action) => {
      state.emailTemplate = action.payload;
    },
    setLicenseId: (state, action) => {
      state.storeLicenseId = action.payload;
    },
    addContacts: (state, action) => {},
    setContacts: (state, action) => {
      state.contactData = action.payload;
    },
    setFunderName: (state, action) => {
      state.funderName = action.payload;
    },
    setFunderLicenseStatus: (state, action) => {
      state.licenseStatus = action.payload;
    },

    getAllDistrictorSchoolsByRole: (state, action) => {},

    setAllDistrictorSchoolsByRole: (state, action) => {
      state.districtsOrSchoolsByRole = action.payload;
    },

    getAllContactsForFunderByID: (state, action) => {},
    setAllContactsForFunderByID: (state, action) => {
      state.ContactsList = action.payload;
    },
    sendEmailsToContacts: (state, action) => {},
    setSendEmailsToContacts: (state, action) => {
      state.emailsToContacts = action.payload;
    },
    getEmailHistory: (state, action) => {},
    setEmailHistory: (state, action) => {
      state.emailHistoryData = action.payload;
    },
    deleteContact: (state, action) => {},
    setDeletedContact: (state, action) => {
      state.deletContactInfo = action.payload;
    },
    getResourceFilterData: (state, action) => {},
    setResourceFilterData: (state, action) => {
      state.CMSResourcesFilterData = action.payload;
    },
    deleteEmailHistoryData: (state, action) => {},
    setDeleteEmailHistory: (state, action) => {
      state.deletedEmailHistory = action.payload;
    },
    addCMSEmailTemplateResource: (state, action) => {},
    setCMSEmailTemplateResource: (state, action) => {
      state.emailTemplateResource = action.payload;
    },
    exportLicensesData: (state, action) => {},
    setExportLicensesData: (state, action) => {
      state.exportLicensesData = action.payload;
    },
    checkUniqueFields: (state, action) => {},
    setUniqueFields: (state, action) => {
      state.uniqueFieldsResponse = action.payload;
    },
    setLicensedSchoolLimit: (state, action) => {
      state.licenseSchoolLimit = action.payload;
    },
    setSchoolsAssignedToLicense: (state, action) => {
      state.schoolsAssignedToLicense = action.payload;
    },
    getUpdatedEmailTemplate: (state, action) => {},

    getUpdatedSchoolDate: (state, action) => {},
    setUpdatedSchoolDate: (state, action) => {
      state.updateSchoolDate = action.payload;
    },

    setLicenseStartDate: (state, action) => {
      state.licenseStartDate = action.payload;
    },
    setLicenseEndDate: (state, action) => {
      state.licenseEndDate = action.payload;
    },
    setDistrictsForChangeRole: (state, action) => {
      state.districtsForChangeRole = action.payload;
    },
    setDistrictsBySearchInDistrcitLookUp: (state, action) => {
      state.districtsBySearchInDistrcitLookUp = action.payload;
    },
    getDistrictsForRoleChange: (state, action) => {},
    getDistrictsBySearchInDistrcitLookUp: (state, action) => {},

    getSuperAdminChangeRole: (state, action) => {},

    setDistrictState: (state, action) => {
      state.districtState = action.payload;
    },
    setDistrictZipCode: (state, action) => {
      state.districtZipcode = action.payload;
    },
    setDistrictSSOID: (state, action) => {
      state.districtSSOID = action.payload;
    },
    setDistrictAdminUsers: (state, action) => {
      state.districtAdminUsers = action.payload;
    },
    getDistrictAdminUsers: (state, action) => {},
    setAddSchoolRequirements: (state, action) => {
      state.addSchoolRequirements = action.payload;
    },
    setUpdateLicenceByIdCode: (state, action) => {
      state.updateLicenceByIdCode = action.payload;
    },
    SetCodeUpdate: (state, action) => {
      state.codeUpdate = action.payload;
    },

    setSsoConfigDataById: (state, action) => {
      state.ssoConfigDataById = action.payload;
    },

    getSSOConfigById: (state, action) => {},

    setSsoConfigByFilterData: (state, action) => {
      state.ssoConfigByFilterData = action.payload;
    },

    getSSOConfigByFilterApiCall: (state, action) => {},

    setStateByFilterData: (state, action) => {
      state.stateByFilterData = action.payload;
    },

    setStateAdminsList: (state, action) => {
      state.stateAdminsList = action.payload;
    },
    getStateAdminsList: (state, action) => {},
    setStateOrPartnerLicencesList: (state, action) => {
      state.stateOrPartnerLicencesList = action.payload;
    },

    getStateOrPartnerLicencesList: (state, action) => {},
    getStateByFilterApiCall: (state, action) => {},

    getStateByIdApiCall: (state, action) => {},

    setLicenesesUuids: (state, action) => {
      state.licenesesUuids = action.payload;
    },

    setStatePartnerDataByID: (state, action) => {
      state.statePartnerDataByID = action.payload;
    },

    updateStateByIdApiCall: (state, action) => {},

    setDistrictsForStateOrPartner: (state, action) => {
      state.districtsForStateOrPartner = action.payload;
    },

    getDistrictsForStateOrPartnerApiCall: (state, action) => {},

    getAllContactsApiCall: (state, action) => {},

    setAllContactsList: (state, action) => {
      state.allContactsList = action.payload;
    },
    getMetricsReport: (state, action) => {},

    getExportContactApiCall : (state, action) => {},

    setSuperAdminDistrictsOrSchoolSByRole: (state, action) => {
      state.superAdminDistrictsOrSchoolSByRole = action.payload;
    },

    setDistrictAdminDistrictsOrSchoolSByRole: (state, action) => {
      state.districtAdminDistrictsOrSchoolSByRole = action.payload;
    },

    setStateAdminDistrictsOrSchoolSByRole: (state, action) => {
      state.stateAdminDistrictsOrSchoolSByRole = action.payload;
    },

    setPartnerDistrictsOrSchoolSByRole: (state, action) => {
      state.partnerDistrictsOrSchoolSByRole = action.payload;
    },

    getSuperAdminDistrictsOrSchoolSByRole: (state, action) => {},
    getDistrictAdminDistrictsOrSchoolSByRole: (state, action) => {},
    getStateAdminDistrictsOrSchoolSByRole: (state, action) => {},
    getPartnerDistrictsOrSchoolSByRole: (state, action) => {},

    setCheckLicenseStatus: (state, action) => {
      state.checkLicenseStatus = action.payload;
    },
    checkLicense: (state, action) => {},
    reset: () => {
      return initialState;
    },
  },
});

export const {
  reset,
  setLoading,
  setLicenceLoading,
  getNewDistrict,
  setNewDistrict,
  getUpdateDistrict,
  setUpdateDistrict,
  getCMSContent,

  getAllSubjects,
  setAllSubjects,
  AddNewSubject,
  setNewSubject,
  getUpdatedCMSSubject,
  setUpdatedCMSSubject,
  deleteCMSSubject,
  setDeleteCMSSubject,

  getNewSSOConfig,

  getDeleteSSOConfigById,
  setDeleteSSOConfigById,
  getUpdatedSSOConfigById,
  getDeletedDistrict,
  setDeletedDistrict,
  getSchool,
  setSchool,
  addState,
  updateState,
  setUpdatedState,
  getAllStates,
  setAllStates,
  DeleteStateById,
  setDeleteStateById,

  getAdminUser,
  setAdminUser,
  getDeletedCMSContentById,
  getEditTeacherInfoById,
  setEditTeacherInfoById,
  getAllSchools,
  setAllSchools,
  getAllTeachers,
  setAllTeachers,
  getDistrictsAdminById,
  setDistrictAdminById,
  getSchoolsByDistrictId,
  setSchoolsByDistrictId,
  getDistrictsByFilter,
  setDistrictsByFilter,
  getUpdatedSchoolById,
  setUpdatedSchoolById,
  getAdminToDistrict,
  setAdminToDistrict,
  getUpdatedAdminUser,
  setUpdatedAdminUser,
  getDeletedAdminUser,
  setDeletedAdminUser,
  getSchoolAdmins,
  setSchoolAdmins,
  getManageUsersData,
  setManageUsersData,
  getRolesPrivilegesData,
  setRolesPrivilegesData,
  getHelpDeskPrivilegesData,
  setHelpDeskPrivielgesData,
  setDistrcitIDForDistrict,
  getTeachersAndSchoolsByDistrict,
  setTeachersAndSchoolsByDistrictId,
  setSchoolBySchoolId,
  getCMSTestsLists,
  setCMSTestsLists,
  getCMSAudienceList,
  setCMSAudienceList,
  setDistrictsAdminData,
  getUsersById,
  setUsersById,
  getCMSSubjectStatus,
  setCMSSubjectStatus,
  getUpdatedCMSContent,
  setCurrentCMSContent,
  getRemovedSchool,
  setRemovedSchool,
  getSuperAdmins,
  setSuperAdmins,
  getAllHelpDeskUsers,
  setAllHelpDeskUsers,
  getDeletedAdminOrHelpDeskData,
  setDeletedAdminOrHelpDeskData,
  storeStateId,
  storeStateName,
  getFundersList,
  setFundersList,
  createLicenses,
  setCreatedLicense,
  getLicenseList,
  filterLicenseList,
  setLicenseList,
  getLicenseById,
  setLicenseById,
  updateLicenseById,
  setUpdatedLicenseById,
  setFunderId,
  getLicensedSchoolInfo,
  setLicensedSchoolInfo,
  deleteLicenseById,
  setDeletedLicenseById,
  deleteSchoolLicenseById,
  setDeletedSchoolLicenseById,
  getSchoolsToAddLicense,
  setSchoolsToAddLicense,
  addLicenseToSchool,
  setLicenseToSchool,
  getLicenseHistory,
  setLicenseHistory,
  setFunderTypeID,
  getEmailTemplate,
  setEmailTemplate,
  setLicenseId,
  addContacts,
  setContacts,
  setFunderName,
  setFunderLicenseStatus,
  getAllDistrictorSchoolsByRole,
  setAllDistrictorSchoolsByRole,
  getAllContactsForFunderByID,
  setAllContactsForFunderByID,
  sendEmailsToContacts,
  setSendEmailsToContacts,
  getEmailHistory,
  setEmailHistory,
  deleteContact,
  setDeletedContact,
  getResourceFilterData,
  setResourceFilterData,
  deleteEmailHistoryData,
  setDeleteEmailHistory,
  addCMSEmailTemplateResource,
  setCMSEmailTemplateResource,
  exportLicensesData,
  setExportLicensesData,
  checkUniqueFields,
  setUniqueFields,
  setLicensedSchoolLimit,
  setSchoolsAssignedToLicense,
  getUpdatedEmailTemplate,
  getUpdatedSchoolDate,
  setUpdatedSchoolDate,
  setLicenseEndDate,
  setLicenseStartDate,
  setDistrictsForChangeRole,
  setDistrictsBySearchInDistrcitLookUp,
  getDistrictsForRoleChange,
  getDistrictsBySearchInDistrcitLookUp,
  setDistrictState,
  setDistrictZipCode,
  getSuperAdminChangeRole,
  setDistrictSSOID,
  getDistrictAdminUsers,
  setDistrictAdminUsers,
  setAddSchoolRequirements,
  setUpdateLicenceByIdCode,
  SetCodeUpdate,

  setSsoConfigDataById,
  getSSOConfigById,

  getStateByFilterApiCall,
  setStateByFilterData,

  getStateByIdApiCall,
  setStatePartnerDataByID,

  setLicenesesUuids,

  updateStateByIdApiCall,
  setSsoConfigByFilterData,
  getSSOConfigByFilterApiCall,

  setDistrictsForStateOrPartner,
  getDistrictsForStateOrPartnerApiCall,

  getStateAdminsList,
  setStateAdminsList,

  getStateOrPartnerLicencesList,
  setStateOrPartnerLicencesList,

  getAllContactsApiCall,
  setAllContactsList,

  getMetricsReport,
  getExportContactApiCall,

  setSuperAdminDistrictsOrSchoolSByRole,
  setDistrictAdminDistrictsOrSchoolSByRole,
  setStateAdminDistrictsOrSchoolSByRole,
  setPartnerDistrictsOrSchoolSByRole,

  getSuperAdminDistrictsOrSchoolSByRole,
  getDistrictAdminDistrictsOrSchoolSByRole,
  getStateAdminDistrictsOrSchoolSByRole,
  getPartnerDistrictsOrSchoolSByRole,
  checkLicense,
  setCheckLicenseStatus,
} = superAdminSlice.actions;

export default superAdminSlice;
