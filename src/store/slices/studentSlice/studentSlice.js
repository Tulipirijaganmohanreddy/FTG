import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,

	studentFitnessGramEventsList: null,

	eventTestResult: [],


};

const studentSlice = createSlice({
	name: "student",
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		getStudentFitnessGramList: (state, action) => {},

		setStudentFitnessGramEventsList: (state, action) => {
			state.studentFitnessGramEventsList = action.payload;
		},

		setStudentSelectedEventCard: (state, action) => {
			state.studentSelectedEventCard = action.payload;
		},

		getTestResultsData: (state, action) => {},

		setEventTestResult: (state, action) => {
			state.eventTestResult = action.payload;
		},

		setUpdateStudentResponse: (state, action) => {
			state.updateStudentResponse = action.payload;
		},

		getUpdateStudentData: (state, action) => {},

		
		reset: () => {
			return initialState;
		},
	},
});

export const {
	reset,
	setLoading,
	setEventTestResult,
	getStudentFitnessGramList,
	setStudentFitnessGramEventsList,
	getTestResultsData,
	setUpdateStudentResponse,
	getUpdateStudentData,
} = studentSlice.actions;

export default studentSlice;
