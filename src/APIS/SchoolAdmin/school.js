import BASE_URL from "../index";

export const schoolAdminEndPoint = {
	manageClasses: () => `${BASE_URL}/classes/getClasses`,

	assignSchoolAndClassToAdminUser: () =>
		`${BASE_URL}/userClass/assignSchoolAndClassToAdminUser`,

	assignSchoolAndClassToUser: () =>
		`${BASE_URL}/userClass/assignSchoolAndClassToUser`,

	addClassToManageClasses: () => `${BASE_URL}/classes/addClass`,

	manageUsersAssignment: (userUUID) =>
		`${BASE_URL}/users/getStudentById/${userUUID}`,

	userRolesListForManageUsers: () => `${BASE_URL}/users/accessUserTypes`,

	teachersByClassId: (classId) =>
		`${BASE_URL}/classes/getTeachersByClassId/${classId}`,
	schoolAdminGetAllClasses: (classId) =>
		`${BASE_URL}/classes/getClassById/${classId}`,

	schoolAdminStudentByClass: (classId, skip) =>
		`${BASE_URL}/userClass/getStudentsByClass/${classId}?size=${20}&skip=${skip}`,
	schoolAdminAddStudentClass: () => `${BASE_URL}/schools/getSchoolsForAdmin`,
	schoolAdminGetSchools: () =>
		`${BASE_URL}/userClass/assignSchoolAndClassToUser`,

	getSchoolAdminStudentDataByClass: (classID) =>
		`${BASE_URL}/userClass/getStudentsByClass/${classID}`,

	//nithish
	getSchools: (skip) => `${BASE_URL}/schools/getSchoolsForAdmin`,

	getTeachersBySchools: () => `${BASE_URL}/userClass/getTeachers`,

	getSchoolWithSchoolAdmin: (schoolId) =>
		`${BASE_URL}/schools/getSchoolWithSchoolAdmin/${schoolId}`,

	getTeachersBySchool: (schoolId) =>
		`${BASE_URL}/users/searchTeacherBySchoolId/${schoolId}`,

	roles: (schoolId) => `${BASE_URL}/users/searchTeacherBySchoolId/${schoolId}`,

	schoolAdminSchoolsOnly: () => {
		`${BASE_URL}/userClass/getClassOfUsers`;
	},

	addTeacherToClass: () =>
		`${BASE_URL}/userClass/assignSchoolAndClassToAdminUser`,

	requestToAddAdminForSchool: () =>
		`${BASE_URL}/userClass/requestToAddAdminForSchool`,

	updateSchool: (schoolId) => `${BASE_URL}/schools/updateSchool/${schoolId}`,

	addAnnouncement: () => `${BASE_URL}/announcement`,
	updateAnnouncement: (uuid) => `${BASE_URL}/announcement/${uuid}`,
	manageAnnouncement: (role, status, skip) =>
		`${BASE_URL}/announcement/getAnnouncement?role=${role}&status=${status}&size=${20}&skip=${skip}`,

	createSchoolAdmin: () => `${BASE_URL}/users/addUsers`,

	editTeacher: (teacherId) => `${BASE_URL}/users/editTeacher/${teacherId}`,

	getTeacherById: (teacherId) =>
		`${BASE_URL}/users/getTeacherById/${teacherId}`,

	addUsers: () => `${BASE_URL}/users/addUsers`,

	getStudentInfoBasedOnSchool: (schoolUUID) =>
		`${BASE_URL}/schools/GetStudentInfoBasedonSchool/${schoolUUID}`,

	getClassByID: (classUUID) => `${BASE_URL}/classes/getClassById/${classUUID}`,

	updateClassByID: (classUUID) =>
		`${BASE_URL}/classes/updateClassById/${classUUID}`,

	removeSchoolAdminFromSchool: (schoolUUID) =>
		`${BASE_URL}/schools/removeSchoolAdminFromSchool/${schoolUUID}`,

	removeAdminFromDistrict: (districtUUID) =>
		`${BASE_URL}/districts/removeAdminFromDistrict/${districtUUID}`,

	updateUsers: (userUUID) => `${BASE_URL}/users/updateUsers/${userUUID}`,

	getExportUsers: () => `${BASE_URL}/users/exportUsers `,
	getExportClasses: () => `${BASE_URL}/classes/exportClasses `,
	getCsvFileColumnNames: () => `${BASE_URL}/mappings/get-csv-file-column-names`,

	// getExportUsers:()=>`${BASE_URL}/users/exportUsers`,npm

	createMappingObject: () => `${BASE_URL}/mappings/create-mapping-object`,

	getMappingObjectList: (skip) =>
		`${BASE_URL}/mappings/get-mapping-object-list?size=${20}&skip=${skip}`,

	removeMappingObjects: (UUID) =>
		`${BASE_URL}/mappings/remove-mapping-object/${UUID}`,

	getTablesById: (UUID) => `${BASE_URL}/mappings/get-tables-by-id/${UUID}`,

	getMapObjDetailsById: (UUID) =>
		`${BASE_URL}/mappings/get-map-obj-details/${UUID}`,

	getImportHistory: (skip) =>
		`${BASE_URL}/mappings/get-import-history?size=${20}&skip=${skip}`,

	getImportSettings: () => `${BASE_URL}/importSettings/get-import-settings`,

	addUpdateImportSettings: () =>
		`${BASE_URL}/importSettings/add-update-import-settings`,

	rollBackImportData: (importId) =>
		`${BASE_URL}/mappings/rool-back-import-data/${importId}`,

	previewCsv: () => `${BASE_URL}/mappings/preview-csv`,

	uploadCsvToDB: () => `${BASE_URL}/mappings/upload-csv-to-db`,
	searchMapping: (searchTerm) =>
		`${BASE_URL}/mappings/search-mapping-name?mappingName=${searchTerm}`,

	editUserProfile: (userID) => `${BASE_URL}/users/editProfile/${userID}`,

	usersAction: () => `${BASE_URL}/users/usersAction`,

	classAction: () => `${BASE_URL}/classes/bulkDeleteClasses`,
	exportImportHistory: () =>
		`${BASE_URL}/mappings/export-import-history-details`,
	getFTPDetails: () => `${BASE_URL}/mappings/ftp-district-details`,
	exportErrors: () => `${BASE_URL}/mappings/export-preview-errors`,
	updateImportsEmailStatus: `${BASE_URL}/mappings/update-import-email-status`,


	getTeachersForLoginUser : () => `${BASE_URL}/userClass/getTeachersForLoginUser`,

	
};
