import { CMSEndPoints as api } from "../CMS/cms";
import axios from "axios";

export const AddCMSContent = async (data) => {
	const config = {
		method: "post",
		url: api.AddContent,
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
		data: data.body,
	};

	try {
		const response = await axios(config);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const AddCMSEmailTemplate = async (data) => {
	const config = {
		method: "post",
		url: api.addEmailTemplate,
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
		data: data.body,
	};

	try {
		const response = await axios(config);
		return response;
	} catch (error) {
		throw error;
	}
};


export const AddCMSSubject = async (data) => {
	const config = {
		method: "post",
		url: api.AddSubject,
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
		data: data.body,
	};

	try {
		const response = await axios(config);
		return response;
	} catch (error) {
		return error.response.data.message;
	}
};

export const GetCMSSubject = async (data) => {
	const config = {
		method: "get",
		url: api.GetSubject,
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
	};

	
	try {
		const response = await axios(config);
		return response?.data?.response;
	} catch (error) {
		return error;
	}
};

export const UpdateCMSSubject = async (data) => {
	const config = {
		method: "post",
		url: api.UpdateSubject(data.uuid),
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
		data: data.body,
	};

	try {
		const response = await axios(config);
		return response;
	} catch (error) {
		return error;
	}
};

export const DeleteCMSSubject = async (data) => {
	const config = {
		method: "delete",
		url: api.DeleteSubject(data.uuid),
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
		data: data.body,
	};

	try {
		const result = await axios(config);
		return result;
	} catch (error) {
		return error.response.data.message;
	}
};

export const getResourcesByFiltersAPI = async (data) => {
	const config = {
		method: "post",
		url: api.GetResourceDataByFilters,
		data: data?.body,
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
	};

	try {
		const result = await axios(config);
		return result?.data;
	} catch (error) {
		throw error;
	}
};



export const DeleteCMSContentById = async (data) => {
	const config = {
		method: "delete",
		url: api.deleteCMSContentById(data.id),
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
	};

	try {
		const result = await axios(config);
		return result;
	} catch (error) {
		return error;
	}
};



export const GetCMSTestsList = async () => {
	const config = {
		method: "get",
		url: api.getTestsList,
	};

	try {
		const result = await axios(config);
		return result?.data?.response?.data;
	} catch (error) {
		return error;
	}
};

export const GetCMSAudienceList = async () => {
	const config = {
		method: "get",
		url: api.getAudienceList,
	};

	try {
		const result = await axios(config);
		return result?.data?.response?.data;
	} catch (error) {
		return error;
	}
};

export const ActiveInactiveSubject = async (data) => {
	const config = {
		method: "post",
		url: api.activeInactiveSubject(data.subjectId),
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
		data: data.body,
	};

	try {
		const result = await axios(config);
		return result;
	} catch (error) {
		return error;
	}
};

export const UpdateCMSContent = async (data) => {
	const config = {
		method: "post",
		url: api.updateCMSContent(data.contentId),
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
		data: data.body,
	};
	try {
		const result = await axios(config);
		return result.data;
	} catch (error) {
		throw error;
	}
};

export const updateEmailTemplateById = async (data) => {
	const config = {
		method: "post",
		url: api.updateEmailTemplate(data.contentId),
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
		data: data.body,
	};
	try {
		const result = await axios(config);
		return result;
	} catch (error) {
		throw error;
	}
};

export const getDistrictsForRoleChange = async (data) => {
	const config = {
		method: "post",
		url: api.getDistrictsForRoleChange,
		headers: {
			Authorization: `Bearer ${data?.token}`,
		},
		data: data.body,
	};
	try {
		const result = await axios(config);
		return result;
	} catch (error) {
		throw error;
	}
};

export const getSuperAdminChangeRole = async (data) => {
	const config = {
		method: "post",
		url: api.superAdminChangeRole,
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
		data: data.body,
	};
	try {
		const result = await axios(config);
		return result;
	} catch (error) {
		throw error;
	}
};
