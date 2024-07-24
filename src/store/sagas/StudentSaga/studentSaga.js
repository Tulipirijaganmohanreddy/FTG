import { all } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
	enterTestResults,
	updateStudentData,
} from "../../../APIS/Student/enterTestResults/testResults.service";
import { studentFitnessGram } from "../../../APIS/Student/fitnessgram/fitness.service";
import {
	setStudentFitnessGramEventsList,
	setEventTestResult,
} from "../../slices/studentSlice/studentSlice";
import {
	setCode,
	setLoading,
	setMessage,
	setUpLoading,
} from "../../slices/profileSlice";
import { setStoreDataResponse } from "../../../features/teacher/teacherSlice";

function* studentFitnessGramListAPI(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(studentFitnessGram, action.payload);
		yield put(setStudentFitnessGramEventsList(response.data.response));

		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));

		yield put(setStudentFitnessGramEventsList(error));
	}
}

function* enterTestResultsAPI(action) {
	try {
		yield put(setLoading(true));
		const response = yield call(enterTestResults, action.payload);
		yield put(setEventTestResult(response));
		yield put(setLoading(false));
	} catch (error) {
		yield put(setLoading(false));
		yield put(setMessage(error.response.data.message));
	}
}

function* updateStudentDataResultEffect(action) {
	try {
		yield put(setUpLoading(true));

		const response = yield call(updateStudentData, action.payload);

		yield put(setUpdateStudentResponse(response?.data));
		yield put(setStoreDataResponse(response.data.code));

		yield put(setCode(response.data.code));
		yield put(setMessage(response.data.message));

		yield put(setUpLoading(false));
	} catch (error) {
		yield put(setUpLoading(false));

		yield put(setMessage(error.response.data.message));

		yield put(setUpdateStudentResponse(error));
	}
}

function* studentSaga() {
	yield takeLatest(
		"student/getStudentFitnessGramList",
		studentFitnessGramListAPI,
	);

	yield takeLatest("student/getTestResultsData", enterTestResultsAPI);

	yield takeLatest(
		"student/getUpdateStudentData",
		updateStudentDataResultEffect,
	);
}

export default studentSaga;
