import BASE_URL from "../index";

export const teacherEndpoints = {
	schools: (data) =>
		`${BASE_URL}/userClass/getSchoolOfUser/${data?.userId}?district_uuid=${data?.districtId}`,
	classes: () => `${BASE_URL}/userClass/getClassOfUsers`,
	classesByEvent: (data) =>
		`${BASE_URL}/fitnessgram/getClassListOfEvent/${data.eventId}? search = ${data.searchTerm}   `,
	eventTestList: () => `${BASE_URL}/fitnessGram/getEventTestList`,
	eventStudentList: (eventId, pageNumber) =>
		`${BASE_URL}/fitnessGram/getEventStudentList/${eventId}`,

	recentEventTestList: () => `${BASE_URL}/fitnessGram/getRecentTestEventsList`,
	recommondedEventTestList: () =>
		`${BASE_URL}/fitnessGram/getRecommTestEventsList`,
	mandateEventTestList: () => `${BASE_URL}/mandates/getmandatesbyschool`,
	createEvent: () => `${BASE_URL}/fitnessGram/addEvent`,
	agCreateEvent: () => `${BASE_URL}/activityGram/addEvent`,
	alCreateEvent: () => `${BASE_URL}/challenges/createChallenge`,

	deleteEvent: (eventId) => `${BASE_URL}/fitnessGram/deleteEvent/${eventId}`,
	agDeleteEvent: (eventId) => `${BASE_URL}/activityGram/deleteEvent/${eventId}`,
	alDeleteEvent: () => `${BASE_URL}/challenges/deleteChallenge`,

	validatedList: (eventId) =>
		`${BASE_URL}/fitnessGram/getValidatedList/${eventId}`,
	pendingList: (eventId) => `${BASE_URL}/fitnessGram/getPendingList/${eventId}`,
	eventsList: (data) =>
		`${BASE_URL}/fitnessGram/getEvents?size=${100}&skip=${
			data.pageNumber
		}&sort=${data.sortCondition}&search=${data.searchTerm} `,
	fgEventsList: () => `${BASE_URL}/fitnessGram/getEventList`,
	eventById: (eventId) => `${BASE_URL}/fitnessGram/getEventById/${eventId}`,
	agEventById: (eventId) => `${BASE_URL}/activityGram/getEventById/${eventId}`,
	alEventById: (eventId) =>
		`${BASE_URL}/challenges/getChallengeById/${eventId}`,
	updateEventById: (eventId) =>
		`${BASE_URL}/fitnessGram/updateEvent/${eventId}`,
	updateAgEventById: (eventId) =>
		`${BASE_URL}/activityGram/updateEvent/${eventId}`,
	updateAlEventById: (eventId) =>
		`${BASE_URL}/challenges/updateChallenge/${eventId}`,

	approveStudentList: () => `${BASE_URL}/fitnessGram/approvePendingData`,
	rejectedStudentList: () => `${BASE_URL}/fitnessGram/rejectPendingData  `,

	// manage classes apis

	manageClasses: () => `${BASE_URL}/classes/getClasses`,
	filterManageClasses: () => `${BASE_URL}/classes/filterClasses`,
	studentsByClass: (classId) =>
		`${BASE_URL}/userClass/getStudentsByClass/${classId}`,

	// manage users apis

	getAllUsers: (skip) => `${BASE_URL}/users/getAllUserData`,
	activityGramEventList: (data) =>
		`${BASE_URL}/activityGram/getEvents?size=${20}&skip=${
			data.pageNumber
		}&sort=${data.sortCondition}&search=${data.searchTerm} `,
	activityGramEventStudentList: (eventId) =>
		`${BASE_URL}/activityGram/getEventStudentList/${eventId}`,
	activityLogEventsList: (data) =>
		`${BASE_URL}/challenges/getChallenges?size=${20}&skip=${
			data.pageNumber
		}&sort=${data.sortCondition}&search=${data.searchTerm} `,
	activityLogClassList: (challengeId) =>
		`${BASE_URL}/challenges/getChallengeById/${challengeId}`,
	activityLogEventStudentList: (challengeId) =>
		`${BASE_URL}/challenges/getStudentsForChallenge/${challengeId}`,
	activityLogFilterByStudent: () =>
		`${BASE_URL}/challenges/filterStudentsByClass`,

	fgStoreStudentData: () => `${BASE_URL}/fitnessGram/storeStudentData`,
	updateFgEventOrder: () => `${BASE_URL}/fitnessGram/updateEventOrder`,
	agStoreStudentData: () => `${BASE_URL}/activityGram/storeStudentData`,

	alStoreStudentData: () => `${BASE_URL}/challenges/storeStudentLogResults`,
	agStudentResultById: () => `${BASE_URL}/activityGram/getResultsForStudent`,
	alStudentResultById: () =>
		`${BASE_URL}/challenges/getActivityLogResultsByStudentId`,
};
