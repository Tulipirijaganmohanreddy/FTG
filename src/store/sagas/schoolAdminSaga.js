import Papa from "papaparse";
import { call, put, takeLatest } from "redux-saga/effects";

import {
	addAnnouncement,
	addUpdateImportSettingsApi,
	addUserApi,
	classAction,
	createMappingObjectApi,
	createSchoolAdminApi,
	editTeacherApi,
	editUserProfileApi,
	exportErrors,
	exportImportHistory,
	getAddClassToManageClasses,
	getAddStudentToClassApi,
	getAddTeacherToManageClass,
	getAddToStudentTable,
	getClassByIDApi,
	getCsvFileColumnNamesApi,
	getExportClasses,
	getExportUsers,
	getFTPDetails,
	getImportHistoryApi,
	getImportSettingsApi,
	getManageAnnouncements,
	getManageUsersAssignmentApi,
	getMapObjDetailsByIdApi,
	getMappingObjectListApi,
	getSchoolAdminGetAllClasses,
	getSchoolAdminStudentByClasses,
	getSchoolWithSchoolAdminApi,
	getSchoolsApi,
	getStudentDataSchoolAdminAPi,
	getStudentInfoBasedOnSchoolApi,
	getTablesByIdApi,
	getTeacherByIdApi,
	getTeachersBySchoolApi,
	getTeachersBySchoolsApi,
	getTeachersForLoginUserApi,
	getTeachersListByClassIdApi,
	getUserRolesListForManageUsersApi,
	getaddTeacherToClassApi,
	previewCsvApi,
	removeAdminFromDistrictApi,
	removeMappingObjectsApi,
	removeSchoolAdminFromSchoolApi,
	requestToAddAdminForSchoolApi,
	rollBackImportDataApi,
	searchMapping,
	updateAnnouncement,
	updateClassByIDApi,
	updateImportsEmailStatus,
	updateSchoolApi,
	updateUsersApi,
	uploadCsvToDBApi,
	usersAction,
} from "../../APIS/SchoolAdmin/school.service";
import { exportData } from "../../Utilities/utils";
import {
	setAddResCode,
	setAddStudentToAll,
	setAddStudentToClassApiResponse,
	setAddTeacherToClass,
	setAddTeacherToManageClassApiResponse,
	setCreateMappingObject,
	setCreateSchoolAdmin,
	setCsvColumnsNames,
	setEditTeacher,
	setEditUserResponse,
	setFTPDetails,
	setGetImportHistory,
	setGetImportSettings,
	setGetMapObjDetailsById,
	setGetMappingObjectList,
	setGetTablesById,
	setGetTeacherById,
	setLoading,
	setManageAnnouncementData,
	setManageUsersAssignmentApiResponse,
	setPreviewCsv,
	setRemoveAdminFromDistrict,
	setRemoveMappingObjects,
	setRemoveSchoolAdminFromSchool,
	setRequestToAddAdminForSchool,
	setResponseCode,
	setRollBackImportData,
	setSchoolAdminAddToTeacherClasses,
	setSchoolAdminGetAllClasses,
	setSchoolAdminGetStudentByClassResponse,
	setSchoolAdminStudentByClasses,
	setSchoolWithSchoolAdmin,
	setSchoolsForAdmin,
	setSearchedMappings,
	setSelectedClassDetails,
	setStudentInfoBasedOnSchool,
	setTeachersBySchool,
	setTeachersListByClassId,
	setTeachersListBySchools,
	setTeachersListForEvents,
	setUpdateClassByIdResponse,
	setUpdateSchool,
	setUploadCsvToDB,
	setUserRolesList,
} from "../../features/authentication/components/schoolAdmin/schoolAdminSlice";
import { setTotalPages } from "../../features/teacher/teacherSlice";
import {
	setCode,
	setErrorResponse,
	setMessage,
	setUpLoading,
	setUpLoading2,
} from "../slices/profileSlice";

function* getSchoolAdminGetAllClassesEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getSchoolAdminGetAllClasses, action.payload);

		yield put(setSchoolAdminGetAllClasses(response.data.response));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
	}
}

function* getSchoolAdminStudentAPIByClassEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getSchoolAdminStudentByClasses, action.payload);

		yield put(setSchoolAdminStudentByClasses(response.data.response));

		yield put(setTotalPages(response.data.totalNoOfPages));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));

		yield put(setErrorResponse(error.response.data.message));
	}
}

function* getSchoolAdminTeacherToClassEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(
			getSchoolAdminAddToTeacherClass,
			action.payload,
		);

		yield put(setSchoolAdminAddToTeacherClasses(response.data.response));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
	}
}

function* getStudentSchoolAdminDataAPICALL(action) {
	try {
		const response = yield call(getStudentDataSchoolAdminAPi, action.payload);

		yield put(setSchoolAdminGetStudentByClassResponse(response));
	} catch (error) {}
}

function* getAddTeacherToManageClassesEffect(action) {
	try {
		yield put(setUpLoading(true));

		const response = yield call(getAddTeacherToManageClass, action.payload);

		yield put(setAddTeacherToManageClassApiResponse(response));
		yield put(setCode(response.data.code));
		yield put(setMessage(response.data.message));
		yield put(setUpLoading(false));
	} catch (error) {
		yield put(setUpLoading(false));
		yield put(setMessage(error.response.data.message));
	}
}

function* getAddStudentToClassApiEffect(action) {
	try {
		yield put(setUpLoading(true));

		const response = yield call(getAddStudentToClassApi, action.payload);

		yield put(setAddStudentToClassApiResponse(response));
		yield put(setCode(response.data.code));
		yield put(setMessage(response.data.message));
		yield put(setUpLoading(false));
	} catch (error) {
		yield put(setUpLoading(false));

		yield put(setMessage(error.response.data.message));
	}
}

function* getManageUsersAssignmentApiEffect(action) {
	try {
		const response = yield call(getManageUsersAssignmentApi, action.payload);

		yield put(setManageUsersAssignmentApiResponse(response));
	} catch (error) {}
}

function* getAddStudentsAllEffect(action) {
	try {
		const response = yield call(getAddToStudentTable, action.payload);

		yield put(setAddStudentToAll(response));
	} catch (error) {}
}

function* getTeachersListByClassIdEffect(action) {
	try {
		yield put(setLoading(true));

		const response = yield call(getTeachersListByClassIdApi, action.payload);

		yield put(setTeachersListByClassId(response?.data?.response));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
	}
}

function* getSchoolsApicallEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getSchoolsApi, action.payload);

		yield put(setSchoolsForAdmin(response?.data?.response));
		yield put(setTotalPages(response.data.totalNoOfPages));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
	}
}

function* getSchoolWithSchoolAdminEffect(action) {
	try {
		yield put(setLoading(true));

		const response = yield call(getSchoolWithSchoolAdminApi, action.payload);
		yield put(setSchoolWithSchoolAdmin(response?.data?.response));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setMessage(error?.response?.data?.message));
		yield put(setSchoolWithSchoolAdmin({}));
	}
}

function* getTeachersBySchoolEffect(action) {
	try {
		const response = yield call(getTeachersBySchoolApi, action.payload);
		yield put(setTeachersBySchool(response?.data?.response));

		yield put(setTotalPages(response.data.totalNoOfPages));
	} catch (error) {
		yield put(setMessage(error.response.data.message));
		yield put(setTeachersBySchool([]));
	}
}
function* getTeachersBySchoolForAddTeacherToClassModalEffect(action) {
	try {
		const response = yield call(getTeachersBySchoolApi, action.payload);
		yield put(setTeachersBySchool(response?.data?.response));
	} catch (error) {
		yield put(setMessage(error.response.data.message));
		yield put(setTeachersBySchool([]));
	}
}

function* getAddTeacherToClassEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getaddTeacherToClassApi, action.payload);
		yield put(setAddTeacherToClass(response));

		yield put(setCode(response.data.code));

		yield put(setMessage(response.data.message));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));

		yield put(setMessage(error.response.data.message));
	}
}

function* getRequestToAddAdminForSchoolEffect(action) {
	try {
		yield put(setUpLoading2(true));
		const response = yield call(requestToAddAdminForSchoolApi, action.payload);

		yield put(setRequestToAddAdminForSchool(response));

		yield put(setCode(response.data.code));

		yield put(setMessage(response.data.message));
		yield put(setUpLoading2(false));
	} catch (error) {
		yield put(setUpLoading(false));
		yield put(setMessage(error.response.data.message));
	}
}

function* getUpdateSchoolApiEffect(action) {
	try {
		yield put(setUpLoading(true));

		const response = yield call(updateSchoolApi, action.payload);
		yield put(setUpdateSchool(response?.data));
		yield put(setCode(response?.data?.code));

		yield put(setMessage(response.data.message));
		yield put(setUpLoading(false));
	} catch (error) {
		yield put(setUpLoading(false));
		yield put(setMessage(error.response.data.message));
	}
}

function* AddAnnouncementApi(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(addAnnouncement, action.payload);

		yield put(setCode(response.data.code));

		yield put(setMessage(response.data.message));

		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setMessage(error.response.data.message));
	}
}

function* updateAnnouncementApi(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(updateAnnouncement, action.payload);
		yield put(setResponseCode(response?.code));

		yield put(setCode(response.code));

		yield put(setMessage(response.message));

		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setMessage(error.response.data.message));
	}
}

function* ManageAnnouncement(action) {
	try {
		yield put(setLoading(true));

		const response = yield call(getManageAnnouncements, action.payload);
		yield put(setManageAnnouncementData(response?.data?.response));

		yield put(setTotalPages(response.data.totalNoOfPages));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setMessage(error?.response?.data?.message));
		yield put(setManageAnnouncementData([]));
	}
}

function* getAddClassToManageClassesEffect(action) {
	try {
		yield put(setUpLoading(true));
		const response = yield call(getAddClassToManageClasses, action.payload);

		yield put(setCode(response.code));

		yield put(setMessage(response.message));

		yield put(setUpLoading(false));
	} catch (error) {
		yield put(setUpLoading(false));

		yield put(setMessage(error.response.data.message));
	}
}

function* getCreateSchoolAdminApiEffect(action) {
	try {
		const response = yield call(createSchoolAdminApi, action.payload);
		yield put(setCreateSchoolAdmin(response));
		yield put(setAddResCode(response?.data?.code));
	} catch (error) {}
}

function* getEditTeacherApiEffect(action) {
	try {
		const response = yield call(editTeacherApi, action.payload);
		yield put(setEditTeacher(response));
		yield put(setResponseCode(response?.data?.code));
	} catch (error) {}
}

function* getTeacherByIdApiEffect(action) {
	try {
		const response = yield call(getTeacherByIdApi, action.payload);
		yield put(setGetTeacherById(response?.data?.response));
	} catch (error) {}
}

function* getUserRolesListForManageUsersApiEffect(action) {
	try {
		yield put(setLoading(true));

		const response = yield call(
			getUserRolesListForManageUsersApi,
			action.payload,
		);

		yield put(setUserRolesList(response?.data?.response));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setMessage(error?.response?.data?.message));
		yield put(setUserRolesList([]));
	}
}

function* addUsersApiEffect(action) {
	try {
		yield put(setUpLoading(true));
		const response = yield call(addUserApi, action.payload);

		yield put(setCode(response.data.code));

		yield put(setMessage(response.data.message));
		yield put(setUpLoading(false));
	} catch (error) {
		yield put(setUpLoading(false));
		yield put(setMessage(error.response.data.message));
	}
}

function* getTeachersBySchoolsApiEffect(action) {
	try {
		const response = yield call(getTeachersBySchoolsApi, action.payload);

		yield put(setTeachersListBySchools(response?.data?.response));
	} catch (error) {}
}

function* getStudentInfoBasedOnSchoolApiCall(action) {
	try {
		const response = yield call(getStudentInfoBasedOnSchoolApi, action.payload);

		yield put(setStudentInfoBasedOnSchool(response?.data?.response));
	} catch (error) {}
}


function* getTeachersForLoginUserApiEffect(action){

	try{
		const response = yield call(getTeachersForLoginUserApi, action.payload);

		yield put(setTeachersListForEvents(response?.data?.response))
	}
	catch(error){
	}
}




function* getClassByIDApiCallEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getClassByIDApi, action.payload);

		yield put(setSelectedClassDetails(response?.data?.response));

		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));

		yield put(setErrorResponse(error.response.data.message));
	}
}

function* updateClassByIDApiCallEffect(action) {
	try {
		yield put(setUpLoading(true));
		const response = yield call(updateClassByIDApi, action.payload);

		yield put(setUpdateClassByIdResponse(response));
		yield put(setCode(response.data.code));

		yield put(setMessage(response.data.message));

		yield put(setUpLoading(false));
	} catch (error) {
		yield put(setUpLoading(false));

		yield put(setMessage(error.response.data.message));
	}
}

function* removeSchoolAdminFromSchoolApiEffect(action) {
	try {
		yield put(setUpLoading2(true));

		const response = yield call(removeSchoolAdminFromSchoolApi, action.payload);

		yield put(setRemoveSchoolAdminFromSchool(response));

		yield put(setCode(response.data.code));

		yield put(setMessage(response.data.message));
		yield put(setUpLoading2(false));
	} catch (error) {
		yield put(setUpLoading2(false));
		yield put(setMessage(error?.response?.data?.message));
	}
}

function* removeAdminFromDistrictApiEffect(action) {
	try {
		yield put(setUpLoading2(true));

		const response = yield call(removeAdminFromDistrictApi, action.payload);

		yield put(setRemoveAdminFromDistrict(response));

		yield put(setCode(response.data.code));

		yield put(setMessage(response.data.message));
		yield put(setUpLoading2(false));
	} catch (error) {
		yield put(setUpLoading2(false));
		yield put(setMessage(error?.response?.data?.message));
	}
}

function* updateUsersApiEffect(action) {
	try {
		yield put(setUpLoading(true));
		const response = yield call(updateUsersApi, action.payload);
		yield put(setCode(response.code));
		yield put(setMessage(response.message));
		yield put(setUpLoading(false));
	} catch (error) {
		yield put(setUpLoading(false));
		yield put(setMessage(error.response.data.message));
	}
}

function* getCsvFileColumnNamesEffect(action) {
	try {
		yield put(setLoading(true));

		const response = yield call(getCsvFileColumnNamesApi, action.payload);
		yield put(setCsvColumnsNames(response?.data?.response));

		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setMessage(error?.response?.data?.message));
		yield put(setCsvColumnsNames([]));
	}
}

function* getExportUsersEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getExportUsers, action.payload);
		// Convert data to CSV format
		const csvData = Papa.unparse(response);
		exportData(csvData, "users.csv", "text/csv;charset=utf-8;");
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setMessage(error?.message));
	}
}

function* getExportClassesEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getExportClasses, action.payload);
		// Convert data to CSV format
		const csvData = Papa.unparse(response);
		exportData(csvData, "classes.csv", "text/csv;charset=utf-8;");
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setMessage(error?.message));
	}
}

function* exportImportHistoryEffect(action) {
	try {
		yield put(setUpLoading(true));
		const response = yield call(exportImportHistory, action.payload);
		// Convert data to CSV format
		const csvData = Papa.unparse(response);
		exportData(csvData, "import history.csv", "text/csv;charset=utf-8;");
		yield put(setUpLoading(false));
	} catch (error) {
		yield put(setUpLoading(false));

		yield put(setMessage(error?.message));
	}
}

function* getCreateMappingObjectEffect(action) {
	try {
		yield put(setUpLoading(true));

		const response = yield call(createMappingObjectApi, action.payload);
		yield put(setCreateMappingObject(response));

		yield put(setCode(response.data.code));

		yield put(setMessage(response.data.message));
		yield put(setUpLoading(false));
	} catch (error) {
		yield put(setUpLoading(false));
		yield put(setMessage(error?.response?.data?.message));
	}
}

function* getMappingObjectListEffect(action) {
	try {
		yield put(setLoading(true));

		const response = yield call(getMappingObjectListApi, action.payload);
		yield put(setGetMappingObjectList(response?.data?.response));

		yield put(setTotalPages(response.data.totalNoOfPages));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setMessage(error?.response?.data?.message));
		yield put(setGetMappingObjectList([]));
	}
}

function* removeMappingObjectsEffect(action) {
	try {
		yield put(setUpLoading2(true));

		const response = yield call(removeMappingObjectsApi, action.payload);
		yield put(setRemoveMappingObjects(response));

		yield put(setCode(response.data.code));

		yield put(setMessage(response.data.message));
		yield put(setUpLoading2(false));
	} catch (error) {
		yield put(setUpLoading2(false));
		yield put(setMessage(error?.response?.data?.message));
		yield put(setCode(error?.response?.data?.code));
	}
}

function* getTablesByIdEffect(action) {
	try {
		yield put(setLoading(true));

		const response = yield call(getTablesByIdApi, action.payload);
		yield put(setGetTablesById(response));

		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setMessage(error?.response?.data?.message));
		yield put(setGetTablesById([]));
	}
}

function* getMapObjDetailsByIdEffect(action) {
	try {
		const response = yield call(getMapObjDetailsByIdApi, action.payload);
		yield put(setGetMapObjDetailsById(response));
	} catch (error) {}
}

function* getImportHistoryEffect(action) {
	try {
		yield put(setLoading(true));

		const response = yield call(getImportHistoryApi, action.payload);
		yield put(setGetImportHistory(response?.response));
		yield put(setTotalPages(response?.totalNoOfPages));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setMessage(error?.response?.data?.message));
		yield put(setGetImportHistory([]));
	}
}

function* getImportSettingsEffect(action) {
	try {
		// yield put(setLoading(true));

		const response = yield call(getImportSettingsApi, action.payload);
		yield put(setGetImportSettings(response?.data?.response));

		// || {
		//   update_details_status: false,
		//   type_of_import_status: false,
		// },

		// yield put(setLoading(false));
	} catch (error) {
		// yield put(setLoading(false));
		yield put(setMessage(error?.response?.data?.message));
		yield put(setGetImportSettings({}));
	}
}

function* addUpdateImportSettingsEffect(action) {
	try {
		yield put(setUpLoading(true));

		const response = yield call(addUpdateImportSettingsApi, action.payload);
		// yield put(setAddUpdateImportSetting(response));

		yield put(setCode(response.data.code));
		yield put(setMessage(response.data.message));
		yield put(setUpLoading(false));
	} catch (error) {
		yield put(setUpLoading(false));
		yield put(setMessage(error?.response?.data?.message));
		yield put(setCode(error?.response?.data?.code));
	}
}

function* rollBackImportDataEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(rollBackImportDataApi, action.payload);
		yield put(setRollBackImportData(response));
		yield put(setCode(response.data.code));
		yield put(setMessage(response.data.response));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setMessage(error?.response?.data?.message));
	}
}

function* previewCsvEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(previewCsvApi, action.payload);
		yield put(setPreviewCsv(response?.data?.response));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setMessage(error?.response?.data?.message));
	}
}
function* exportErrorsEffect(action) {
	try {
		yield put(setLoading(true));

		const response = yield call(exportErrors, action.payload);
		const csvData = Papa.unparse(response);
		exportData(csvData, "Errors.csv", "text/csv;charset=utf-8;");
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
	}
}
function* searchMappingEffect(action) {
	try {
		const response = yield call(searchMapping, action.payload);
		yield put(setSearchedMappings(response.data.response));
	} catch (error) {
		yield put(setMessage(error?.response?.data?.message));
		yield put(setSearchedMappings([]));
	}
}

function* uploadCsvToDBEffect(action) {
	try {
		yield put(setLoading(true));

		const response = yield call(uploadCsvToDBApi, action.payload);
		yield put(setUploadCsvToDB(response));

		yield put(setCode(response.data.code));

		yield put(setMessage(response.data.message));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setMessage(error?.response?.data?.message));
	}
}

function* editUserProfileApiEffect(action) {
	try {
		yield put(setUpLoading(true));

		const response = yield call(editUserProfileApi, action.payload);

		yield put(setEditUserResponse(response?.data));
		yield put(setCode(response.data.code));
		yield put(setMessage(response?.data?.message));

		yield put(setUpLoading(false));
	} catch (error) {
		yield put(setUpLoading(false));

		yield put(setMessage(error?.response?.data?.message));
	}
}

function* usersActionEffect(action) {
	try {
		yield put(setUpLoading(true));
		const response = yield call(usersAction, action.payload);
		yield put(setCode(response.data.code));

		yield put(setMessage(response.data.message));
		yield put(setUpLoading(false));
	} catch (error) {
		yield put(setUpLoading(false));

		yield put(setMessage(error?.response?.data?.message));
	}
}

function* classActionEffect(action) {
	try {
		yield put(setUpLoading2(true));
		const response = yield call(classAction, action.payload);
		yield put(setCode(response.data.code));

		yield put(setMessage(response.data.message));
		yield put(setUpLoading2(false));
	} catch (error) {
		yield put(setUpLoading2(false));

		yield put(setMessage(error?.response?.data?.message));
	}
}
function* getFTPDetailsEffect(action) {
	try {
		const response = yield call(getFTPDetails, action.payload);
		yield put(setFTPDetails(response?.data?.response));
	} catch (error) {
		yield put(setMessage(error?.response?.data?.message));
	}
}

function* getUpdateImportsEmailStatusEffect(action) {
	try {
		const response = yield call(updateImportsEmailStatus, action.payload);
		yield put(setCode(201));
		yield put(setMessage(response.data));
	} catch (error) {
		yield put(setMessage(error.message));
		yield put(setCode(error.code));
	}
}

function* schoolAdminSaga() {
	yield takeLatest(
		"schoolAdmin/getSchoolAdminGetAllClasses",
		getSchoolAdminGetAllClassesEffect,
	);
	yield takeLatest(
		"schoolAdmin/getSchoolAdminStudentByClassesCall",
		getSchoolAdminStudentAPIByClassEffect,
	);
	yield takeLatest(
		"schoolAdmin/getSchoolAdminAddToTeacherClasses",
		getSchoolAdminTeacherToClassEffect,
	);

	yield takeLatest(
		"schoolAdmin/getSchoolAdminClassStudentCall",
		getStudentSchoolAdminDataAPICALL,
	);

	yield takeLatest(
		"schoolAdmin/getAddTeacherToManageClassApiCall",
		getAddTeacherToManageClassesEffect,
	);

	yield takeLatest(
		"schoolAdmin/getAddStudentToClassApiCall",
		getAddStudentToClassApiEffect,
	);

	yield takeLatest(
		"schoolAdmin/getManageUsersAssignmentApiCall",
		getManageUsersAssignmentApiEffect,
	);

	yield takeLatest(
		"schoolAdmin/getAddClassToManageClassesApiCall",
		getAddClassToManageClassesEffect,
	);

	yield takeLatest(
		"schoolAdmin/getTeachersListByClassIdApiCall",
		getTeachersListByClassIdEffect,
	);

	yield takeLatest("schoolAdmin/getSchoolsForAdmin", getSchoolsApicallEffect);

	yield takeLatest(
		"schoolAdmin/getSchoolWithSchoolAdmin",
		getSchoolWithSchoolAdminEffect,
	);

	yield takeLatest(
		"schoolAdmin/getTeachersBySchool",
		getTeachersBySchoolEffect,
	);
	yield takeLatest(
		"schoolAdmin/getTeachersBySchoolForAddTeacherToClassModalEffect",
		getTeachersBySchoolForAddTeacherToClassModalEffect,
	);

	yield takeLatest("schoolAdmin/getAddStudentToAll", getAddStudentsAllEffect);

	yield takeLatest(
		"schoolAdmin/getAddTeacherToClass",
		getAddTeacherToClassEffect,
	);

	yield takeLatest(
		"schoolAdmin/getRequestToAddAdminForSchool",
		getRequestToAddAdminForSchoolEffect,
	);

	yield takeLatest("schoolAdmin/getUpdateSchool", getUpdateSchoolApiEffect);

	yield takeLatest("schoolAdmin/getAccouncementData", AddAnnouncementApi);

	yield takeLatest("schoolAdmin/getManageAnnouncementData", ManageAnnouncement);

	yield takeLatest(
		"schoolAdmin/getCreateSchoolAdmin",
		getCreateSchoolAdminApiEffect,
	);

	yield takeLatest("schoolAdmin/getEditTeacher", getEditTeacherApiEffect);

	yield takeLatest("schoolAdmin/getGetTeacherById", getTeacherByIdApiEffect);

	yield takeLatest(
		"schoolAdmin/getUserRolesListForManageUsersApiCall",
		getUserRolesListForManageUsersApiEffect,
	);

	yield takeLatest("schoolAdmin/getAddUsers", addUsersApiEffect);

	yield takeLatest(
		"schoolAdmin/getTeachersBySchoolsApiCall",
		getTeachersBySchoolsApiEffect,
	);

	yield takeLatest(
		"schoolAdmin/getStudentInfoBasedOnParticularSchoolApi",
		getStudentInfoBasedOnSchoolApiCall,
	),
		yield takeLatest(
			"schoolAdmin/getClassByIDApiCall",
			getClassByIDApiCallEffect,
		);

	yield takeLatest(
		"schoolAdmin/getUpdateClassByIDApiCall",
		updateClassByIDApiCallEffect,
	);

	yield takeLatest(
		"schoolAdmin/getRemoveSchoolAdminFromSchool",
		removeSchoolAdminFromSchoolApiEffect,
	);

	yield takeLatest(
		"schoolAdmin/getRemoveAdminFromDistrict",
		removeAdminFromDistrictApiEffect,
	);

	yield takeLatest("schoolAdmin/getUpdateUsers", updateUsersApiEffect);

	yield takeLatest(
		"schoolAdmin/getCsvColumnsNames",
		getCsvFileColumnNamesEffect,
	);
	yield takeLatest("schoolAdmin/getExportUsers", getExportUsersEffect);
	yield takeLatest("schoolAdmin/getExportClasses", getExportClassesEffect);
	yield takeLatest(
		"schoolAdmin/getCreateMappingObject",
		getCreateMappingObjectEffect,
	);
	yield takeLatest(
		"schoolAdmin/getGetMappingObjectList",
		getMappingObjectListEffect,
	);
	yield takeLatest(
		"schoolAdmin/getRemoveMappingObjects",
		removeMappingObjectsEffect,
	);
	yield takeLatest("schoolAdmin/getGetTablesById", getTablesByIdEffect);
	yield takeLatest(
		"schoolAdmin/getGetMapObjDetailsById",
		getMapObjDetailsByIdEffect,
	);
	yield takeLatest("schoolAdmin/getGetImportHistory", getImportHistoryEffect);
	yield takeLatest("schoolAdmin/getGetImportSettings", getImportSettingsEffect);
	yield takeLatest(
		"schoolAdmin/getAddUpdateImportSettings",
		addUpdateImportSettingsEffect,
	);
	yield takeLatest(
		"schoolAdmin/getRollBackImportData",
		rollBackImportDataEffect,
	);
	yield takeLatest("schoolAdmin/getPreviewCsv", previewCsvEffect);
	yield takeLatest("schoolAdmin/getExportErrors", exportErrorsEffect);
	yield takeLatest("schoolAdmin/getSearchMappings", searchMappingEffect);

	yield takeLatest("schoolAdmin/getUploadCsvToDB", uploadCsvToDBEffect);

	yield takeLatest(
		"schoolAdmin/getEditUserProfileApiCall",
		editUserProfileApiEffect,
	);
	yield takeLatest("schoolAdmin/getUsersAction", usersActionEffect);
	yield takeLatest("schoolAdmin/getClassAction", classActionEffect);
	yield takeLatest(
		"schoolAdmin/getExportImportHistory",
		exportImportHistoryEffect,
	);

	yield takeLatest("schoolAdmin/getUpdateAnnouncement", updateAnnouncementApi);
	yield takeLatest("schoolAdmin/getFTPDetails", getFTPDetailsEffect);
	yield takeLatest(
		"schoolAdmin/getUpdateImportsEmailStatus",
		getUpdateImportsEmailStatusEffect,
	);

	yield takeLatest('schoolAdmin/getTeachersForLoginUserApiCall', getTeachersForLoginUserApiEffect)
}

export default schoolAdminSaga;
