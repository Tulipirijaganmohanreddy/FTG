import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	loading: false,
	error: false,

	schools: [],

	classes: [],
	allUsers: [],

	manageClasses: [],

	filteredManageClasses: [],
	studentsByClass: [],

	validatedList: null,

	schoolAdminGetAllClasses: [],
	schoolAdminStudentByClasses: [],
	schoolAdminAddToTeacherClasses: [],

	addStudentManageClass: [],

	teachersListByClassId: [],

	token: null,

	schoolAdminGetStudentByClassResponse: null,

	schoolsOnly: [],

	addStudentToAll: [],
	SchoolsForAdmin: [],

	SchoolWithSchoolAdmin: [],

	TeachersBySchool: [],
	addTeacherResCode: null,

	addTeacherToManageClassApiResponse: null,

	classData: null,

	addStudentToClassApiResponse: null,

	manageUsersAssignmentApiResponse: null,

	TeachersBySchool: [],

	AddTeacherToClass: [],

	RequestToAddAdminForSchool: [],

	UpdateSchool: [],

	AddAnnouncementData: [],
	ManageAnnouncementData: [],

	CreateSchoolAdmin: [],

	EditTeacher: [],

	GetTeacherById: [],

	ResponseCode: null,

	AddResCode: null,

	userRolesList: null,

	// ResponseCode: null

	manageUsersSelectedDropdownText: "",

	previousValuesOfAddUser: null,

	addTeacherModalButtonClicked: null,

	schoolsListItemsToShow: [],

	classesListItemsToShow: [],

	ResponseCode: null,

	AddResCode: null,

	teachersListBySchools: null,

	greenLitePath: null,

	requestToAddAdmin: false,

	studentInfoBasedOnSchool: [],

	selectedClassDetails: null,

	updateClassByIdResponse: null,

	requestToAddAdmin: false,

	studentInfoBasedOnSchool: [],

	selectedClassDetails: null,

	updateClassByIdResponse: null,

	removeSchoolAdminFromSchool: null,

	removeAdminFromDistrict: null,

	csvColumnsNames: [],
	removeSchoolAdminFromSchool: null,

	removeAdminFromDistrict: null,

	exportUsers: [],
	exportErrors: [],
	createMappingObject: {},
	getMappingObjectList: [],
	exportClasses: [],

	removeMappingObjects: null,
	getTablesById: [],
	getMapObjDetailsById: [],
	getImportHistory: [],
	getImportSettings: {},
	addUpdateImportSettings: {},
	rollBackImportData: null,
	previewCsv: null,
	getMappingObj: {
		mappingId: "",
		dataSet: "",
	},

	uploadCsvToDB: null,
	// activeTabVal:1

	editUserResponse: null,
	usersAction: null,
	classAction: null,
	exportImportHistory: null,
	searchedMappings: [],
	FTPDetails: null,


	teachersListForEvents : []


};

const schoolAdminSlice = createSlice({
	name: "schoolAdmin",
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setSchools: (state, action) => {
			state.schools = action.payload;
		},
		setClasses: (state, action) => {
			state.classes = action.payload;
		},
		setAllUsers: (state, action) => {
			state.allUsers = action.payload;
		},

		setSchoolsOnly: (state, action) => {
			state.schoolsOnly = action.payload;
		},

		setManageClasses: (state, action) => {
			state.manageClasses = action.payload;
		},
		setStudentsByClass: (state, action) => {
			state.studentsByClass = action.payload;
		},
		setFilteredManageClasses: (state, action) => {
			state.filteredManageClasses = action.payload;
		},
		setEventTestList: (state, action) => {
			state.eventTestList = action.payload;
		},
		setRecentEventTestList: (state, action) => {
			state.recentEventTestList = action.payload;
		},
		setRecommondedEventTestList: (state, action) => {
			state.recommondedEventTestList = action.payload;
		},
		setValidatedList: (state, action) => {
			state.validatedList = action.payload;
		},

		setSchoolAdminGetAllClasses: (state, action) => {
			state.schoolAdminGetAllClasses = action.payload;
		},

		setSchoolAdminStudentByClasses: (state, action) => {
			state.schoolAdminStudentByClasses = action.payload;
		},

		setSchoolAdminAddToTeacherClasses: (state, action) => {
			state.schoolAdminStudentByClasses = action.payload;
		},

		setAddStudentManageClass: (state, action) => {
			state.addStudentManageClass = action.payload;
		},

		setTeachersListByClassId: (state, action) => {
			state.teachersListByClassId = action.payload;
		},

		setAddStudentToAll: (state, action) => {
			state.addStudentToAll = action.payload;
		},
		setResponseCode: (state, action) => {
			state.ResponseCode = action.payload;
		},

		setSchoolWithSchoolAdmin: (state, action) => {
			state.SchoolWithSchoolAdmin = action.payload;
		},

		setTeachersBySchool: (state, action) => {
			state.TeachersBySchool = action.payload;
		},

		setSchoolsForAdmin: (state, action) => {
			state.SchoolsForAdmin = action.payload;
		},

		setAddResCode: (state, action) => {
			state.AddResCode = action.payload;
		},

		setPreviousValuesOfAddUser: (state, action) => {
			state.previousValuesOfAddUser = action.payload;
		},

		getAddTeacherToManageClassApiCall: (state, action) => {},

		getAddStudentToClassApiCall: (state, action) => {},

		getAddClassToManageClassesApiCall: (state, action) => {},

		setAddTeacherResCode: (state, action) => {
			state.addTeacherResCode = action.payload;
		},

		setAddTeacherToManageClassApiResponse: (state, action) => {
			state.addTeacherToManageClassApiResponse = action.payload;
		},

		setAddTeacherToClass: (state, action) => {
			state.AddTeacherToClass = action.payload;
		},

		setRequestToAddAdminForSchool: (state, action) => {
			state.RequestToAddAdminForSchool = action.payload;
		},

		setUpdateSchool: (state, action) => {
			state.UpdateSchool = action.payload;
		},

		getUpdateAnnouncement: (state, action) => {},

		setManageAnnouncementData: (state, action) => {
			state.ManageAnnouncementData = action.payload;
		},

		setCreateSchoolAdmin: (state, action) => {
			state.CreateSchoolAdmin = action.payload;
		},

		setEditTeacher: (state, action) => {
			state.EditTeacher = action.payload;
		},

		setCsvColumnsNames: (state, action) => {
			state.csvColumnsNames = action.payload;
		},
		setGetTeacherById: (state, action) => {
			state.GetTeacherById = action.payload;
		},

		setAddTeacherResCode: (state, action) => {
			state.addTeacherResCode = action.payload;
		},

		setAddResCode: (state, action) => {
			state.AddResCode = action.payload;
		},

		setResponseCode: (state, action) => {
			state.ResponseCode = action.payload;
		},

		setAddTeacherModalButtonClicked: (state, action) => {
			state.addTeacherModalButtonClicked = action.payload;
		},

		setSchoolsListItemsToShow: (state, action) => {
			state.schoolsListItemsToShow = action.payload;
		},

		setClassesListItemsToShow: (state, action) => {
			state.classesListItemsToShow = action.payload;
		},

		setGreenLitePath: (state, action) => {
			state.greenLitePath = action.payload;
		},

		setRemoveSchoolAdminFromSchool: (state, action) => {
			state.removeSchoolAdminFromSchool = action.payload;
		},

		setRemoveAdminFromDistrict: (state, action) => {
			state.removeAdminFromDistrict = action.payload;
		},

		setExportUsers: (state, action) => {
			state.exportUsers = action.payload;
		},
		setExportErrors: (state, action) => {
			state.exportErrors = action.payload;
		},
		setExportClasses: (state, action) => {
			state.exportClasses = action.payload;
		},

		setCreateMappingObject: (state, action) => {
			state.createMappingObject = action.payload;
		},
		setGetMappingObjectList: (state, action) => {
			state.getMappingObjectList = action.payload;
		},

		setRemoveMappingObjects: (state, action) => {
			state.removeMappingObjects = action.payload;
		},
		setGetTablesById: (state, action) => {
			state.getTablesById = action.payload;
		},
		setGetMapObjDetailsById: (state, action) => {
			state.getMapObjDetailsById = action.payload;
		},
		setGetImportHistory: (state, action) => {
			state.getImportHistory = action.payload;
		},

		setGetImportSettings: (state, action) => {
			state.getImportSettings = action.payload;
		},

		setAddUpdateImportSetting: (state, action) => {
			state.addUpdateImportSettings = action.payload;
		},

		setRollBackImportData: (state, action) => {
			state.rollBackImportData = action.payload;
		},

		setPreviewCsv: (state, action) => {
			state.previewCsv = action.payload;
		},

		setGetMappingObj: (state, action) => {
			state.getMappingObj = action.payload;
		},

		setUploadCsvToDB: (state, action) => {
			state.uploadCsvToDB = action.payload;
		},

		setUsersAction: (state, action) => {
			state.usersAction = action.payload;
		},
		setClassAction: (state, action) => {
			state.classAction = action.payload;
		},
		setExportImportHistory: (state, action) => {
			state.exportImportHistory = action.payload;
		},
		setSearchedMappings: (state, action) => {
			state.searchedMappings = action.payload;
		},
		setFTPDetails: (state, action) => {
			state.FTPDetails = action.payload;
		},

		// setActiveTabVal:(state,action) =>{
		//   state.activeTabVal = action.payload;
		// },

		getAddStudentManageClasses: (state, action) => {},

		getTeachersListByClassIdApiCall: (state, action) => {},

		getSchoolsList: (state, action) => {},
		getClassesList: (state, action) => {},
		getAllUsersList: (state, action) => {},
		getManageClassesList: (state, action) => {},

		getSchoolAdminGetAllClasses: (state, action) => {},

		getSchoolAdminStudentByClassesCall: (state, action) => {},
		getSchoolAdminAddToTeacherClasses: (state, action) => {},

		setSchoolAdminGetStudentByClassResponse: (state, action) => {
			state.schoolAdminGetStudentByClassResponse = action.payload;
		},

		getSchoolAdminClassStudentCall: (state, action) => {},

		setClassData: (state, action) => {
			state.classData = action.payload;
		},

		setAddStudentToClassApiResponse: (state, action) => {
			state.addStudentToClassApiResponse = action.payload;
		},

		getManageUsersAssignmentApiCall: (state, action) => {},

		setManageUsersAssignmentApiResponse: (state, action) => {
			state.manageUsersAssignmentApiResponse = action.payload;
		},

		getUserRolesListForManageUsersApiCall: (state, action) => {},

		setUserRolesList: (state, action) => {
			state.userRolesList = action.payload;
		},

		setManageUsersSelectedDropdownText: (state, action) => {
			state.manageUsersSelectedDropdownText = action.payload;
		},

		getAddStudentToAll: (state, action) => {},

		getAdminSchoolsOnly: (state, action) => {},
		getSchoolsForAdmin: (state, action) => {},

		getSchoolWithSchoolAdmin: (state, action) => {},

		getTeachersBySchool: (state, action) => {},

		getTeachersBySchoolForAddTeacherToClassModalEffect:(state, action) => {},

		getAddTeacherToClass: (state, action) => {},

		getRequestToAddAdminForSchool: (state, action) => {},

		getUpdateSchool: (state, action) => {},

		getAccouncementData: (state, action) => {},

		getManageAnnouncementData: (state, action) => {},

		getCreateSchoolAdmin: (state, action) => {},

		getEditTeacher: (state, action) => {},

		getGetTeacherById: (state, action) => {},

		getAddUsers: (state, action) => {},

		getTeachersBySchoolsApiCall: (state, action) => {},

		setTeachersListForEvents : (state, action) => {

			state.teachersListForEvents = action.payload;

		},

		getTeachersForLoginUserApiCall : (state, action) => {},

		setTeachersListBySchools: (state, action) => {
			state.teachersListBySchools = action.payload;
		},

		setRequestToAddAdmin: (state, action) => {
			state.requestToAddAdmin = action.payload;
		},

		setStudentInfoBasedOnSchool: (state, action) => {
			state.studentInfoBasedOnSchool = action.payload;
		},

		getStudentInfoBasedOnParticularSchoolApi: (state, action) => {},

		getClassByIDApiCall: (state, action) => {},

		setSelectedClassDetails: (state, action) => {
			state.selectedClassDetails = action.payload;
		},

		getUpdateClassByIDApiCall: (state, action) => {},

		setUpdateClassByIdResponse: (state, action) => {
			state.updateClassByIdResponse = action.payload;
		},

		getRemoveSchoolAdminFromSchool: (state, action) => {},

		getRemoveAdminFromDistrict: (state, action) => {},

		getUpdateClassByIDApiCall: (state, action) => {},

		setUpdateClassByIdResponse: (state, action) => {
			state.updateClassByIdResponse = action.payload;
		},

		getRemoveSchoolAdminFromSchool: (state, action) => {},

		getRemoveAdminFromDistrict: (state, action) => {},

		getUpdateUsers: (state, action) => {},

		getCsvColumnsNames: (state, action) => {},
		getExportUsers: (state, action) => {},
		getCreateMappingObject: (state, action) => {},

		getGetMappingObjectList: (state, action) => {},
		getRemoveMappingObjects: (state, action) => {},
		getGetTablesById: (state, action) => {},
		getGetMapObjDetailsById: (state, action) => {},
		getGetImportHistory: (state, action) => {},
		getGetImportSettings: (state, action) => {},
		getExportClasses: (state, action) => {},
		getAddUpdateImportSettings: (state, action) => {},
		getRollBackImportData: (state, action) => {},
		getPreviewCsv: (state, action) => {},
		getUploadCsvToDB: (state, action) => {},

		getEditUserProfileApiCall: (state, action) => {},
		getUsersAction: (state, action) => {},
		getClassAction: (state, action) => {},
		getExportImportHistory: (state, action) => {},
		getSearchMappings: (state, action) => {},

		setEditUserResponse: (state, action) => {
			state.editUserResponse = action.payload;
		},
		getFTPDetails: (state, action) => {},
		getExportErrors: (state, action) => {},
		getUpdateImportsEmailStatus: (state, action) => {},

		reset: () => {
			return initialState;
		},
	},
});

export const {
	reset,
	setLoading,
	setSchools,
	setClasses,
	setManageClasses,
	setFilteredManageClasses,
	setStudentsByClass,

	getSchoolsList,
	getClassesList,
	getFilteredManageClassesList,
	getAllUsersList,
	getManageClassesList,
	getStudentListByClass,

	getSchoolAdminGetAllClasses,
	getSchoolAdminStudentByClassesCall,
	getSchoolAdminAddToTeacherClasses,

	setSchoolAdminGetAllClasses,
	setSchoolAdminStudentByClasses,
	setSchoolAdminAddToTeacherClasses,

	setSchoolAdminGetStudentByClassResponse,

	getSchoolAdminClassStudentCall,

	setTeachersListByClassId,

	getTeachersListByClassIdApiCall,

	setAddStudentManageClass,

	getAddTeacherToManageClassApiCall,
	setAddTeacherToManageClassApiResponse,

	setClassData,

	setAddStudentToClassApiResponse,
	getAddStudentToClassApiCall,

	getManageUsersAssignmentApiCall,
	setManageUsersAssignmentApiResponse,

	getAddClassToManageClassesApiCall,

	setAddStudentToAll,
	getAddStudentToAll,

	setSchoolsOnly,
	getAdminSchoolsOnly,
	setSchoolsForAdmin,
	getSchoolsForAdmin,

	setSchoolWithSchoolAdmin,
	getSchoolWithSchoolAdmin,

	setTeachersBySchool,
	getTeachersBySchoolForAddTeacherToClassModalEffect,
	getTeachersBySchool,

	setAddTeacherToClass,
	getAddTeacherToClass,

	setRequestToAddAdminForSchool,
	getRequestToAddAdminForSchool,

	setUpdateSchool,
	getUpdateSchool,

	getAccouncementData,
	setManageAnnouncementData,
	getManageAnnouncementData,

	setCreateSchoolAdmin,
	getCreateSchoolAdmin,

	setEditTeacher,
	getEditTeacher,

	setGetTeacherById,
	getGetTeacherById,

	setResponseCode,

	setAddResCode,

	setAddTeacherResCode,

	// setResponseCode

	setUserRolesList,
	getUserRolesListForManageUsersApiCall,
	setManageUsersSelectedDropdownText,

	getAddUsers,

	setPreviousValuesOfAddUser,

	setAddTeacherModalButtonClicked,
	setClassesListItemsToShow,
	setSchoolsListItemsToShow,

	getTeachersBySchoolsApiCall,
	setTeachersListBySchools,

	setGreenLitePath,

	setRequestToAddAdmin,

	setStudentInfoBasedOnSchool,
	getStudentInfoBasedOnParticularSchoolApi,

	getClassByIDApiCall,
	setSelectedClassDetails,

	setCsvColumnsNames,
	getCsvColumnsNames,

	getUpdateClassByIDApiCall,

	setUpdateClassByIdResponse,

	getRemoveSchoolAdminFromSchool,
	setRemoveSchoolAdminFromSchool,

	getRemoveAdminFromDistrict,
	setRemoveAdminFromDistrict,

	getUpdateUsers,
	getExportUsers,
	setExportUsers,
	setCreateMappingObject,
	getCreateMappingObject,

	getExportClasses,
	setExportClasses,

	setGetMappingObjectList,
	getGetMappingObjectList,

	setRemoveMappingObjects,
	getRemoveMappingObjects,

	setGetTablesById,
	getGetTablesById,

	setGetMapObjDetailsById,
	getGetMapObjDetailsById,

	setGetImportHistory,
	getGetImportHistory,

	setGetImportSettings,
	getGetImportSettings,

	setAddUpdateImportSetting,
	getAddUpdateImportSettings,

	setRollBackImportData,
	getRollBackImportData,

	setPreviewCsv,
	getPreviewCsv,

	setGetMappingObj,

	setUploadCsvToDB,
	getUploadCsvToDB,

	// setActiveTabVal,

	getEditUserProfileApiCall,
	setEditUserResponse,

	setUsersAction,
	getUsersAction,

	getClassAction,
	setClassAction,

	setExportImportHistory,
	getExportImportHistory,
	getUpdateAnnouncement,
	setSearchedMappings,
	getSearchMappings,
	setFTPDetails,
	getFTPDetails,
	setExportErrors,
	getExportErrors,
	getUpdateImportsEmailStatus,

	getTeachersForLoginUserApiCall,
	setTeachersListForEvents,


} = schoolAdminSlice.actions;
export default schoolAdminSlice;
