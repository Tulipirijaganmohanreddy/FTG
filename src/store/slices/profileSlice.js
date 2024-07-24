import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	loading2: false,
	loading3: false,
	upLoading: false,
	upLoading2: false,
	error: false,
	code: "",
	code2: "",
	message: "",
	response: "",
	errorResponse: null,
	isLogoutClicked: false,
	profile: {},
	user: {},
	userId: "",
	userRole: [],
	selectedRole: "",
	currentPath: "",
	districtsbyZipCode: {},
	token: null,
	smartCoachResponse: null,
	activityLogEvents: null,
	activityGramEventsList: null,
	loadingOne: false,
	loadingTwo: false,
	testSelectionResponse: null,
	testSelectionButtonClicked: false,
	activatingID: 1,
	forgotUserName: {},
	forgotMessage: {},
	hoveringID: null,
	basicUserInfo: {},
	navbarCardItemShow: false,
	UserData: {},
	logOutResponse: "",
	manageUser: {
		userType: "",
		formTitle: "",
		previousPath: "",
		tab: "",
	},
	recentResourcesByTest: [],
	loggedInUserDetails: null,
	openSideBar: true,
	forgotPassword: "",
	previousPath: "",
	globalSearchCategory: "All",
	globalSearchResults: null,
	validationCode: "",
	changeUserName: null,
	changePassword: null,
	duplicateRole: null,
	districtCode: null,
	selectedSuperAdminOption: {
		label: "Super Administrator",
		value: "superAdmin",
	},
	notificationsCount: 0,
	notificationsRead: null,
	userPrivileges: {},
	resetPassword: null,
	rolesAndPrevilegesObject: {},
	tokenExpTime: null,
	contactsKey: null,
	searchData: { category: "All", search: "" },

	rootLoggedInUserRole: null,
};

const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setLoading2: (state, action) => {
			state.loading2 = action.payload;
		},

		setLoading3: (state, action) => {
			state.loading3 = action.payload;
		},

		setUpLoading: (state, action) => {
			state.upLoading = action.payload;
		},
		setUpLoading2: (state, action) => {
			state.upLoading2 = action.payload;
		},
		setErrorResponse: (state, action) => {
			state.errorResponse = action.payload;
		},
		setResponse: (state, action) => {
			state.response = action.payload;
		},
		setLogoutClicked: (state, action) => {
			state.isLogoutClicked = action.payload;
		},
		setCode: (state, action) => {
			state.code = action.payload;
		},
		setCode2: (state, action) => {
			state.code2 = action.payload;
		},
		setMessage: (state, action) => {
			state.message = action.payload;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setUserId: (state, action) => {
			state.userId = action.payload;
		},

		setLoadingOne: (state, action) => {
			state.loadingOne = action.payload;
		},
		setCurrentPath: (state, action) => {
			state.currentPath = action.payload;
		},

		setLoadingTwo: (state, action) => {
			state.loadingTwo = action.payload;
		},

		setNavbarCardItemShow: (state, action) => {
			state.navbarCardItemShow = action.payload;
		},

		setToken: (state, action) => {
			state.token = action.payload;
		},
		setTokenExpTime: (state, action) => {
			state.tokenExpTime = action.payload;
		},

		setUserData: (state, action) => {
			state.UserData = action.payload;
		},
		setRecentResourcesByTest: (state, action) => {
			state.recentResourcesByTest = action.payload;
		},

		setManageUser: (state, action) => {
			state.manageUser = action.payload;
		},

		getUser: (state, action) => {},

		getUserRole: (state, action) => {},

		getUpdatedUser: (state, action) => {},

		setUserRole: (state, action) => {
			state.userRole = action.payload;
		},
		setResetPassword: (state, action) => {
			state.resetPassword = action.payload;
		},
		setSelectedRole: (state, action) => {
			state.selectedRole = action.payload;
		},

		setLoggedInUserDetails: (state, action) => {
			state.loggedInUserDetails = action.payload;
		},
		setDistrictsByZipCode: (state, action) => {
			state.districtsbyZipCode = action.payload;
		},

		getSmartCoach: (state, action) => {},

		getTestSelection: (state, action) => {},

		setSmartCoachResponse: (state, action) => {
			state.smartCoachResponse = action.payload;
		},

		setTestSelectionResponse: (state, action) => {
			state.testSelectionResponse = action.payload;
		},

		getActivityLogEvents: (state, action) => {},

		setActivityLogEvents: (state, action) => {
			state.activityLogEvents = action.payload;
		},

		setActivityGramEventsList: (state, action) => {
			state.activityGramEventsList = action.payload;
		},

		getActivityGramEventsList: (state, action) => {},

		setTestSelectionButtonClicked: (state, action) => {
			state.testSelectionButtonClicked = action.payload;
		},

		setActivatingID: (state, action) => {
			state.activatingID = action.payload;
		},

		setHoveringID: (state, action) => {
			state.hoveringID = action.payload;
		},

		setBasicUserInfo: (state, action) => {
			state.basicUserInfo = action.payload;
		},
		setLogOutResponse: (state, action) => {
			state.logOutResponse = action.payload;
		},
		setForgotUserName: (state, action) => {
			state.forgotUserName = action.payload;
		},
		setForgotPassword: (state, action) => {
			state.forgotPassword = action.payload;
		},
		setForgotMessage: (state, action) => {
			state.forgotMessage = action.payload;
		},
		setSearchData: (state, action) => {
			state.searchData = action.payload;
		},

		getForgotUserName: (state, action) => {},
		getForgotPassword: (state, action) => {},
		getForgotDistrictCode: (state, action) => {},
		getAllDistrictsByZipCode: (state, action) => {},

		getUserData: (state, action) => {},
		logOut: (state, action) => {},

		getRecommendedSmartCoachAPICall: (state, action) => {},
		getRecentResourcesByTest: (state, action) => {},

		getStudentReportApiCall: (state, action) => {},

		setOpenSideBar: (state, action) => {
			state.openSideBar = action.payload;
		},
		setPreviousPath: (state, action) => {
			state.previousPath = action.payload;
		},

		setGlobalSearchResults: (state, action) => {
			state.globalSearchResults = action.payload;
		},
		getGlobalSearchResults: (state, action) => {},

		setGlobalSearchCategory: (state, action) => {
			state.globalSearchCategory = action.payload;
		},
		setValidationCode: (state, action) => {
			state.validationCode = action.payload;
		},
		changeRole: (state, action) => {},

		setChangeUserName: (state, action) => {
			state.changeUserName = action.payload;
		},
		setChangePassword: (state, action) => {
			state.changePassword = action.payload;
		},
		postChangeUserName: (state, action) => {},
		postChangePassword: (state, action) => {},

		setDuplicateRole: (state, action) => {
			state.duplicateRole = action.payload;
		},
		setDistrictCode: (state, action) => {
			state.districtCode = action.payload;
		},
		setSelectedSuperAdminOption: (state, action) => {
			state.selectedSuperAdminOption = action.payload;
		},
		setUserPrivileges: (state, action) => {
			state.userPrivileges = action.payload;
		},
		getUserPrivileges: (state, action) => {},
		refreshToken: (state, action) => {},
		getResetPassword: (state, action) => {},

		getNotificationsCountAPICall: (state, action) => {},

		setNotificationsCount: (state, action) => {
			state.notificationsCount = action.payload;
		},

		getNotificationsReadAPICall: (state, action) => {},

		setNotificationsRead: (state, action) => {
			state.notificationsRead = action.payload;
		},

		setRolesAndPrevilegesObject: (state, action) => {
			state.rolesAndPrevilegesObject = action.payload;
		},
		setContactsKey: (state, action) => {
			state.contactsKey = action.payload;
		},
		getViewResource: (state, action) => {},
		getReportPdf: (state, action) => {},

		reset: () => {
			return initialState;
		},
	},
});

export const {
	getUser,
	setLoading,
	setLoading2,
	setUpLoading,
	setUpLoading2,
	setErrorResponse,
	setResponse,
	setLogoutClicked,
	setMessage,
	setCode,
	setCode2,
	setUser,
	setUserRole,
	setUserId,
	getUserRole,
	getUpdatedUser,
	getSmartCoach,
	getTestSelection,
	setTestSelectionResponse,
	setSmartCoachResponse,
	setToken,
	setSelectedRole,
	getActivityLogEvents,
	setActivityGramEventsList,
	getActivityGramEventsList,
	setActivityLogEvents,
	setLoadingOne,
	setLoadingTwo,
	setTestSelectionButtonClicked,
	setActivatingID,
	setHoveringID,
	setCurrentPath,
	setBasicUserInfo,
	setTokenExpTime,
	setSearchData,

	setNavbarCardItemShow,
	getUserData,
	setUserData,
	logOut,
	setLogOutResponse,
	setManageUser,
	getRecentResourcesByTest,
	getRecommendedSmartCoachAPICall,
	setRecentResourcesByTest,

	setLoggedInUserDetails,

	getStudentReportApiCall,
	setForgotUserName,
	getForgotUserName,
	setForgotPassword,
	getForgotPassword,
	getForgotDistrictCode,

	setOpenSideBar,
	setPreviousPath,

	setIsGlobalSearchClicked,
	setIsGlobalCapture,
	setGlobalSearchResults,
	getGlobalSearchResults,

	setGlobalSearchCategory,
	changeRole,
	setValidationCode,
	postChangeUserName,
	postChangePassword,
	setChangePassword,
	setDuplicateRole,
	setDistrictCode,
	setSelectedSuperAdminOption,
	setForgotMessage,
	getAllDistrictsByZipCode,
	setDistrictsByZipCode,

	getNotificationsCountAPICall,
	setNotificationsCount,

	getNotificationsReadAPICall,
	setNotificationsRead,

	setUserPrivileges,
	getUserPrivileges,
	setResetPassword,
	getResetPassword,
	setRolesAndPrevilegesObject,
	refreshToken,
	getViewResource,
	getReportPdf,
	setContactsKey,
	setLoading3,
	reset,
} = profileSlice.actions;
export default profileSlice;
