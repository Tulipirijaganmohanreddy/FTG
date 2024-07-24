import { call, put, takeLatest, take } from "redux-saga/effects";

import {
	getClasses,
	getSchools,
	getEventTestList,
	postEvent,
	agPostEvent,
	getRecommondedEventTestList,
	getRecentTestEventsList,
	getValidatedList,
	getPendingList,
	getEventsList,
	deleteEvent,
	getApproveStudentList,
	agDeleteEvent,
	getManageClasses,
	getFilteredManageClasses,
	getStudentsByClass,
	getAllUsers,
	getActivityGramEventsList,
	getActivityGramEventStudentList,
	getActivityLogEventList,
	alPostEvent,
	alDeleteEvent,
	getEventStudentList,
	getActivityLogClassList,
	getActivityLogStudentsList,
	getActivityLogFilterByStudent,
	fgStoreStudentData,
	getEventById,
	getAgEventById,
	getAlEventById,
	updateAlEventById,
	updateAgEventById,
	updateEventById,
	alStoreStudentData,
	getAlStudentResultById,
	getAgStudentResultById,
	agStoreStudentData,
	getMandateEventTestList,
	getFgEventsList,
	getClassesByEvent,
	rejectedStudentList,
	updateFgEventOrder,
} from "../../APIS/Teacher/teacher.service";
import {
	setSchools,
	setLoading,
	setClasses,
	setEventTestList,
	setRecommondedEventTestList,
	setRecentEventTestList,
	setPendingList,
	setValidatedList,
	setEventsList,
	setApprovedStudentList,
	setManageClasses,
	setFilteredManageClasses,
	setStudentsByClass,
	setAllUsers,
	setActivityGramEventStudentList,
	setActivityGramEventsList,
	setActivityLogEventList,
	setEventStudentList,
	setActivityLogClassList,
	setActivityLogStudentsList,
	setActivityLogFilterByStudent,
	setResponseCode,
	setEventDataById,
	setAgEventDataById,
	setAlEventDataById,
	updateAlEvent,
	setAlStudentResultById,
	setAgStudentResultById,
	setResponse,
	setStoreDataResponse,
	setMandateEventTestList,
	setTotalPages,
	setFgEventsList,
	setClassesByEvent,
	setStoreDataLoading,
} from "../../features/teacher/teacherSlice";
import {
	setCode,
	setLoading2,
	setMessage,
	setUpLoading,
	setUpLoading2,
} from "../slices/profileSlice";
import { exportData } from "../../Utilities/utils";

function* getSchoolsEffect(action) {
	try {
		// yield put(setLoading(true));
		const response = yield call(getSchools, action.payload);

		yield put(setSchools(response.response));

		// yield put(setLoading(false));
	} catch (error) {
		// yield put(setLoading(false));

		yield put(setMessage(error?.response?.data?.message));
		yield put(setSchools([]));
	}
}

function* getSuperAdminSchoolsEffect(action) {
	try {
		// yield put(setLoading(true));
		const response = yield call(getSchools, action.payload);

		yield put(setSchools(response.response));

		// yield put(setLoading(false));
	} catch (error) {
		// yield put(setLoading(false));

		yield put(setMessage(error?.response?.data?.message));
		yield put(setSchools([]));
	}
}

function* getClassesEffect(action) {
	try {
		// yield put(setLoading(true));
		const response = yield call(getClasses, action.payload);

		yield put(setClasses(response.response));

		// yield put(setLoading(false));
	} catch (error) {
		// yield put(setLoading(false));

		yield put(setMessage(error?.response?.data?.message));
		yield put(setClasses([]));
	}
}

function* getClassesByEventEffect(action) {
	try {
		const response = yield call(getClassesByEvent, action.payload);

		yield put(setClassesByEvent(response.response));
	} catch (error) {
		yield put(setClassesByEvent([]));
	}
}

function* getEventTestListEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getEventTestList, action.payload);

		yield put(setEventTestList(response.response));

		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
	}
}

function* getEventListEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getEventsList, action.payload);

		yield put(setEventsList(response.data.response));
		yield put(setTotalPages(response.data.totalNoOfPages));

		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setMessage(error.response.data.message));
		yield put(setEventsList([]));
	}
}

function* getFgEventListEffect(action) {
	try {
		const response = yield call(getFgEventsList, action.payload);

		yield put(setFgEventsList(response.data.response));
	} catch (error) {
		yield put(setFgEventsList([]));
	}
}

function* getEventByIdEffect(action) {
	try {
		yield put(setLoading2(true));
		const response = yield call(getEventById, action.payload);

		yield put(setEventDataById(response.data.response));

		yield put(setLoading2(false));
	} catch (error) {
		yield put(setLoading2(false));
	}
}

function* getAgEventByIdEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getAgEventById, action.payload);

		yield put(setAgEventDataById(response.data.response));

		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
	}
}

function* getAlEventByIdEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getAlEventById, action.payload);

		yield put(setAlEventDataById(response.data.response));

		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
	}
}

function* getValidatedListEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getValidatedList, action.payload);

		yield put(setValidatedList(response.data.response));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));

		yield put(setMessage(error.response.data.message));
		yield put(setValidatedList([]));
	}
}

function* getPendingListEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getPendingList, action.payload);

		yield put(setPendingList(response.data.response));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
	}
}

function* getRecentEventTestListEffect(action) {
	try {
		const response = yield call(getRecentTestEventsList, action.payload);

		yield put(setRecentEventTestList(response.response));
	} catch (error) {
		// yield put(setMessage(error.response.data.message));
	}
}

function* getRecommondedEventTestListEffect(action) {
	try {
		// yield put(setLoading(true));
		const response = yield call(getRecommondedEventTestList, action.payload);

		yield put(setRecommondedEventTestList(response.response));

		// yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));

		yield put(setMessage(error?.response.data.message));
	}
}

function* getMandateEventTestListEffect(action) {
	try {
		const response = yield call(getMandateEventTestList, action.payload);

		yield put(setMandateEventTestList(response.response));
	} catch (error) {}
}

function* postEventEffect(action) {
	try {
		yield put(setUpLoading(true));
		const response = yield call(postEvent, action.payload);

		yield put(setResponse(response));

		yield put(setUpLoading(false));
	} catch (error) {
		yield put(setUpLoading(false));
		yield put(setCode(error?.response?.data?.code));
		yield put(setMessage(error?.response?.data?.message));

		// alert(error.response.data.message)
	}
}

function* agPostEventEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(agPostEvent, action.payload);

		yield put(setCode(response.code));
		yield put(setMessage(response.message));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));

		yield put(setMessage(error.response.data.message));
	}
}

function* alPostEventEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(alPostEvent, action.payload);

		yield put(setCode(response.code));
		yield put(setMessage(response.message));
		yield put(setLoading(false));
		// yield put(setResponseCode(response.code));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setMessage(error.response.data.message));
	}
}
function* agUpdateEventEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(updateAgEventById, action.payload);

		yield put(setCode(response.data.code));
		yield put(setMessage(response.data.message));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));

		yield put(setMessage(error.response.data.message));
	}
}
function* updateEventEffect(action) {
	try {
		yield put(setUpLoading(true));
		const response = yield call(updateEventById, action.payload);

		yield put(setResponse(response));

		yield put(setUpLoading(false));

		// yield put(setResponse(response.data.message));
	} catch (error) {
		yield put(setUpLoading(false));

		yield put(setMessage(error.response.data.message));
	}
}

function* alUpdateEventEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(updateAlEventById, action.payload);

		yield put(setLoading(false));
		yield put(setCode(response.data.code));
		yield put(setMessage(response.data.message));
	} catch (error) {
		yield put(setLoading(false));

		yield put(setMessage(error.response.data.message));
	}
}

function* deleteEventEffect(action) {
	try {
		yield put(setUpLoading2(true));
		const response = yield call(deleteEvent, action.payload);
		yield put(setCode(response.code));
		yield put(setMessage(response.message));
		yield put(setUpLoading2(false));
	} catch (error) {
		yield put(setUpLoading2(false));
		yield put(setMessage(error?.response?.data?.message));
	}
}

function* agDeleteEventEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(agDeleteEvent, action.payload);
		yield put(setResponseCode(response.code));

		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
	}
}

function* alDeleteEventEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(alDeleteEvent, action.payload);
		yield put(setResponseCode(response.code));

		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
	}
}

function* getApprovedStudentListEffect(action) {
	try {
		yield put(setUpLoading(true));
		const response = yield call(getApproveStudentList, action.payload);

		yield put(setCode(response.data.code));
		yield put(setApprovedStudentList(response));
		yield put(setMessage(response.data.message));

		yield put(setUpLoading(false));
	} catch (error) {
		yield put(setUpLoading(false));
	}
}

function* fgStoreStudentDataEffect(action) {
	try {
		yield put(setStoreDataLoading(true));
		const response = yield call(fgStoreStudentData, action.payload);
	} catch (error) {
	} finally {
		yield put(setStoreDataLoading(false));
	}
}

function* fgStoreSingleStudentDataEffect(action) {
	try {
		// yield put(setUpLoading(true));
		const response = yield call(fgStoreStudentData, action.payload);

		// yield put(setUpLoading(false));
	} catch (error) {
		// yield put(setUpLoading(false));
	}
}

function* agStoreStudentDataEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(agStoreStudentData, action.payload);

		yield put(setCode(response.data.code));
		yield put(setMessage(response.data.message));

		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));

		yield put(setMessage(error.response.data.message));
	}
}

function* alStoreStudentDataEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(alStoreStudentData, action.payload);

		yield put(setCode(response.data.code));
		yield put(setMessage(response.data.message));

		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));

		yield put(setMessage(error.response.data.message));
	}
}
function* getManageClassesEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getManageClasses, action.payload);

		yield put(setManageClasses(response.response));

		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
	}
}

function* getFilteredManageClassesEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getFilteredManageClasses, action.payload);

		yield put(setManageClasses(response));
		yield put(setTotalPages(response.totalNoOfPages));

		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));

		yield put(setMessage(error.response.data.message));
		yield put(setManageClasses([]));
	}
}

function* getStudentsByClassEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getStudentsByClass, action.payload);

		yield put(setStudentsByClass(response.response));

		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
	}
}

function* getAllUsersEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getAllUsers, action.payload);

		yield put(setAllUsers(response?.response));

		yield put(setTotalPages(response.totalNoOfPages));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));

		yield put(setMessage(error?.response?.data?.message));
		yield put(setAllUsers([]));
	}
}

function* getActivityGramEventsListEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getActivityGramEventsList, action.payload);

		yield put(setActivityGramEventsList(response.data.response));
		yield put(setTotalPages(response.data.totalNoOfPages));

		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
	}
}

function* getActivityGramEventStudentListEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(
			getActivityGramEventStudentList,
			action.payload,
		);

		yield put(setActivityGramEventStudentList(response.data.response));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));

		yield put(setMessage(error.response.data.message));
	}
}
function* getEventStudentListEffect(action) {
	try {
		yield put(setLoading(true));

		const response = yield call(getEventStudentList, action.payload);

		yield put(setEventStudentList(response.data));

		yield put(setTotalPages(response.data.totalNoOfPages));

		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setEventStudentList([]));

		// yield put(setMessage(error.response.data.message))
	}
}

function* updateFgEventOrderEffect(action) {
	try {
		const response = yield call(updateFgEventOrder, action.payload);
	} catch (error) {}
}

function* getActivityLogEventListEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getActivityLogEventList, action.payload);

		yield put(setActivityLogEventList(response.data.response));
		yield put(setTotalPages(response.data.totalNoOfPages));

		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setMessage(error.response.data.message));
	}
}

function* getActivityLogClassListEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getActivityLogClassList, action.payload);

		yield put(setActivityLogClassList(response.data.response));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
	}
}

function* getActivityLogStudentsListEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getActivityLogStudentsList, action.payload);

		yield put(setActivityLogStudentsList(response.data.response));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
	}
}

function* getActivityLogFilterByStudentEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getActivityLogFilterByStudent, action.payload);

		yield put(setActivityLogStudentsList(response.data.response));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
	}
}
function* getActivityLogStudentResultByIdEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getAlStudentResultById, action.payload);

		yield put(setAlStudentResultById(response.data.response));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));

		yield put(setMessage(error.response.data.message));
	}
}

function* getActivityGramStudentResultByIdEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(getAgStudentResultById, action.payload);

		yield put(setAgStudentResultById(response.data.response));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));

		yield put(setMessage(error.response.data.message));
	}
}

function* postRejectedStudentEffect(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(rejectedStudentList, action.payload);

		yield put(setCode(response.data.code));
		yield put(setMessage(response.data.message));

		// yield put(setAgStudentResultById(response.data.response));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));

		yield put(setMessage(error.response.data.message));
	}
}

function* teacherSaga() {
	yield takeLatest("teacher/getSchoolsList", getSchoolsEffect);
	yield takeLatest(
		"teacher/getSuperAdminSchoolsList",
		getSuperAdminSchoolsEffect,
	);
	yield takeLatest("teacher/getClassesList", getClassesEffect);
	yield takeLatest("teacher/getClassListByEvent", getClassesByEventEffect);
	yield takeLatest("teacher/getManageClassesList", getManageClassesEffect);
	yield takeLatest(
		"teacher/getFilteredManageClassesList",
		getFilteredManageClassesEffect,
	);
	yield takeLatest("teacher/getStudentListByClass", getStudentsByClassEffect);
	yield takeLatest("teacher/getEventTestList", getEventTestListEffect);
	yield takeLatest("teacher/getFgEventsList", getFgEventListEffect);
	yield takeLatest(
		"teacher/getRecentEventTestList",
		getRecentEventTestListEffect,
	);

	yield takeLatest(
		"teacher/getrecommondedEventTestList",
		getRecommondedEventTestListEffect,
	);
	yield takeLatest(
		"teacher/getMandateEventTestList",
		getMandateEventTestListEffect,
	);
	yield takeLatest("teacher/getValidatedList", getValidatedListEffect);
	yield takeLatest("teacher/getPendingList", getPendingListEffect);
	yield takeLatest("teacher/getEventsList", getEventListEffect);
	yield takeLatest("teacher/getEventStudentList", getEventStudentListEffect);

	yield takeLatest("teacher/postEventData", postEventEffect);
	yield takeLatest("teacher/agPostEventData", agPostEventEffect);
	yield takeLatest("teacher/alPostEventData", alPostEventEffect);

	yield takeLatest("teacher/deleteEventData", deleteEventEffect);
	yield takeLatest("teacher/agDeleteEventData", agDeleteEventEffect);
	yield takeLatest("teacher/alDeleteEventData", alDeleteEventEffect);

	yield takeLatest(
		"teacher/getActivityGramEventsList",
		getActivityGramEventsListEffect,
	);
	yield takeLatest(
		"teacher/getActivityGramEventStudentList",
		getActivityGramEventStudentListEffect,
	);
	yield takeLatest(
		"teacher/getApprovedStudentList",
		getApprovedStudentListEffect,
	);

	yield takeLatest("teacher/getAllUsersList", getAllUsersEffect);
	yield takeLatest(
		"teacher/getActivityLogEventList",
		getActivityLogEventListEffect,
	);
	yield takeLatest(
		"teacher/getActivityLogClassList",
		getActivityLogClassListEffect,
	);
	yield takeLatest(
		"teacher/getActivityLogStudentsList",
		getActivityLogStudentsListEffect,
	);
	yield takeLatest(
		"teacher/getActivityLogFilterByStudent",
		getActivityLogFilterByStudentEffect,
	);
	yield takeLatest("teacher/getEventDataById", getEventByIdEffect);
	yield takeLatest("teacher/getAgEventDataById", getAgEventByIdEffect);
	yield takeLatest("teacher/getAlEventDataById", getAlEventByIdEffect);
	yield takeLatest("teacher/updateAlEvent", alUpdateEventEffect);
	yield takeLatest("teacher/updateAgEvent", agUpdateEventEffect);
	yield takeLatest("teacher/updateEvent", updateEventEffect);
	yield takeLatest("teacher/fgStoreStudentData", fgStoreStudentDataEffect);
	yield takeLatest("teacher/getUpdateFgEventOrder", updateFgEventOrderEffect);
	yield takeLatest(
		"teacher/fgStoreSingleStudentData",
		fgStoreSingleStudentDataEffect,
	);

	yield takeLatest("teacher/agStoreStudentData", agStoreStudentDataEffect);

	yield takeLatest("teacher/alStoreStudentData", alStoreStudentDataEffect);
	yield takeLatest(
		"teacher/getAgStudentResultById",
		getActivityGramStudentResultByIdEffect,
	);

	yield takeLatest(
		"teacher/getAlStudentResultById",
		getActivityLogStudentResultByIdEffect,
	);
	yield takeLatest(
		"teacher/postRejectedStudentList",
		postRejectedStudentEffect,
	);
}

export default teacherSaga;
