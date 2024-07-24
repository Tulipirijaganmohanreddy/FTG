import Papa from "papaparse";
import { call, put, takeLatest, takeEvery } from "redux-saga/effects";

import {
  ActiveInactiveSubject,
  AddCMSContent,
  AddCMSEmailTemplate,
  AddCMSSubject,
  DeleteCMSContentById,
  DeleteCMSSubject,
  GetCMSAudienceList,
  GetCMSSubject,
  GetCMSTestsList,
  getDistrictsForRoleChange,
  getResourcesByFiltersAPI,
  getSuperAdminChangeRole,
  UpdateCMSContent,
  UpdateCMSSubject,
  updateEmailTemplateById,
} from "../../../APIS/SuperAdmin/CMS/cms.service";

import {
  AddAdminUser,
  addNewDistrict,
  AddSchool,
  AssignAdminToDistrictById,
  deleteAdminUserById,
  DeleteDistrictData,
  EditTeacherUser,
  getAdminByDistrictAPI,
  getDistrictAdminUsersToDistrict,
  getDistrictByFilterAPI,
  getExportContact,
  getMetricsReport,
  GetSchoolAdminsBySchoolId,
  getSchoolsApi,
  getSchoolsByDistrictIDAPI,
  GetTeachersAndSchoolsByDistrictId,
  getTeachersAPI,
  GetUniqueFieldsDataAPI,
  GetUsersDataById,
  RemoveSchool,
  updateAdminUsersById,
  UpdateDistrictData,
  updateSchoolById,
} from "../../../APIS/SuperAdmin/Districts/district.service";
import {
  addContactsToLicense,
  addLicenseToSchoolAPI,
  checkLicense,
  createLicenseAPI,
  deleteEmailHistoryById,
  deleteLicenseById,
  deleteLicenseContact,
  deleteSchoolLicense,
  exportLicensesAPI,
  getAllContactsApi,
  getAllContactsForFunderAPI,
  getAllDistrictsOrSchoolBasedOnRoleAPI,
  getAllSchoolsToAddLicenseAPI,
  getEmailHistoryAPI,
  getEmailTemplateForContacts,
  getFundersListAPI,
  getLicenseDataById,
  getLicensedSchoolData,
  getLicenseHistoryByIdAPI,
  getLicensesList,
  sendEmailsToContactsAPI,
  updateLicenseById,
  updateSchoolDateAPI,
} from "../../../APIS/SuperAdmin/Licenses/licenses.service";
import {
  deleteAdminOrHelpDesk,
  getAllSuperAdminHelpDeskUsers,
  getAllSuperAdminsDataAPI,
  getManageUsersData,
} from "../../../APIS/SuperAdmin/ManageUsers/manageUsers.service";
import {
  GetAllAdminPrivileges,
  GetHelpDeskPrivileges,
} from "../../../APIS/SuperAdmin/RolesPrivileges/rolesprivileges.service";
import {
  AddSSOConfig,
  DeleteSSOConfig,
  getSSOConfigByFilterApi,
  getSSoConfigByIdApi,
  updateSSOConfig,
} from "../../../APIS/SuperAdmin/SSOConfiguration/ssoconfig.service";
import {
  AddStates,
  DeleteState,
  GetAllStates,
  getDistrictsForStateOrPartnerApi,
  getStateAdminsById,
  getStateByFilterApi,
  getStateByIdApi,
  getStateOrPartnerLicenses,
  UpdateState,
  updateStateById,
} from "../../../APIS/SuperAdmin/StatesPartners/states.service";
import { setGetDistrictForDistrictAdminResponse } from "../../../DistrictAdminApis/districtAdminSlice";
import {
  setSchoolsForAdmin,
  setSchoolWithSchoolAdmin,
} from "../../../features/authentication/components/schoolAdmin/schoolAdminSlice";
import { setTotalPages, setTotalPages2 } from "../../../features/teacher/teacherSlice";
import { exportData } from "../../../Utilities/utils";
import {
  setCode,
  setCode2,
  setLoading2,
  setLoggedInUserDetails,
  setMessage,
  setToken,
  setUpLoading,
  setUpLoading2,
} from "../../slices/profileSlice";
import {
  setAdminToDistrict,
  setAdminUser,
  setAllContactsForFunderByID,
  setAllContactsList,
  setAllSchools,
  setAllStates,
  setAllSubjects,
  setAllTeachers,
  setCMSAudienceList,
  setCMSSubjectStatus,
  setCMSTestsLists,
  SetCodeUpdate,
  setContacts,
  setCreatedLicense,
  setDeleteCMSSubject,
  setDeletedAdminOrHelpDeskData,
  setDeletedAdminUser,
  setDeletedContact,
  setDeletedDistrict,
  setDeletedLicenseById,
  setDeletedSchoolLicenseById,
  setDeleteEmailHistory,
  setDeleteSSOConfigById,
  setDeleteStateById,
  setDistrictAdminDistrictsOrSchoolSByRole,
  setDistrictAdminUsers,
  setDistrictsByFilter,
  setDistrictsBySearchInDistrcitLookUp,
  setDistrictsForChangeRole,
  setDistrictsForStateOrPartner,
  setEditTeacherInfoById,
  setEmailHistory,
  setEmailTemplate,
  setFundersList,
  setHelpDeskPrivielgesData,
  setLicenceLoading,
  setLicenesesUuids,
  setLicenseById,
  setLicensedSchoolInfo,
  setLicenseHistory,
  setLicenseList,
  setLicenseToSchool,
  setLoading,
  setManageUsersData,
  setNewDistrict,
  setPartnerDistrictsOrSchoolSByRole,
  setRemovedSchool,
  setResourceFilterData,
  setRolesPrivilegesData,
  setSchoolAdmins,
  setSchoolsByDistrictId,
  setSchoolsToAddLicense,
  setSendEmailsToContacts,
  setSsoConfigByFilterData,
  setSsoConfigDataById,
  setStateAdminDistrictsOrSchoolSByRole,
  setStateAdminsList,
  setStateByFilterData,
  setStateOrPartnerLicencesList,
  setStatePartnerDataByID,
  setSuperAdminDistrictsOrSchoolSByRole,
  setSuperAdmins,
  setTeachersAndSchoolsByDistrictId,
  setUniqueFields,
  setUpdatedAdminUser,
  setUpdateDistrict,
  setUpdatedLicenseById,
  setUpdatedSchoolById,
  setUpdatedSchoolDate,
  setUpdatedState,
  setUpdateLicenceByIdCode,
  setUsersById,
  setCheckLicenseStatus,
} from "../../slices/superAdminSlice/superAdminSlice";

function* superAdminAddDistrictAPI(action) {
  try {
    yield put(setUpLoading(true));

    const response = yield call(addNewDistrict, action.payload);
    yield put(setNewDistrict(response?.response?.district));
    yield put(setCode(response?.code));
    yield put(setMessage(response?.message));
    yield put(setUpLoading(false));
  } catch (error) {
    yield put(setUpLoading(false));

    yield put(setCode(error?.response?.data?.code));
    yield put(setMessage(error?.response?.data?.message));
  }
}

function* superAdminUpdateDistrictAPI(action) {
  try {
    yield put(setUpLoading(true));

    const response = yield call(UpdateDistrictData, action.payload);
    yield put(setUpdateDistrict(response));
    yield put(setCode(response?.data?.code));
    yield put(setMessage(response?.data?.message));
    yield put(setUpLoading(false));
  } catch (error) {
    yield put(setMessage(error?.response?.data?.message));
    yield put(setUpLoading(false));
  }
}

function* superAdminDeleteDistrictAPI(action) {
  try {
    yield put(setUpLoading2(true));
    const response = yield call(DeleteDistrictData, action.payload);
    yield put(setDeletedDistrict(response));
    yield put(setCode2(response?.data?.code));
    yield put(setMessage(response?.data?.message));
    yield put(setUpLoading2(false));
  } catch (error) {
    yield put(setUpLoading2(false));
    yield put(setDeletedDistrict(error));
    yield put(setMessage(error?.response?.data?.message));
  }
}

function* superAdminAddCMSContentAPI(action) {
  try {
    yield put(setUpLoading(true));

    const response = yield call(AddCMSContent, action.payload);
    yield put(setCode(response.code));
    yield put(setMessage(response?.message));
    yield put(setUpLoading(false));
  } catch (error) {
    yield put(setMessage(error?.response?.data?.message));
    yield put(setCode(error?.response?.data?.code));
    yield put(setUpLoading(false));
  }
}

function* superAdminAddCMSResourceEmailTemplate(action) {
  try {
    yield put(setUpLoading(true));

    const response = yield call(AddCMSEmailTemplate, action.payload);

    yield put(setCode(response.data.code));
    yield put(setMessage(response?.data?.message));

    yield put(setUpLoading(false));
  } catch (error) {
    yield put(setMessage(error?.response?.data?.message));
    yield put(setCode(error?.response?.data?.code));
    yield put(setUpLoading(false));
  }
}

function* superAdminGetAllCMSSubjectsAPI(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(GetCMSSubject, action.payload);
    yield put(setAllSubjects(response));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setAllSubjects(error));
  }
}

function* superAdminAddSubjectAPI(action) {
  try {
    yield put(setUpLoading2(true));
    const response = yield call(AddCMSSubject, action.payload);

    yield put(setCode2(response.data.code));
    yield put(setMessage(response?.data?.message));
    yield put(setUpLoading2(false));
  } catch (error) {
    yield put(setUpLoading2(false));

    yield put(setMessage(error?.response?.data?.message));
  }
}

function* superAdminUpdateSubjectAPI(action) {
  try {
    yield put(setUpLoading(true));
    const response = yield call(UpdateCMSSubject, action.payload);
    yield put(setCode(response.data.code));
    yield put(setMessage(response?.data?.message));
    yield put(setUpLoading(false));
  } catch (error) {
    yield put(setUpLoading(false));

    yield put(setCode(error?.response?.data?.code));
    yield put(setMessage(error?.response?.data?.message));
  }
}

function* superAdminDeleteCMSSubjectAPI(action) {
  try {
    yield put(setUpLoading2(true));
    const response = yield call(DeleteCMSSubject, action.payload);
    yield put(setCode2(response.data.code));
    yield put(setMessage(response?.data?.message));
    yield put(setUpLoading2(false));
  } catch (error) {
    yield put(setUpLoading2(false));

    //
    yield put(setDeleteCMSSubject(error));
    yield put(setMessage(error?.response?.data?.message));
  }
}

function* superAdminAddNewSSOConfigAPI(action) {
  try {
    yield put(setUpLoading(true));
    const response = yield call(AddSSOConfig, action.payload);
    yield put(setCode(response.code));
    yield put(setMessage(response?.message));
    yield put(setUpLoading(false));
  } catch (error) {
    yield put(setMessage(error?.response?.data?.message));
    yield put(setUpLoading(false));
  }
}

function* superAdminDeleteSSOConfigByIdAPI(action) {
  try {
    const response = yield call(DeleteSSOConfig, action.payload);
    yield put(setDeleteSSOConfigById(response));
    yield put(setCode(response.data.code));
    yield put(setMessage(response?.data?.message));
  } catch (error) {
    //
    yield put(setDeleteSSOConfigById(error));
    yield put(setMessage(error?.response?.data?.message));
  }
}

function* superAdminUpdateSSOConfigByIdAPI(action) {
  try {
    yield put(setUpLoading(true));
    const response = yield call(updateSSOConfig, action.payload);
    yield put(setCode(response.code));
    yield put(setMessage(response?.message));
    yield put(setUpLoading(false));
  } catch (error) {
    //
    yield put(setUpLoading(false));
    yield put(setMessage(error?.response?.data?.message));
  }
}

function* superAdminAddSchoolAPI(action) {
  try {
    yield put(setUpLoading(true));

    const response = yield call(AddSchool, action.payload);
    yield put(setCode(response?.data?.code));
    yield put(setMessage(response?.data?.message));
    yield put(setUpLoading(false));
  } catch (error) {
    yield put(setUpLoading(false));
    yield put(setCode(error?.response?.data?.code));
    yield put(setMessage(error?.response?.data?.message));
  }
}

function* superAdminAddStatesAPI(action) {
  try {
    yield put(setUpLoading(true));
    const response = yield call(AddStates, action.payload);

    yield put(setCode(response?.code));
    yield put(setMessage(response?.message));
    yield put(setUpLoading(false));
  } catch (error) {
    yield put(setUpLoading(false));

    yield put(setMessage(error?.response?.data?.message));
  }
}

function* superAdminUpdateStateAPI(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(UpdateState, action.payload);
    yield put(setUpdatedState(response));
    yield put(setCode(response?.data?.code));
    yield put(setMessage(response?.data?.message));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setUpdatedState(error));
    yield put(setMessage(error?.response?.data?.message));
  }
}

function* superAdminGetAllStatesAPI(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(GetAllStates, action.payload);

    yield put(setAllStates(response?.data?.response));

    yield put(setLoading(false));
  } catch (error) {
    yield put(setAllStates(error));
  }
}

function* superAdminDeleteStateAPI(action) {
  try {
    const response = yield call(DeleteState, action.payload);
    yield put(setDeleteStateById(response));
    yield put(setCode(response?.data?.code));
    yield put(setMessage(response?.data?.message));
  } catch (error) {
    yield put(setDeleteStateById(error));
    yield put(setMessage(error?.response?.data?.message));
  }
}

function* superAdminAddAdminUserAPI(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(AddAdminUser, action.payload);
    yield put(setAdminUser(response));
    yield put(setCode(response?.data?.code));
    yield put(setMessage(response?.data?.message));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setAdminUser(error));
    yield put(setMessage(response?.data?.message));
  }
}

function* superAdminDeleteCMSContentById(action) {
  try {
    yield put(setUpLoading2(true));
    const response = yield call(DeleteCMSContentById, action.payload);
    yield put(setCode(response?.data?.code));
    yield put(setMessage(response?.data?.message));
    yield put(setUpLoading2(false));
  } catch (error) {
    yield put(setUpLoading2(false));
    yield put(setMessage(error?.response?.data?.message));
  }
}

function* superAdminEditTeacherInfoById(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(EditTeacherUser, action.payload);
    yield put(setEditTeacherInfoById(response));
    yield put(setCode(response?.data?.code));
    yield put(setMessage(response?.data?.message));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setEditTeacherInfoById(error));
    yield put(setMessage(response?.data?.message));
  }
}

function* superAdminGetAllSchoolsAPI(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getSchoolsApi, action.payload);
    yield put(setAllSchools(response));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setAllSchools(error));
  }
}

function* superAdminGetAllTeachersAPI(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getTeachersAPI, action.payload);
    yield put(setAllTeachers(response));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setAllTeachers(error));
  }
}

function* superAdminGetAdminByDistrictID(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getAdminByDistrictAPI, action.payload);

    yield put(setGetDistrictForDistrictAdminResponse(response.data.response));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setGetDistrictForDistrictAdminResponse(error));
    yield put(setMessage(error.response.data.message));
  }
}

function* superAdminGetSchoolsbyDistrictId(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getSchoolsByDistrictIDAPI, action.payload);

    yield put(setSchoolsForAdmin(response?.data.response));
    yield put(setTotalPages(response.data.totalNoOfPages));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));

    yield put(setSchoolsByDistrictId(error));
  }
}

function* superAdminGetDistrictsByFilter(action) {
  try {
    yield put(setUpLoading(true));
    const response = yield call(getDistrictByFilterAPI, action.payload);

    yield put(setDistrictsByFilter(response?.data?.response));
    yield put(setTotalPages(response?.data?.totalNoOfPages));
    yield put(setUpLoading(false));
  } catch (error) {
    yield put(setUpLoading(false));

    yield put(setDistrictsByFilter([]));
  }
}

function* superAdminGetUpdatedSchoolByDistrictId(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(updateSchoolById, action.payload);
    yield put(setUpdatedSchoolById(response));
    yield put(setCode(response?.data?.code));
    yield put(setMessage(response?.data?.message));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setUpdatedSchoolById(error));
    yield put(setMessage(error?.response?.data?.message));
  }
}

function* superAdminAssignAdminToDistrict(action) {
  try {
    yield put(setUpLoading(true));
    const response = yield call(AssignAdminToDistrictById, action.payload);
    yield put(setAdminToDistrict(response));
    yield put(setCode(response?.data?.code));
    yield put(setMessage(response?.data?.message));
    yield put(setUpLoading(false));
  } catch (error) {
    yield put(setUpLoading(false));
    yield put(setAdminToDistrict(error));
    yield put(setMessage(error?.response?.data?.message));
  }
}

function* superAdminUpdateAdminUserById(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(updateAdminUsersById, action.payload);
    yield put(setUpdatedAdminUser(response));
    yield put(setCode(response?.data?.code));
    yield put(setMessage(response?.data?.message));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setUpdatedAdminUser(error));
    yield put(setMessage(error?.response?.data?.message));
  }
}

function* superAdminGetDeleteAdminById(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(deleteAdminUserById, action.payload);
    yield put(setDeletedAdminUser(response));
    yield put(setCode(response?.data?.code));
    yield put(setMessage(response?.data?.message));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setDeletedAdminUser(error));
    yield put(setMessage(error?.response?.data?.message));
  }
}

function* superAdminGetAllSchoolAdminsBasedOnSchoolId(action) {
  try {
    yield put(setUpLoading(true));
    const response = yield call(GetSchoolAdminsBySchoolId, action.payload);
    yield put(setSchoolWithSchoolAdmin(response.data.message));
    yield put(setUpLoading(false));
  } catch (error) {
    yield put(setUpLoading(false));
    yield put(setSchoolAdmins(error));
  }
}

function* superAdminGetManageUsersData(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getManageUsersData, action.payload);
    yield put(setManageUsersData(response));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));

    yield put(setManageUsersData(error));
  }
}

function* superAdminGetAllAdminPrivileges(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(GetAllAdminPrivileges, action.payload);
    yield put(setRolesPrivilegesData(response));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setRolesPrivilegesData(error));
  }
}

function* superAdminGetHelpDeskPrivileges(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(GetHelpDeskPrivileges, action.payload);
    yield put(setHelpDeskPrivielgesData(response));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setHelpDeskPrivielgesData(error));
  }
}

function* superAdminGetTeachersAndSchoolsByDistrictId(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(
      GetTeachersAndSchoolsByDistrictId,
      action.payload
    );
    yield put(setTeachersAndSchoolsByDistrictId(response));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setTeachersAndSchoolsByDistrictId(error));
  }
}

function* superAdminGetCMSTestsListAPICall(action) {
  try {
    yield put(setLoading(true));

    const response = yield call(GetCMSTestsList, action.payload);

    yield put(setCMSTestsLists(response));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setCMSTestsLists(error));
  }
}

function* superAdminGetCMSAudienceListAPICall(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(GetCMSAudienceList, action.payload);
    yield put(setCMSAudienceList(response));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setCMSAudienceList(error));
  }
}

function* superAdminGetUsersDataById(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(GetUsersDataById, action.payload);
    yield put(setUsersById(response));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setUsersById(error));
  }
}

function* superAdminUpdateSubjectStatusAPI(action) {
  try {
    yield put(setUpLoading(true));
    const response = yield call(ActiveInactiveSubject, action.payload);
    yield put(setCMSSubjectStatus(response));
    yield put(setCode(response?.data?.code));
    yield put(setMessage(response?.data?.message));
    yield put(setUpLoading(false));
  } catch (error) {
    yield put(setUpLoading(false));
    yield put(setMessage(error?.response?.data?.message));
  }
}

function* superAdminGetUpdatedCMSContent(action) {
  try {
    yield put(setUpLoading(true));
    const response = yield call(UpdateCMSContent, action.payload);
    yield put(setCode(response?.code));
    yield put(setMessage(response?.message));
    yield put(setUpLoading(false));
  } catch (error) {
    yield put(setUpLoading(false));
    yield put(setMessage(error?.response?.data?.message));
    yield put(setCode(error?.response?.data?.code));
  }
}
function* superAdminGetUpdatedCMSEmailTemplate(action) {
  try {
    yield put(setUpLoading(true));
    const response = yield call(updateEmailTemplateById, action.payload);
    yield put(setCode(response?.data?.code));
    yield put(setMessage(response?.data?.message));
    yield put(setUpLoading(false));
  } catch (error) {
    yield put(setUpLoading(false));

    yield put(setMessage(error?.response?.data?.message));
    yield put(setCode(error?.response?.data?.code));
  }
}
function* superAdminGetRemovedSchoolData(action) {
  try {
    yield put(setUpLoading2(true));
    const response = yield call(RemoveSchool, action.payload);
    yield put(setRemovedSchool(response));
    yield put(setCode2(response?.data?.code));
    yield put(setMessage(response?.data?.message));
    yield put(setUpLoading2(false));
  } catch (error) {
    yield put(setUpLoading2(false));
    yield put(setRemovedSchool(error));
    yield put(setMessage(error.response?.data?.message));
  }
}

function* superAdminGetAllSuperAdminsData(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getAllSuperAdminsDataAPI, action.payload);
    yield put(setSuperAdmins(response?.data?.response));
    yield put(setTotalPages(response.data.totalNoOfPages));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setSuperAdmins(error));
    // yield put(setMessage(error.response.data.message));
    yield put(setSuperAdmins([]));
  }
}

function* superAdminGetAllHelpDeskUsersData(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getAllSuperAdminHelpDeskUsers, action.payload);
    yield put(setSuperAdmins(response));
    yield put(setTotalPages(response.data.totalNoOfPages));

    yield put(setLoading(false));
  } catch (error) {
    yield put(setSuperAdmins(error));
  }
}

function* superAdminDeleteAdminOrHelpDesk(action) {
  try {
    const response = yield call(deleteAdminOrHelpDesk, action.payload);
    yield put(setDeletedAdminOrHelpDeskData(response));
    yield put(setCode(response?.data?.code));
    yield put(setMessage(response?.data?.message));
  } catch (error) {
    yield put(setDeletedAdminOrHelpDeskData(error));
    yield put(setMessage(error?.response?.data?.message));
  }
}
function* superAdminGetLicensesFundersList(action) {
  try {
    const response = yield call(getFundersListAPI, action.payload);
    yield put(setFundersList(response?.data?.response));
  } catch (error) {
    yield put(setFundersList(error));
  }
}

function* superAdminCreateLicense(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(createLicenseAPI, action.payload);
    yield put(setCreatedLicense(response));

    yield put(setCode(response?.data?.code));
    yield put(setMessage(response?.data?.message));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setCode(error?.response?.data?.code));
    yield put(setMessage(error?.response?.data?.message));
    yield put(setLoading(false));
  }
}

function* superAdminGetAllLicenses(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getLicensesList, action.payload);

    yield put(setLicenseList(response?.data?.response));

    yield put(setTotalPages(response?.data?.totalNoOfPages));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));

    yield put(setLicenseList(error));
  }
}
function* getFilterLicenseEffect(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getLicensesList, action.payload);

    yield put(setLicenseList(response?.data?.response));

    yield put(setLicenesesUuids(response?.data?.uuids));

    yield put(setTotalPages(response?.data?.totalNoOfPages));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));

    yield put(setLicenseList(error));
  }
}

function* superAdminGetLicenseById(action) {
  try {
    yield put(setLicenceLoading(true));
    const response = yield call(getLicenseDataById, action.payload);
    yield put(setLicenseById(response?.data?.response));
    yield put(setLicenceLoading(false));
  } catch (error) {
    yield put(setLicenceLoading(false));

    yield put(setLicenseById(error));
  }
}

function* superAdminUpdateLicenseById(action) {
  try {
    yield put(setUpLoading(true));
    const response = yield call(updateLicenseById, action.payload);

    yield put(setUpdatedLicenseById(response));
    yield put(setUpdateLicenceByIdCode(response?.data?.code));
    yield put(setCode2(response?.data?.code));

    yield put(setCode(response?.data?.code));

    yield put(setMessage(response?.data?.message));
    yield put(setUpLoading(false));
  } catch (error) {
    yield put(setUpLoading(false));

    yield put(setUpdatedLicenseById(error));
    yield put(setCode(error?.response?.data?.code));
    yield put(setMessage(error?.response?.data?.message));
  }
}

function* superAdminGetLicensedSchools(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getLicensedSchoolData, action.payload);

    yield put(setLicensedSchoolInfo(response?.data?.response));
    yield put(setTotalPages(response?.data?.totalNoOfPages));

    yield put(setLoading(false));
  } catch (error) {
    yield put(setLicensedSchoolInfo(error));
  }
}

function* superAdminGetDeletedLicenseById(action) {
  try {
    yield put(setUpLoading2(true));
    const response = yield call(deleteLicenseById, action.payload);

    yield put(setDeletedLicenseById(response));
    yield put(setCode(response?.data?.code));
    yield put(setMessage(response?.data?.message));
    yield put(setUpLoading2(false));
  } catch (error) {
    yield put(setUpLoading2(false));

    yield put(setDeletedLicenseById(error));
    yield put(setMessage(error?.response?.data?.message));
  }
}

function* superAdminGetDeletedSchoolLicenseById(action) {
  try {
    yield put(setUpLoading2(true));
    const response = yield call(deleteSchoolLicense, action.payload);

    yield put(setDeletedSchoolLicenseById(response?.data?.response));
    yield put(SetCodeUpdate(response?.data?.code));
    yield put(setCode2(response?.data?.code));
    yield put(setMessage(response?.data?.message));
    yield put(setUpLoading2(false));
  } catch (error) {
    yield put(setUpLoading2(false));
    yield put(setDeletedSchoolLicenseById(error));
    yield put(setMessage(error?.response?.data?.message));
  }
}

function* superAdminGetSchoolsToAddLicense(action) {
  try {
    yield put(setLoading2(true));
    const response = yield call(getAllSchoolsToAddLicenseAPI, action.payload);

    console.log(response, "schools response after search")

    yield put(setSchoolsToAddLicense(response?.data?.response));
    yield put(setTotalPages2(response?.data?.totalNoOfPages));
    
    yield put(setLoading2(false));
  } catch (error) {
    yield put(setLoading2(false));
    yield put(setSchoolsToAddLicense(error));
    yield put(setMessage(error?.response?.data?.message));
  }
}

function* superAdminAddLicenseToSchool(action) {
  try {
    yield put(setLoading(true));

    const response = yield call(addLicenseToSchoolAPI, action.payload);

    console.log(response, "responseeeeeeeeeee")

    yield put(setLicenseToSchool(response?.data));
    yield put(SetCodeUpdate(response?.data?.code));
    yield put(setCode2(response?.data?.code));
    yield put(setMessage(response?.data?.message));

    yield put(setDeletedSchoolLicenseById(response?.data?.response));
  } catch (error) {
    yield put(setLicenseToSchool(error));
    yield put(setMessage(error?.response?.data?.message));
    yield put(setLoading(false));
  }
}

function* superAdminGetLicenseHistoryById(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getLicenseHistoryByIdAPI, action.payload);

    yield put(setLicenseHistory(response?.data?.response));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setLicenseHistory(error));
    yield put(setMessage(error?.response?.data?.message));
  }
}

function* superAdminGetEmailTemplateForContact(action) {
  // yield put(setLoading(true));
  try {
    const response = yield call(getEmailTemplateForContacts, action.payload);

    yield put(setEmailTemplate(response?.data?.response));
    // yield put(setLoading(false));
  } catch (error) {
    yield put(setEmailTemplate(error));
    yield put(setMessage(error?.response?.data?.message));
    // yield put(setLoading(false));
  }
}

function* superAdminAddContactsToLicense(action) {
  try {
    yield put(setUpLoading(true));

    const response = yield call(addContactsToLicense, action.payload);

    yield put(setContacts(response));
    yield put(setCode(response?.data?.code));
    yield put(setMessage(response?.data?.message));
    yield put(setUpLoading(false));
  } catch (error) {
    yield put(setUpLoading(false));

    yield put(setContacts(error));
    yield put(setCode(error?.response?.data?.code));
    const contactsErrorMessage =
      error?.response?.data?.response[0]?.email +
      " " +
      error?.response?.data?.message.split("Email ")[1];
    yield put(setMessage(contactsErrorMessage));
    yield put(setLoading(false));
  }
}

function* superAdminGetAllDistrictsOrSchoolSByRole(action) {
  try {
    // yield put(setLoading(true));
    const response = yield call(
      getAllDistrictsOrSchoolBasedOnRoleAPI,
      action.payload
    );
    yield put(setSuperAdminDistrictsOrSchoolSByRole(response?.data?.response));
    // yield put(setLoading(false));
  } catch (error) {
    yield put(setSuperAdminDistrictsOrSchoolSByRole(error));
  }
}

function* districtAdminGetAllDistrictsOrSchoolSByRole(action) {
  try {
    // yield put(setLoading(true));
    const response = yield call(
      getAllDistrictsOrSchoolBasedOnRoleAPI,
      action.payload
    );
    yield put(
      setDistrictAdminDistrictsOrSchoolSByRole(response?.data?.response)
    );
    // yield put(setLoading(false));
  } catch (error) {
    yield put(setDistrictAdminDistrictsOrSchoolSByRole(error));
  }
}

function* stateAdminGetAllDistrictsOrSchoolSByRole(action) {
  try {
    // yield put(setLoading(true));
    const response = yield call(
      getAllDistrictsOrSchoolBasedOnRoleAPI,
      action.payload
    );
    yield put(setStateAdminDistrictsOrSchoolSByRole(response?.data?.response));
    // yield put(setLoading(false));
  } catch (error) {
    yield put(setStateAdminDistrictsOrSchoolSByRole(error));
  }
}

function* partnerGetAllDistrictsOrSchoolSByRole(action) {
  try {
    // yield put(setLoading(true));
    const response = yield call(
      getAllDistrictsOrSchoolBasedOnRoleAPI,
      action.payload
    );
    yield put(setPartnerDistrictsOrSchoolSByRole(response?.data?.response));
    // yield put(setLoading(false));
  } catch (error) {
    yield put(setPartnerDistrictsOrSchoolSByRole(error));
  }
}

function* superAdminGetAllContactsByFunderID(action) {
  try {
    // yield put(setLoading(true));
    yield put(setUpLoading(true));
    const response = yield call(getAllContactsForFunderAPI, action.payload);

    yield put(setAllContactsForFunderByID(response?.data?.response));
    yield put(setUpLoading(false));
  } catch (error) {
    yield put(setUpLoading(false));

    yield put(setAllContactsForFunderByID(error));
  }
}

function* superAdminSendEmailsToContacts(action) {
  try {
    yield put(setUpLoading2(true));
    const response = yield call(sendEmailsToContactsAPI, action.payload);
    yield put(setSendEmailsToContacts(response));
    yield put(setCode(response?.data?.code));
    yield put(setMessage(response?.data?.message));
    yield put(setUpLoading2(false));
  } catch (error) {
    yield put(setSendEmailsToContacts(error));
    yield put(setUpLoading2(false));
  }
}

function* superAdminGetEmailHistoryData(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getEmailHistoryAPI, action.payload);

    yield put(setEmailHistory(response?.data?.response));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setEmailHistory(error));
  }
}

function* superAdminDeleteLicenseContact(action) {
  try {
    yield put(setUpLoading2(true));
    const response = yield call(deleteLicenseContact, action.payload);
    yield put(setDeletedContact(response));
    yield put(setCode(response?.data?.code));
    yield put(setMessage(response?.data?.message));
    yield put(setUpLoading2(false));
  } catch (error) {
    yield put(setUpLoading2(false));

    yield put(setDeletedContact(error));
    yield put(setMessage(error?.response?.data?.message));
  }
}

function* superAdminGetResourcesDataByFilters(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getResourcesByFiltersAPI, action.payload);
    yield put(setResourceFilterData(response?.response));
    yield put(setTotalPages(response?.totalNoOfPages));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setResourceFilterData([]));
  }
}

function* superAdminDeleteEmailHistory(action) {
  try {
    yield put(setUpLoading2(true));
    const response = yield call(deleteEmailHistoryById, action.payload);
    yield put(setDeleteEmailHistory(response));
    yield put(setCode(response?.data?.code));
    yield put(setMessage(response?.data?.message));
    yield put(setUpLoading2(false));
  } catch (error) {
    yield put(setUpLoading2(false));

    yield put(setDeleteEmailHistory(error));
    yield put(setMessage(response?.data?.message));
  }
}

function* superAdminExportLicenses(action) {
  try {
    yield put(setLoading2(true));
    const response = yield call(exportLicensesAPI, action.payload);
    // Convert data to CSV format
    const csvData = Papa.unparse(response);
    exportData(csvData, "Licenses.csv", "text/csv;charset=utf-8;");
    yield put(setLoading2(false));
  } catch (error) {
    yield put(setLoading2(false));

    yield put(setMessage(error?.message));
  }
}

function* superAdminGetUniqueFieldsData(action) {
  try {
    const response = yield call(GetUniqueFieldsDataAPI, action.payload);
    yield put(setUniqueFields(response));
    // yield put(setValidationCode(response?.data?.code));
  } catch (error) {
    // yield put(setValidationCode(error?.response?.data?.code));
    yield put(setUniqueFields(error.response.data.data));
  }
}

function* superAdminGetUpdatedSchoolDate(action) {
  try {
    yield put(setUpLoading(true));
    const response = yield call(updateSchoolDateAPI, action.payload);

    yield put(setUpdatedSchoolDate(response));
    yield put(setCode2(response?.data?.code));
    yield put(setMessage(response?.data?.message));
    yield put(setUpLoading(false));
  } catch (error) {
    yield put(setUpLoading(false));
    yield put(setUpdatedSchoolDate(error));
    yield put(setMessage(error?.response?.data?.message));
  }
}

function* getDistrictsForRoleChangeEffect(action) {
  try {
    const response = yield call(getDistrictsForRoleChange, action.payload);

    yield put(setDistrictsForChangeRole(response?.data?.response));
  } catch (error) {
    // yield put(setCode(error?.data?.code));
    // yield put(setMessage(error?.data?.message));
  }
}

function* getDistrictsBySearchInDistrcitLookUpEffect(action) {
  try {
    const response = yield call(getDistrictsForRoleChange, action.payload);

    yield put(setDistrictsBySearchInDistrcitLookUp(response?.data?.response));
  } catch (error) {
    // yield put(setCode(error?.data?.code));
    // yield put(setMessage(error?.data?.message));
  }
}

function* getSuperAdminChangeRoleEffect(action) {
  try {
    const response = yield call(getSuperAdminChangeRole, action.payload);

    yield put(setToken(response?.data?.response?.token));

    yield put(setLoggedInUserDetails(response?.data?.response));
  } catch (error) {
    // yield put(setCode(error?.data?.code));
    // yield put(setMessage(error?.data?.message));
  }
}
function* getDistrictAdminToDistrictEffect(action) {
  try {
    const response = yield call(
      getDistrictAdminUsersToDistrict,
      action.payload
    );

    yield put(setDistrictAdminUsers(response?.data?.response));
  } catch (error) {}
}

function* getSSoConfigByIdApiEffect(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getSSoConfigByIdApi, action.payload);

    yield put(setSsoConfigDataById(response?.data?.response));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
  }
}

function* getSSOConfigByFilterApiEffect(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getSSOConfigByFilterApi, action.payload);
    yield put(setSsoConfigByFilterData(response?.data?.response));
    yield put(setTotalPages(response.data.totalNoOfPages));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
    yield put(setSsoConfigByFilterData([]));
  }
}

function* getStateByFilterApiEffect(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getStateByFilterApi, action.payload);

    yield put(setStateByFilterData(response?.data?.response));

    yield put(setTotalPages(response.data.totalNoOfPages));

    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
    yield put(setStateByFilterData([]));
  }
}

function* getStateByIdApiEffect(action) {
  try {
    const response = yield call(getStateByIdApi, action.payload);

    yield put(setStatePartnerDataByID(response?.data?.response));
  } catch (error) {}
}

function* updateStateByIdEffect(action) {
  try {
    yield put(setUpLoading(true));
    const response = yield call(updateStateById, action.payload);
    yield put(setCode(response?.code));
    yield put(setMessage(response?.message));
    yield put(setUpLoading(false));
  } catch (error) {
    yield put(setUpLoading(false));
  }
}

function* stateAdminsListEffect(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getStateAdminsById, action.payload);
    yield put(setStateAdminsList(response.data.response));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
    yield put(setMessage(error?.response?.data?.message));
  }
}

function* stateOrPartnerLicencesListEffect(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getStateOrPartnerLicenses, action.payload);
    yield put(setStateOrPartnerLicencesList(response.data.response));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
    yield put(setMessage(error?.response?.data?.message));
  }
}

function* getDistrictsForStateOrPartnerEffect(action) {
  try {
    const response = yield call(
      getDistrictsForStateOrPartnerApi,
      action.payload
    );

    yield put(setDistrictsForStateOrPartner(response?.data?.response));
  } catch (error) {}
}

function* getAllContactsApiEffect(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getAllContactsApi, action.payload);

    yield put(setAllContactsList(response?.data?.response));

    yield put(setTotalPages(response?.data?.totalNoOfPages));

    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
  }
}
function* getMetricsReportEffect(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getMetricsReport, action.payload);
    const csvData = Papa.unparse(response);
    exportData(csvData, "Metric Report.csv", "text/csv;charset=utf-8;");

    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
  }
}

function* getExportContactEffect(action) {
  try {
    yield put(setLoading2(true));
    const response = yield call(getExportContact, action.payload);
    const csvData = Papa.unparse(response);
    exportData(csvData, "Contacts.csv", "text/csv;charset=utf-8;");

    yield put(setLoading2(false));
  } catch (error) {
    yield put(setLoading2(false));
  }
}

function* checkLicenseEffect(action) {
	try {
		const response = yield call(checkLicense, action.payload);
	} catch (error) {
		console.log(error, "error===>");
		yield put(setCheckLicenseStatus(error?.response?.data));
		yield put(setCode(error?.response?.data?.code));
		yield put(setMessage(error?.response?.data?.message));
	}
}

function* superAdminSaga() {
  yield takeLatest("superAdmin/getCMSContent", superAdminAddCMSContentAPI);
  yield takeLatest("superAdmin/getNewDistrict", superAdminAddDistrictAPI);
  yield takeLatest("superAdmin/getUpdateDistrict", superAdminUpdateDistrictAPI);
  yield takeLatest("superAdmin/AddNewSubject", superAdminAddSubjectAPI);
  yield takeLatest("superAdmin/getAllSubjects", superAdminGetAllCMSSubjectsAPI);
  yield takeLatest(
    "superAdmin/getUpdatedCMSSubject",
    superAdminUpdateSubjectAPI
  );
  yield takeLatest(
    "superAdmin/deleteCMSSubject",
    superAdminDeleteCMSSubjectAPI
  );

  yield takeLatest("superAdmin/getNewSSOConfig", superAdminAddNewSSOConfigAPI);

  yield takeLatest(
    "superAdmin/getDeleteSSOConfigById",
    superAdminDeleteSSOConfigByIdAPI
  );
  yield takeLatest(
    "superAdmin/getUpdatedSSOConfigById",
    superAdminUpdateSSOConfigByIdAPI
  );

  yield takeLatest(
    "superAdmin/getDeletedDistrict",
    superAdminDeleteDistrictAPI
  );

  yield takeLatest("superAdmin/getSchool", superAdminAddSchoolAPI);
  yield takeLatest("superAdmin/addState", superAdminAddStatesAPI);
  yield takeLatest("superAdmin/updateState", superAdminUpdateStateAPI);
  yield takeLatest("superAdmin/getAllStates", superAdminGetAllStatesAPI);
  yield takeLatest("superAdmin/DeleteStateById", superAdminDeleteStateAPI);

  yield takeLatest("superAdmin/getAdminUser", superAdminAddAdminUserAPI);
  yield takeLatest(
    "superAdmin/getDeletedCMSContentById",
    superAdminDeleteCMSContentById
  );
  yield takeLatest(
    "superAdmin/getEditTeacherInfoById",
    superAdminEditTeacherInfoById
  );
  yield takeLatest("superAdmin/getAllSchools", superAdminGetAllSchoolsAPI);
  yield takeLatest("superAdmin/getAllTeachers", superAdminGetAllTeachersAPI);
  yield takeLatest(
    "superAdmin/getDistrictsAdminById",
    superAdminGetAdminByDistrictID
  );
  yield takeLatest(
    "superAdmin/getSchoolsByDistrictId",
    superAdminGetSchoolsbyDistrictId
  );
  yield takeLatest(
    "superAdmin/getDistrictsByFilter",
    superAdminGetDistrictsByFilter
  );
  yield takeLatest(
    "superAdmin/getUpdatedSchoolById",
    superAdminGetUpdatedSchoolByDistrictId
  );
  yield takeLatest(
    "superAdmin/getAdminToDistrict",
    superAdminAssignAdminToDistrict
  );
  yield takeLatest(
    "superAdmin/getUpdatedAdminUser",
    superAdminUpdateAdminUserById
  );
  yield takeLatest(
    "superAdmin/getDeletedAdminUser",
    superAdminGetDeleteAdminById
  );
  yield takeLatest(
    "superAdmin/getSchoolAdmins",
    superAdminGetAllSchoolAdminsBasedOnSchoolId
  );
  yield takeLatest(
    "superAdmin/getManageUsersData",
    superAdminGetManageUsersData
  );
  yield takeLatest(
    "superAdmin/getRolesPrivilegesData",
    superAdminGetAllAdminPrivileges
  );
  yield takeLatest(
    "superAdmin/getHelpDeskPrivilegesData",
    superAdminGetHelpDeskPrivileges
  );
  yield takeLatest(
    "superAdmin/getTeachersAndSchoolsByDistrict",
    superAdminGetTeachersAndSchoolsByDistrictId
  );

  yield takeLatest(
    "superAdmin/getCMSTestsLists",
    superAdminGetCMSTestsListAPICall
  );
  yield takeLatest(
    "superAdmin/getCMSAudienceList",
    superAdminGetCMSAudienceListAPICall
  );
  yield takeLatest("superAdmin/getUsersById", superAdminGetUsersDataById);
  yield takeLatest(
    "superAdmin/getCMSSubjectStatus",
    superAdminUpdateSubjectStatusAPI
  );
  yield takeLatest(
    "superAdmin/getUpdatedCMSContent",
    superAdminGetUpdatedCMSContent
  );
  yield takeLatest(
    "superAdmin/getRemovedSchool",
    superAdminGetRemovedSchoolData
  );
  yield takeLatest(
    "superAdmin/getSuperAdmins",
    superAdminGetAllSuperAdminsData
  );
  yield takeLatest(
    "superAdmin/getAllHelpDeskUsers",
    superAdminGetAllHelpDeskUsersData
  );
  yield takeLatest(
    "superAdmin/getDeletedAdminOrHelpDeskData",
    superAdminDeleteAdminOrHelpDesk
  );
  yield takeLatest(
    "superAdmin/getFundersList",
    superAdminGetLicensesFundersList
  );
  yield takeLatest("superAdmin/createLicenses", superAdminCreateLicense);
  yield takeLatest("superAdmin/getLicenseList", superAdminGetAllLicenses);
  yield takeLatest("superAdmin/filterLicenseList", getFilterLicenseEffect);
  yield takeLatest("superAdmin/getLicenseById", superAdminGetLicenseById);
  yield takeLatest("superAdmin/updateLicenseById", superAdminUpdateLicenseById);
  yield takeLatest(
    "superAdmin/getLicensedSchoolInfo",
    superAdminGetLicensedSchools
  );
  yield takeLatest(
    "superAdmin/deleteLicenseById",
    superAdminGetDeletedLicenseById
  );
  yield takeLatest(
    "superAdmin/deleteSchoolLicenseById",
    superAdminGetDeletedSchoolLicenseById
  );
  yield takeLatest(
    "superAdmin/getSchoolsToAddLicense",
    superAdminGetSchoolsToAddLicense
  );
  yield takeLatest(
    "superAdmin/addLicenseToSchool",
    superAdminAddLicenseToSchool
  );
  yield takeLatest(
    "superAdmin/getLicenseHistory",
    superAdminGetLicenseHistoryById
  );
  yield takeLatest(
    "superAdmin/getEmailTemplate",
    superAdminGetEmailTemplateForContact
  );
  yield takeLatest("superAdmin/addContacts", superAdminAddContactsToLicense);
  yield takeLatest(
    "superAdmin/getAllDistrictorSchoolsByRole",
    superAdminGetAllDistrictsOrSchoolSByRole
  );
  yield takeLatest(
    "superAdmin/getAllContactsForFunderByID",
    superAdminGetAllContactsByFunderID
  );
  yield takeLatest(
    "superAdmin/sendEmailsToContacts",
    superAdminSendEmailsToContacts
  );
  yield takeLatest("superAdmin/getEmailHistory", superAdminGetEmailHistoryData);
  yield takeLatest("superAdmin/deleteContact", superAdminDeleteLicenseContact);
  yield takeLatest(
    "superAdmin/getResourceFilterData",
    superAdminGetResourcesDataByFilters
  );
  yield takeLatest(
    "superAdmin/deleteEmailHistoryData",
    superAdminDeleteEmailHistory
  );
  yield takeLatest(
    "superAdmin/addCMSEmailTemplateResource",
    superAdminAddCMSResourceEmailTemplate
  );
  yield takeLatest("superAdmin/exportLicensesData", superAdminExportLicenses);
  yield takeEvery(
    "superAdmin/checkUniqueFields",
    superAdminGetUniqueFieldsData
  );
  yield takeLatest(
    "superAdmin/getUpdatedEmailTemplate",
    superAdminGetUpdatedCMSEmailTemplate
  );
  yield takeLatest(
    "superAdmin/getUpdatedSchoolDate",
    superAdminGetUpdatedSchoolDate
  );

  yield takeLatest(
    "superAdmin/getDistrictsForRoleChange",
    getDistrictsForRoleChangeEffect
  );
  yield takeLatest(
    "superAdmin/getDistrictsBySearchInDistrcitLookUp",
    getDistrictsBySearchInDistrcitLookUpEffect
  );
  yield takeLatest(
    "superAdmin/getSuperAdminChangeRole",
    getSuperAdminChangeRoleEffect
  );

  yield takeLatest(
    "superAdmin/getDistrictAdminUsers",
    getDistrictAdminToDistrictEffect
  );

  yield takeLatest("superAdmin/getSSOConfigById", getSSoConfigByIdApiEffect),
    yield takeLatest(
      "superAdmin/getStateByFilterApiCall",
      getStateByFilterApiEffect
    ),
    yield takeLatest("superAdmin/getStateByIdApiCall", getStateByIdApiEffect);

  yield takeLatest("superAdmin/updateStateByIdApiCall", updateStateByIdEffect);

  yield takeLatest(
    "superAdmin/getSSOConfigByFilterApiCall",
    getSSOConfigByFilterApiEffect
  );

  yield takeLatest(
    "superAdmin/getDistrictsForStateOrPartnerApiCall",
    getDistrictsForStateOrPartnerEffect
  );
  yield takeLatest("superAdmin/getStateAdminsList", stateAdminsListEffect);
  yield takeLatest(
    "superAdmin/getStateOrPartnerLicencesList",
    stateOrPartnerLicencesListEffect
  );

  yield takeLatest("superAdmin/getAllContactsApiCall", getAllContactsApiEffect);

  yield takeLatest(
    "superAdmin/getDistrictsForStateOrPartnerApiCall",
    getDistrictsForStateOrPartnerEffect
  );
  yield takeLatest("superAdmin/getStateAdminsList", stateAdminsListEffect);
  yield takeLatest("superAdmin/getMetricsReport", getMetricsReportEffect);
  yield takeLatest(
    "superAdmin/getExportContactApiCall",
    getExportContactEffect
  );
  yield takeLatest(
    "superAdmin/getStateOrPartnerLicencesList",
    stateOrPartnerLicencesListEffect
  );

  yield takeLatest(
    "superAdmin/getSuperAdminDistrictsOrSchoolSByRole",
    superAdminGetAllDistrictsOrSchoolSByRole
  );

  yield takeLatest(
    "superAdmin/getDistrictAdminDistrictsOrSchoolSByRole",
    districtAdminGetAllDistrictsOrSchoolSByRole
  );

  yield takeLatest(
    "superAdmin/getStateAdminDistrictsOrSchoolSByRole",
    stateAdminGetAllDistrictsOrSchoolSByRole
  );

  yield takeLatest(
    "superAdmin/getPartnerDistrictsOrSchoolSByRole",
    partnerGetAllDistrictsOrSchoolSByRole
  );
  yield takeLatest("superAdmin/checkLicense", checkLicenseEffect);
}

export default superAdminSaga;
