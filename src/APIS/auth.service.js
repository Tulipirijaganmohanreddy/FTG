import axios from "axios";
import { authEndpoints as api } from "./auth";
import { data } from "autoprefixer";

export const login = async (data) => {
	try {
		const response = await axios.post(api.login, data, {
			"Content-Type": "application/json",
		});

		return response.data;
	} catch (error) {
		throw error;
	}
};

export const loginUser = async (data) => {
	const config = {
		method: "get",
		url: api.loginUserById(data.id),
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
	};
	try {
		const response = await axios(config);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const forgotUserName = async (data) => {
	const config = {
		method: "post",
		url: api.forgotUserName(),
		data,
	};

	try {
		const response = await axios(config);

		return response.data;
	} catch (error) {
		throw error;
	}
};

export const forgotPassword = async (data) => {
	const config = {
		method: "post",
		url: api.forgotPassword(),
		data,
	};

	try {
		const response = await axios(config);

		return response.data;
	} catch (error) {
		throw error;
	}
};

export const resetPassword = async (data) => {
	const config = {
		method: "post",
		url: api.resetPassword(),
		data: data.body,
	};

	try {
		const response = await axios(config);

		return response.data;
	} catch (error) {
		throw error;
	}
};

export const forgotDistrictCode = async (data) => {
	const config = {
		method: "post",
		url: api.forgotDistrictCode(),
		data: data.data,
	};

	try {
		const response = await axios(config);

		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getDistrictsByZipCode = async (data) => {
	const config = {
		method: "get",
		url: api.getDistrictsByZipCode(data?.zipcode),
	};

	try {
		const response = await axios(config);

		return response.data;
	} catch (error) {
		throw error;
	}
};

export const logOut = async (data) => {
	const config = {
		method: "post",
		url: api.logOut(),
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
	};
	try {
		const response = await axios(config);

		return response.data;
	} catch (error) {
		throw error;
	}
}

export const globalSearch = async (data) => {
	const config = {
		method: "post",
		url: api.globalSearch(),
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
		data: data.data,
	};
	try {
		const response = await axios(config);

		return response.data;
	} catch (error) {
		return error;
	}
};

export const changeRole = async (data) => {
	const config = {
		method: "post",
		url: api.changeRole,
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
		data: data.body,
	};
	try {
		const response = await axios(config);

		return response.data;
	} catch (error) {
		return error;
	}
};

export const changeUserName = async (data) => {
	const config = {
		method: "post",
		url: api.changeUserName(data.userId),
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
		data: data?.body,
	};
	try {
		const response = await axios(config);

		return response.data;
	} catch (error) {
		throw error;
	}
};

export const changePassword = async (data) => {
	const config = {
		method: "post",
		url: api.changePassword(data.userId),
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
		data: data?.body,
	};
	try {
		const response = await axios(config);

		return response.data;
	} catch (error) {
		throw error;
	}
};

export const userPrivileges = async (data) => {
	const config = {
		method: "get",
		url: api.userPrivileges(),
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
	};
	try {
		const response = await axios(config);

		return response.data;
	} catch (error) {
		throw error;
	}
};

export const refreshToken = async (data) => {
	const config = {
		method: "get",
		url: api.refreshToken(),
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
	};
	try {
		const response = await axios(config);

		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getNotificationsCountAPI = async (data) => {
	const config = {
		method: "get",
		url: api.getNotificationsCount(),
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
	};

	try {
		const response = await axios(config);

		return response.data;
	} catch (error) {
		throw error;
	}
};

export const notificationsRead = async (data) => {
	const config = {
		method: "get",
		url: api.notificationsRead(data.UUID),
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
	};

	try {
		const response = await axios(config);
		return response.data;
	} catch (error) {
		throw error;
	}
};
export const viewResource = async (data) => {
	const config = {
		method: "get",
		url: api.viewResource(data),
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
	};

	try {
		const response = await axios(config);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getReportPdf = async (data) => {
	const config = {
		method: "get",
		url: api.getReportPdf(data.uuid,data.fileName),
		headers: {
			Authorization: `Bearer ${data.token}`,
		},
	};

	try {
		const response = await axios(config);
		return response.data;
	} catch (error) {
		throw error;
	}
};
