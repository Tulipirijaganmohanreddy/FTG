import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
	getRecentResourcesByTest,
	getRecommendedSmartCoachAPI,
} from "../../APIS/SmartCoachAPIS/smartcoach.service";

import { studentReportApi } from "../../APIS/Student/fitnessgram/fitness.service";
import {
	changePassword,
	changeRole,
	changeUserName,
	forgotDistrictCode,
	forgotPassword,
	forgotUserName,
	getDistrictsByZipCode,
	getNotificationsCountAPI,
	getReportPdf,
	globalSearch,
	logOut,
	login,
	loginUser,
	notificationsRead,
	refreshToken,
	resetPassword,
	userPrivileges,
	viewResource,
} from "../../APIS/auth.service";
import { setReportPdfData } from "../../DistrictAdminApis/districtAdminSlice";
import { setTotalPages } from "../../features/teacher/teacherSlice";
import {
	setCode,
	setCode2,
	setContactsKey,
	setDistrictsByZipCode,
	setDuplicateRole,
	setErrorResponse,
	setForgotMessage,
	setForgotPassword,
	setForgotUserName,
	setGlobalSearchResults,
	setLoading,
	setLoading2,
	setLoadingOne,
	setLoadingTwo,
	setLoggedInUserDetails,
	setMessage,
	setNotificationsCount,
	setNotificationsRead,
	setRecentResourcesByTest,
	setRolesAndPrevilegesObject,
	setSelectedRole,
	setSmartCoachResponse,
	setToken,
	setUpLoading,
	setUser,
	setUserData,
	setUserId,
	setUserPrivileges,
	setUserRole,
} from "../slices/profileSlice";
import { resetStore } from "../store";

function* getUserEffect(action) {
	try {
		yield put(setLoadingOne(true));

		const response = yield call(login, action.payload);
		const { email, uuid } = response?.response;
		// custom event for chatbot
		const loginEvent = new CustomEvent("userLoggedIn", {
			data: {
				uuid,
				email,
			},
		});
		document.dispatchEvent(loginEvent);
		yield put(setToken(response.response.token));
		// localStorage.setItem("fgToken", response.response.token);

		yield put(setUserId(uuid));
		yield put(setContactsKey(response.response?.through_contacts ?? false));

		yield put(setLoadingOne(false));
	} catch (error) {
		yield put(setLoadingOne(false));
		yield put(setMessage(error.response.data.message));
	}
}

function* getLoginUserEffect(action) {
	try {
		yield put(setLoadingTwo(true));
		const response = yield call(loginUser, action.payload);

		yield put(setUserRole(response?.response.role));

		yield put(setSelectedRole(response?.response?.role[0]));

		yield put(setLoggedInUserDetails(response?.response));

		yield put(setLoadingTwo(false));
	} catch (error) {
		yield put(setLoadingTwo(false));
	}
}

function* getUpdatedUserEffect(action) {
	try {
		yield put(setLoadingTwo(true));
		const response = yield call(loginUser, action.payload);

		yield put(setLoggedInUserDetails(response?.response));

		yield put(setLoadingTwo(false));
	} catch (error) {
		yield put(setLoadingTwo(false));
	}
}

function* getUserDataEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(loginUser, action.payload);

		yield put(setUserData(response.response));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setErrorResponse(error?.response?.data?.message));
	}
}

function* logOutEffect(action) {
	try {
		yield call(logOut, action.payload);

		// custom event for chatbot
		const logoutEvent = new CustomEvent("userLoggedOut");
		document.dispatchEvent(logoutEvent);

		localStorage.removeItem("lastActiveTime");

		resetStore();
	} catch (error) {
		resetStore();
		localStorage.removeItem("lastActiveTime");
	}
}

function* forgotUserNameEffect(action) {
	try {
		yield put(setUpLoading(true));

		const response = yield call(forgotUserName, action.payload);

		yield put(setForgotUserName(response.code));
		yield put(setForgotMessage(response.message));
		yield put(setUpLoading(false));
	} catch (error) {
		yield put(setUpLoading(false));
		yield put(setMessage(error.response.data.message));
	}
}

function* forgotPasswordEffect(action) {
	try {
		yield put(setUpLoading(true));

		const response = yield call(forgotPassword, action.payload);

		yield put(setForgotPassword(response.code));
		yield put(setForgotMessage(response.message));
		yield put(setUpLoading(false));
	} catch (error) {
		yield put(setUpLoading(false));
		yield put(setMessage(error.response.data.message));
	}
}

function* forgotDistrictCodeEffect(action) {
	try {
		yield put(setUpLoading(true));

		const response = yield call(forgotDistrictCode, action.payload);
		yield put(setForgotPassword(response.code));
		yield put(setForgotMessage(response.message));
		yield put(setUpLoading(false));
	} catch (error) {
		yield put(setUpLoading(false));
		yield put(setMessage(error.response.data.message));
	}
}

function* getDistrictsByZipCodeEffect(action) {
	try {
		yield put(setUpLoading(true));

		const response = yield call(getDistrictsByZipCode, action.payload);
		yield put(setDistrictsByZipCode(response.response));

		yield put(setUpLoading(false));
	} catch (error) {
		yield put(setUpLoading(false));
		yield put(setMessage(error.response.data.message));
	}
}

// function* getSmartCoachEffect(action) {
// 	try {
// 		yield put(setLoading(true));
// 		const response = yield call(smartCoachAPI, action.payload);

// 		yield put(setSmartCoachResponse(response));

// 		yield put(setLoading(false));
// 	} catch (error) {
// 		yield put(setLoading(false));
// 	}
// }

// function* getTestSelectionEffect(action) {
// 	try {
// 		yield put(setLoading(true));
// 		const response = yield call(testSelectionAPI, action.payload);
// 		yield put(setTestSelectionResponse(response));

// 		yield put(setLoading(false));
// 	} catch (error) {
// 		yield put(setLoading(false));
// 	}
// }

function* getRecentResourcesByTestEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getRecentResourcesByTest, action.payload);
		yield put(setRecentResourcesByTest(response.data.response));
		yield put(setTotalPages(response.data.totalNoOfPages));

		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));

		yield put(setMessage(error.response.data.message));
	}
}

function* getRecommendedSmartCoachAPIEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getRecommendedSmartCoachAPI, action.payload);
		yield put(setSmartCoachResponse(response.data.response));

		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));

		yield put(setMessage(error.response.data.message));
	}
}

function* studentReportApiEffect(action) {
	try {
		yield put(setLoading2(true));
		const response = yield call(studentReportApi, action.payload);
		yield put(setReportPdfData(response.response.data));
		yield put(setLoading2(false));
	} catch (error) {
		yield put(setLoading2(false));

		yield put(setMessage(error.message));
		yield put(setCode(error.code));
	}
}
function* globalSearchEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(globalSearch, action.payload);
		yield put(setGlobalSearchResults(response?.response));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
	}
}

function* changeRoleEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(changeRole, action.payload);
		yield put(setLoggedInUserDetails(response?.response));

		yield put(setToken(response?.response?.token));
		// localStorage.setItem("fgToken", response.response.token);
		yield put(setUserRole(response?.response.role));

		yield put(setDuplicateRole(null));
		yield put();
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
	}
}

function* changeUserNameEffect(action) {
	try {
		yield put(setUpLoading(true));
		const response = yield call(changeUserName, action.payload);

		yield put(setCode(response.code));
		yield put(setUser(response?.response));
		yield put(setMessage(response.message));
		// yield put(setToken(response?.response?.token));
		yield put(setUpLoading(false));
	} catch (error) {
		yield put(setUpLoading(false));

		yield put(setMessage(error.response.data.message));
	}
}

function* changePasswordEffect(action) {
	try {
		yield put(setUpLoading(true));
		const response = yield call(changePassword, action.payload);

		yield put(setCode(response.code));
		yield put(setUser(response?.response));
		yield put(setMessage(response.message));
		yield put(setUpLoading(false));
	} catch (error) {
		yield put(setUpLoading(false));

		yield put(setMessage(error.response.data.message));
	}
}

function* resetPasswordEffect(action) {
	try {
		yield put(setUpLoading(true));
		const response = yield call(resetPassword, action.payload);
		yield put(setCode(response.code));

		// yield put(setUser(response));
		yield put(setMessage(response.message));
		yield put(setUpLoading(false));
	} catch (error) {
		yield put(setUpLoading(false));

		yield put(setMessage(error.response.data.message));
	}
}

function* refreshTokenEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(refreshToken, action.payload);

		yield put(setToken(response.response.token));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
	}
}

function* userPrivilegesEffect(action) {
	try {
		const response = yield call(userPrivileges, action.payload);

		const rolesAndPrevilegesDataObject = response?.response?.reduce(
			(obj, privilege) => {
				const { privilege: privilegeName, ...rest } = privilege;

				obj[privilegeName] = rest;

				return obj;
			},

			{},
		);

		yield put(setUserPrivileges(response.response));

		yield put(setRolesAndPrevilegesObject(rolesAndPrevilegesDataObject));
	} catch (error) {
		yield put(setMessage(error.response.data.message));
	}
}

function* getNotificationsCountAPIEffect(action) {
	try {
		const response = yield call(getNotificationsCountAPI, action.payload);

		yield put(setNotificationsCount(response.message));
	} catch (error) {
		yield put(setNotificationsCount(0));
	}
}

function* getNotificationsReadAPIEffect(action) {
	try {
		const response = yield call(notificationsRead, action.payload);

		// yield put(setCode(response.code));
		yield put(setCode2(response.code));
		// yield put(setNotificationsRead(response));
	} catch (error) {
		yield put(setNotificationsRead(error));
	}
}
function* getViewResourceEffect(action) {
	try {
		yield put(setLoading2(true));
		const response = yield call(viewResource, action.payload);
		window.open(response?.signedUrl);

		yield put(setLoading2(false));
	} catch (error) {
		yield put(setLoading2(false));
	}
}
function* getReportPdfEffect(action) {
	try {
		yield put(setLoading2(true));
		const response = yield call(getReportPdf, action.payload);
		window.open(response?.response);

		yield put(setLoading2(false));
	} catch (error) {
		yield put(setLoading2(false));
	}
}

function* profileSaga() {
	yield takeLatest("profile/getUser", getUserEffect);
	yield takeLatest("profile/getUserRole", getLoginUserEffect);
	yield takeLatest("profile/getUpdatedUser", getUpdatedUserEffect);
	yield takeLatest("profile/getUserData", getUserDataEffect);

	// yield takeLatest("profile/getSmartCoach", getSmartCoachEffect);
	// yield takeLatest("profile/getTestSelection", getTestSelectionEffect);

	yield takeEvery("profile/logOut", logOutEffect);
	yield takeLatest("profile/getForgotUserName", forgotUserNameEffect);
	yield takeLatest("profile/getForgotPassword", forgotPasswordEffect);
	yield takeLatest("profile/getResetPassword", resetPasswordEffect);
	yield takeLatest("profile/getForgotDistrictCode", forgotDistrictCodeEffect);
	yield takeLatest("profile/getGlobalSearchResults", globalSearchEffect);

	yield takeLatest(
		"profile/getRecommendedSmartCoachAPICall",
		getRecommendedSmartCoachAPIEffect,
	);
	yield takeLatest(
		"profile/getRecentResourcesByTest",
		getRecentResourcesByTestEffect,
	);

	yield takeLatest("profile/getStudentReportApiCall", studentReportApiEffect);
	yield takeLatest("profile/changeRole", changeRoleEffect);
	yield takeLatest("profile/postChangeUserName", changeUserNameEffect);
	yield takeLatest("profile/postChangePassword", changePasswordEffect);
	yield takeLatest(
		"profile/getAllDistrictsByZipCode",
		getDistrictsByZipCodeEffect,
	);
	yield takeLatest("profile/getUserPrivileges", userPrivilegesEffect);

	yield takeLatest(
		"profile/getNotificationsCountAPICall",
		getNotificationsCountAPIEffect,
	),
		yield takeLatest("profile/refreshToken", refreshTokenEffect),
		yield takeLatest(
			"profile/getNotificationsReadAPICall",
			getNotificationsReadAPIEffect,
		),
		yield takeLatest("profile/getViewResource", getViewResourceEffect);
	yield takeLatest("profile/getReportPdf", getReportPdfEffect);
}
export default profileSaga;
