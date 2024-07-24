import { all, spawn } from "redux-saga/effects";
import profileSaga from "./profileSaga";
import teacherSaga from "./teacherSaga";
import schoolAdminSaga from "./schoolAdminSaga";
import studentSaga from "./StudentSaga/studentSaga";
import superAdminSaga from "./SuperAdminSaga/superAdminSaga";
import districtAdminSaga from "../../DistrictAdminApis/districtAdminSaga";

function* rootSaga() {
	yield spawn(profileSaga);
	yield spawn(teacherSaga);
	yield spawn(studentSaga);
	yield spawn(schoolAdminSaga);
	yield spawn(superAdminSaga);
	yield spawn(districtAdminSaga);
}

export default rootSaga;
