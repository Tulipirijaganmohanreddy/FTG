import {
	configureStore,
	applyMiddleware,
	combineReducers,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import profileReducer from "./slices/profileSlice";
import teacherReducer from "../features/teacher/teacherSlice";

import rootSaga from "../../src/store/sagas/index";
import studentReducer from "./slices/studentSlice/studentSlice";
import superAdminReducer from "./slices/superAdminSlice/superAdminSlice";
import schoolAdminReducer from "../features/authentication/components/schoolAdmin/schoolAdminSlice";
import districtReducer from "../DistrictAdminApis/districtAdminSlice";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
	profile: profileReducer.reducer,
	teacher: teacherReducer.reducer,
	student: studentReducer.reducer,
	superAdmin: superAdminReducer.reducer,
	schoolAdmin: schoolAdminReducer.reducer,
	districtAdmin: districtReducer.reducer,
})

const persistConfig = {
	key: "root",
	storage,
};
let middleware = [sagaMiddleware];
if (process.env.NODE_ENV === "development") {
	middleware = [...middleware, logger];
} else {
	middleware = [...middleware];
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => [
		...getDefaultMiddleware({
			serializableCheck: {
				ignoredPaths: ["districtAdmin.studentReportPdfData"], // Exclude this path from serialization check
			},
		}),
		...middleware,
	],
});
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export const resetStore = () => {
	store.dispatch(profileReducer.actions.reset());
	store.dispatch(studentReducer.actions.reset());
	store.dispatch(districtReducer.actions.reset());
	store.dispatch(schoolAdminReducer.actions.reset());
	store.dispatch(superAdminReducer.actions.reset());
	store.dispatch(teacherReducer.actions.reset());
};
