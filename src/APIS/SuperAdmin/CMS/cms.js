import BASE_URL from "../../index";

export const CMSEndPoints = {
	AddContent: `${BASE_URL}/resources/addResources`,
	addEmailTemplate: `${BASE_URL}/resources/addEmailTemplates`,

	AddSubject: `${BASE_URL}/subject/addSubject`,
	GetSubject: `${BASE_URL}/subject/getAllSubject`,
	UpdateSubject: (uuid) => `${BASE_URL}/subject/updateSubjectById/${uuid}`,
	DeleteSubject: (uuid) => `${BASE_URL}/subject/deleteSubject/${uuid}`,
	GetResourceDataByFilters: `${BASE_URL}/resources/getResourceByCategory`,
	
	deleteCMSContentById: (id) =>
		`${BASE_URL}/resources/deleteResourcesById/${id}`,
	getTestsList: `${BASE_URL}/getTestList`,
	getAudienceList: `${BASE_URL}/getAudienceList`,
	activeInactiveSubject: (uuid) =>
		`${BASE_URL}/subject/activeInactiveSubject/${uuid}`,
	updateCMSContent: (uuid) =>
		`${BASE_URL}/resources/updateResourcesById/${uuid}`,
	updateEmailTemplate: (uuid) =>
		`${BASE_URL}/resources/updateEmailTemplateById/${uuid}`,
	getDistrictsForRoleChange: `${BASE_URL}/districts/getAllDistrictsForSuperAdmin`,
	superAdminChangeRole:`${BASE_URL}/users/changeRole`,
};
