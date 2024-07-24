import { call, put, take, takeLatest } from "redux-saga/effects";
// import { setLoading, setResponse } from "../features/teacher/teacherSlice";
import Papa from "papaparse";

import { exportData } from "../Utilities/utils";
import { setTotalPages } from "../features/teacher/teacherSlice";
import {
	setCode,
	setCode2,
	setLoading,
	setLoading2,
	setLoading3,
	setMessage,
	setUpLoading,
	setUpLoading2,
	setUser,
} from "../store/slices/profileSlice";
import {
	accessLogCounts,
	assignAndUnAssignUsers,
	changePasswordDA,
	completionReportApi,
	dataExport,
	dataExportFilters,
	deleteAnnouncementRequestApi,
	deleteMandate,
	districtStatistics,
	downloadAllStudentsReport,
	emailAllStudentsReport,
	getDistrictForDistrictAdminApi,
	getEmails,
	getLicenseDistricts,
	getMandateData,
	getPartnerLicenses,
	getStates,
	getStudentsListForReportsApi,
	getTestItems,
	listOfImportErrorsApi,
	mergeUsersAPI,
	overviewReportApi,
	overviewReportSummaryByClassApi,
	postMandate,
	recievedNotificationsApi,
	rolesAndPrivilagesByRole,
	schoolAcademicYear,
	getSchoolsInDistrictsForStateAndPartner,
	updateDistrictForDistrictAdminApi,
	updateMandate,
	updateNotificationApproveRequestApi,
	updateRolesAndPrivilages,
	completionReportCsvApi,
	uploadCsvToSftp,
} from "./district.service";
import {
	setAccessLogCounts,
	setAssignAndUnAssignUsers,
	setDistrictStatistics,
	setEmailSettings,
	setGetDistrictForDistrictAdminResponse,
	setLicenseDistricts,
	setListOfImportErrors,
	setMandateData,
	setNotificationsRecievedList,
	setOverviewReportSummaryByClass,
	setPartnerLicenses,
	setReportPdfData,
	setRolesAndPrivilagesByRole,
	setSchoolAcademicYear,
	setSchoolsInDistrictsForStateAndPartner,
	setStatesList,
	setStudentsListForReports,
	setTestItemsList,
	setTotalCountOfReports,
	setTotalNoOfPages,
	setUpdateDistrictForDistrictAdminResponse,
	setUpdateRolesAndPrivilages,
	setUpdateRolesAndPrivilagesCode,
} from "./districtAdminSlice";

function* getEmailEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getEmails, action.payload);
		yield put(setEmailSettings(response.response));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
	}
}

function* getMandatesDataApiEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getMandateData, action.payload);
		yield put(setMandateData(response.response));
		yield put(setTotalPages(response.totalNoOfPages));

		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setMessage(error.response.data.message));
		yield put(setMandateData([]));
	}
}

function* getTestItemsEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getTestItems, action.payload);
		yield put(setTestItemsList(response.response));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
	}
}

function* postMandateEffect(action) {
	try {
		yield put(setUpLoading(true));
		const response = yield call(postMandate, action.payload);
		yield put(setCode(response.code));
		yield put(setMessage(response.message));
		yield put(setUpLoading(false));
	} catch (error) {
		yield put(setUpLoading(false));
		yield put(setMessage(error.response.data.message));
	}
}

function* updateMandateEffect(action) {
  try {
    yield put(setUpLoading(true));
    const response = yield call(updateMandate, action.payload);
    yield put(setCode(response.data.code));
    yield put(setMessage(response.data.message));
    yield put(setUpLoading(false));
  } catch (error) {
    yield put(setUpLoading(false));
    yield put(setMessage(error.response.data.message));
  }
}

function* rolesAndPrivilagesByRoleEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(rolesAndPrivilagesByRole, action.payload);
		yield put(setRolesAndPrivilagesByRole(response.data.response));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
	}
}
function* updateDistrictForDistrictAdminApiCall(action) {
	try {
		yield put(setUpLoading(true));
		const response = yield call(
			updateDistrictForDistrictAdminApi,
			action.payload,
		);

		yield put(setUpdateDistrictForDistrictAdminResponse(response));

		yield put(setCode(response.data.code));

		yield put(setMessage(response.data.message));

		yield put(setUpLoading(false));
	} catch (error) {
		yield put(setUpLoading(false));
		yield put(setMessage(error.response.data.message));
	}
}

function* updateRolesAndPrivilagesEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(updateRolesAndPrivilages, action.payload);

		yield put(setUpdateRolesAndPrivilages(response));
		yield put(setUpdateRolesAndPrivilagesCode(response.data.code));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));

		yield put(setLoading(false));
	}
}

function* districtStatisticsEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(districtStatistics, action.payload);
		yield put(setDistrictStatistics(response.data.response));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setMessage(error.response.data.message));
	}
}

function* accessLogCountsEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(accessLogCounts, action.payload);
		yield put(setAccessLogCounts(response.data.response));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setMessage(error.response.data.message));
	}
}

function* getDistrictForDistrictAdminApiEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getDistrictForDistrictAdminApi, action.payload);

		yield put(setGetDistrictForDistrictAdminResponse(response?.data?.response));

		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setMessage(error.response.data.message));
		yield put(setGetDistrictForDistrictAdminResponse([]));
	}
}

function* getRecievedNotificationsApiEffect(action) {
	try {
		yield put(setLoading(true));

		const response = yield call(recievedNotificationsApi, action.payload);

		yield put(setNotificationsRecievedList(response?.data?.response));

		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setMessage(error.response.data.message));
	}
}

function* getStudentsListForReportsApiEffect(action) {
	try {
		yield put(setLoading(true));

		const response = yield call(getStudentsListForReportsApi, action.payload);

		yield put(setTotalPages(response?.data?.totalNoOfPages));

		yield put(setTotalCountOfReports(response?.data?.totalUsersCount));

		yield put(setStudentsListForReports(response?.data?.response));

		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setCode(error.code));
		yield put(setMessage(error.message));
		yield put(setTotalPages(null));
		yield put(setStudentsListForReports([]));
	}
}

function* getOverviewReportSummaryByClassApiEffect(action) {
	try {
		const response = yield call(
			overviewReportSummaryByClassApi,
			action.payload,
		);

		yield put(setOverviewReportSummaryByClass(response?.data?.response));
	} catch (error) {}
}

function* getNotificationUpdateStatusApiEffect(action) {
	try {
		yield put(setLoading(true));

		const response = yield call(
			updateNotificationApproveRequestApi,
			action.payload,
		);

		yield put(setCode(response?.data?.code));
		yield put(setMessage(response?.data?.message));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setCode(error?.data?.code));
		yield put(setMessage(error?.data?.message));
		yield put(setLoading(false));
	}
}

function* deleteAnnouncementApiEffect(action) {
	try {
		yield put(setUpLoading2(true));

		const response = yield call(deleteAnnouncementRequestApi, action.payload);
		yield put(setCode(response?.data?.code));
		yield put(setMessage(response?.data?.message));
		yield put(setUpLoading2(false));
	} catch (error) {
		yield put(setCode(error?.data?.code));
		yield put(setMessage(error?.data?.message));
		yield put(setUpLoading2(false));
	}
}

function* getStatesListEffect(action) {
	try {
		const response = yield call(getStates, action.payload);

		yield put(setStatesList(response.data.response.data));
	} catch (error) {}
}

function* mergeUsersApiEffect(action) {
	try {
		yield put(setLoading3(true));
		const response = yield call(mergeUsersAPI, action.payload);
		yield put(setCode(response?.data?.code));
		yield put(setMessage(response?.data?.message));
		yield put(setLoading3(false));
	} catch (error) {
		yield put(setCode(error?.data?.code));
		yield put(setMessage(error?.data?.message));
		yield put(setLoading3(false));
	}
}

function* assignAndUnAssignUsersEffect(action) {
	try {
		yield put(setUpLoading2(true));

		const response = yield call(assignAndUnAssignUsers, action.payload);
		yield put(setAssignAndUnAssignUsers(response));
		yield put(setCode(response?.data?.code));
		yield put(setMessage(response?.data?.message));
		yield put(setUpLoading2(false));
	} catch (error) {
		yield put(setMessage(error?.response?.data?.message));
		yield put(setUpLoading2(false));
	}
}

function* changePasswordDAEffect(action) {
	try {
		yield put(setUpLoading(true));

		const response = yield call(changePasswordDA, action.payload);
		yield put(setUser(response));

		yield put(setCode(response?.data?.code));
		yield put(setMessage(response?.data?.message));
		yield put(setUpLoading(false));
	} catch (error) {
		yield put(setMessage(error?.response?.data?.message));
		yield put(setUpLoading(false));
	}
}

function* deleteMandateEffect(action) {
	try {
		yield put(setUpLoading2(true));

		const response = yield call(deleteMandate, action.payload);

		yield put(setCode(response?.data?.code));
		yield put(setMessage(response?.data?.message));
		yield put(setUpLoading2(false));
	} catch (error) {
		yield put(setMessage(error?.response?.data?.message));
		yield put(setUpLoading2(false));
	}
}
function* dataExportEffectPFAI(action) {
	try {
		yield put(setLoading(true));

		const response = yield call(dataExport, action.payload);
		const csvData = Papa.unparse(response);
		exportData(csvData, "data.csv", "text/csv;charset=utf-8;");

		yield put(setLoading(false));
	} catch (error) {
		yield put(setMessage(error.message));
		yield put(setCode(error.code));
		yield put(setLoading(false));
	}
}

function* dataExportFiltersEffect(action) {
	try {
		yield put(setUpLoading(true));
		const response = yield call(dataExportFilters, action.payload);
		const csvData = Papa.unparse(response.response);
		exportData(csvData, "dataExport.csv", "text/csv;charset=utf-8;");
		yield put(setUpLoading(false));
	} catch (error) {
		yield put(setMessage(error.message));
		yield put(setUpLoading(false));
	}
}

function* dataExportFiltersStateAdminEffect(action) {
	try {
		yield put(setUpLoading(true));
		const response = yield call(dataExportFilters, action.payload);
		yield put(setCode(response.code));
		yield put(setMessage(response.message));
		yield put(setUpLoading(false));
	} catch (error) {
		yield put(setMessage(error.message));
		yield put(setUpLoading(false));
	}
}

function* getSchoolsInDistrictsForStateAndPartnerEffect(action) {
	try {
		const response = yield call(
			getSchoolsInDistrictsForStateAndPartner,
			action.payload,
		);
		yield put(setSchoolsInDistrictsForStateAndPartner(response));
	} catch (error) {}
}

function* schoolAcademicYearEffect(action) {
	try {
		const response = yield call(schoolAcademicYear, action.payload);
		yield put(setSchoolAcademicYear(response));
	} catch (error) {}
}
function* listOfImportErrorsApiEffect(action) {
	try {
		yield put(setLoading(true));

		const response = yield call(listOfImportErrorsApi, action.payload);
		yield put(setListOfImportErrors(response?.data?.response));
		yield put(setTotalNoOfPages(response.data.totalNoOfPages));

		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setMessage(error.response.data.message));
	}
}

function* completionReportApiEffect(action) {
	try {
		yield put(setUpLoading(true));
		const response = yield call(completionReportApi, action.payload);
		if (response.message.includes("Request sent")) {
			yield put(setMessage(response.message));
			yield put(setCode(response.code));
		} else {
			yield put(setReportPdfData(response.response.data.data));
			yield put(setTotalPages(response.response.totalNoOfPages));
		}
		yield put(setUpLoading(false));
		yield put(setLoading2(false));
	} catch (error) {
		yield put(setUpLoading(false));
		yield put(setMessage(error.message));
		yield put(setCode(error.code));
	}
}
function* completionReportCsvApiEffect(action) {
	try {
		yield put(setLoading3(true));
		const response = yield call(completionReportCsvApi, action.payload);
		if (response.message.includes("Request sent")) {
			yield put(setMessage(response.message));
			yield put(setCode(response.code));
		} else {
			const csvData = Papa.unparse(response.response);
			exportData(
				csvData,
				"Completion Report Data.csv",
				"text/csv;charset=utf-8;",
			);
		}
		yield put(setLoading3(false));
	} catch (error) {
		yield put(setLoading3(false));
		yield put(setMessage(error.message));
		yield put(setCode(error.code));
	}
}
function* overviewReportApiEffect(action) {
	try {
		yield put(setUpLoading2(true));
		const response = yield call(overviewReportApi, action.payload);
		console.log(response, "response===>");
		if (response?.send_mail) {
			yield put(setMessage(response?.message));
			yield put(setCode(200));
		} else {
			yield put(setReportPdfData(response?.buffer?.data));
		}
		yield put(setUpLoading2(false));
	} catch (error) {
		yield put(setUpLoading2(false));
		yield put(setMessage(error.message));
		yield put(setCode(error.code));
	}
}

function* completionReportDestroyApiEffect(action) {
	try {
		const response = yield call(completionReportApi, action.payload);
	} catch (error) {}
}

function* DownaloadCompletionReportApiEffect(action) {
	try {
		yield put(setLoading3(true));
		const response = yield call(completionReportApi, action.payload);
		if (response.message.includes("Request sent")) {
			yield put(setMessage(response.message));
			yield put(setCode(response.code));
		} else {
			window.open(response.response, "_blank");
		}
		yield put(setLoading3(false));
	} catch (error) {
		yield put(setLoading3(false));
		yield put(setMessage(error.message));
		yield put(setCode(error.code));
	}
}

function* downloadAllStudentsReportApiEffect(action) {
	try {
		// yield put(setLoading2(true));
		yield put(setLoading3(true));
		const response = yield call(downloadAllStudentsReport, action.payload);
		if (response.message.includes("Request sent")) {
			yield put(setCode(response?.code));
			yield put(setMessage(response?.message));
		} else {
			window.open(response.response, "_blank");
		}
		yield put(setCode2(response?.code));
		// yield put(setLoading2(false));

		yield put(setLoading3(false));
	} catch (error) {
		yield put(setCode(error.code));
		yield put(setMessage(error.message));
		// yield put(setLoading2(false));

		yield put(setLoading3(false));
	}
}

function* emailAllStudentsReportApiEffect(action) {
	try {
		yield put(setLoading3(true));
		// yield put(setLoading2(true));
		const response = yield call(emailAllStudentsReport, action.payload);

		yield put(setCode(response?.code));
		yield put(setMessage(response?.message));

		// yield put(setLoading2(false));
		yield put(setLoading3(false));
	} catch (error) {
		yield put(setCode(error.code));
		yield put(setMessage(error.message));
		// yield put(setLoading2(false));
		yield put(setLoading3(false));
	}
}
function* partnerLicensesEffect(action) {
	try {
		const response = yield call(getPartnerLicenses, action.payload);
		yield put(setPartnerLicenses(response));
	} catch (error) {
		yield put(setPartnerLicenses([]));
		yield put(setCode(error.code));
		yield put(setMessage(error.message));
	}
}

function* licenseDistrictsEffect(action) {
	try {
		const response = yield call(getLicenseDistricts, action.payload);
		yield put(setLicenseDistricts(response));
	} catch (error) {
		yield put(setLicenseDistricts([]));
		yield put(setCode(error.code));
		yield put(setMessage(error.message));
	}
}

function* uploadCsvToSftpEffect(action) {
	try {
		yield put(setLoading(true));

		const response = yield call(uploadCsvToSftp, action.payload);
		yield put(setCode(response.code));
		yield put(setMessage(response.message));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setCode(error.code));
		yield put(setMessage(error.message));
	}
}

function* districtAdminSaga() {
	yield takeLatest("district/getEmailSettings", getEmailEffect);
	yield takeLatest("district/getMandatesData", getMandatesDataApiEffect);

	yield takeLatest(
		"district/getDistrictForDistrictAdminApiCall",
		getDistrictForDistrictAdminApiEffect,
	);
	yield takeLatest("district/getEmailSettings", getEmailEffect);
	yield takeLatest("district/getMandateData", getMandatesDataApiEffect);
	yield takeLatest("district/getTestItemsList", getTestItemsEffect);
	yield takeLatest("district/postMandate", postMandateEffect);
	yield takeLatest("district/updateMandate", updateMandateEffect);
	yield takeLatest(
		"district/getRolesAndPrivilagesByRole",
		rolesAndPrivilagesByRoleEffect,
	);
	yield takeLatest(
		"district/updateRolesAndPrivilages",
		updateRolesAndPrivilagesEffect,
	);
	yield takeLatest("district/getDistrictStatistics", districtStatisticsEffect);
	yield takeLatest("district/getAccessLogCounts", accessLogCountsEffect);
	yield takeLatest(
		"district/getUpdateDistrictForDistrictAdminApiCall",
		updateDistrictForDistrictAdminApiCall,
	);

	yield takeLatest(
		"district/getNotificationsRecievedApiCall",
		getRecievedNotificationsApiEffect,
	);

	yield takeLatest(
		"district/getStudentsListForReportsApiCall",
		getStudentsListForReportsApiEffect,
	);

	yield takeLatest(
		"district/getOverviewReportSummaryByClassApiCall",
		getOverviewReportSummaryByClassApiEffect,
	);

	yield takeLatest(
		"district/getApprovalNotificationRequestClicked",
		getNotificationUpdateStatusApiEffect,
	);

	yield takeLatest("district/deleteAnnoucement", deleteAnnouncementApiEffect);
	yield takeLatest("district/getStatesList", getStatesListEffect);
	yield takeLatest("district/getMergeUser", mergeUsersApiEffect);
	yield takeLatest(
		"district/getAssignAndUnAssignUsers",
		assignAndUnAssignUsersEffect,
	);
	yield takeLatest("district/changePasswordDA", changePasswordDAEffect);

	yield takeLatest(
		"district/getListOfImportErrors",
		listOfImportErrorsApiEffect,
	);

	yield takeLatest("district/deleteMandate", deleteMandateEffect);
	yield takeLatest("district/getDataExportPFAI", dataExportEffectPFAI);
	yield takeLatest("district/getDataExportFilter", dataExportFiltersEffect);
	yield takeLatest(
		"district/getDataExportFilterStateAdmin",
		dataExportFiltersStateAdminEffect,
	);

	// fitnessgram report apis

	yield takeLatest(
		"district/getCompletionReportApiCall",
		completionReportApiEffect,
	);
	yield takeLatest(
		"district/getCompletionReportCsvApiCall",
		completionReportCsvApiEffect,
	);

	yield takeLatest(
		"district/getOverviewReportApiCall",
		overviewReportApiEffect,
	);

	yield takeLatest(
		"district/destroyCompletionReportApiCall",
		completionReportDestroyApiEffect,
	);

	yield takeLatest(
		"district/getDownloadCompletionReportApiCall",
		DownaloadCompletionReportApiEffect,
	);

	yield takeLatest(
		"district/getSchoolsInDistrictsForStateAndPartner",
		getSchoolsInDistrictsForStateAndPartnerEffect,
	);
	yield takeLatest("district/getSchoolAcademicYear", schoolAcademicYearEffect);

	yield takeLatest(
		"district/getDownloadAllStudentsReportsApi",
		downloadAllStudentsReportApiEffect,
	);
	yield takeLatest(
		"district/getEmailAllStudentsReportsApi",
		emailAllStudentsReportApiEffect,
	);
	yield takeLatest("district/getPartnerLicenses", partnerLicensesEffect);
	yield takeLatest("district/getLicenseDistricts", licenseDistrictsEffect);
	yield takeLatest("district/uploadCsvToSftp", uploadCsvToSftpEffect);
}

export default districtAdminSaga;
