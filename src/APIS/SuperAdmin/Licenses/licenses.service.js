import { data } from "autoprefixer";
import axios from "axios";
import { LiencesEndPoints as api } from "./licenses";

export const getFundersListAPI = async (data) => {
  const config = {
    method: "post",
    url: api.fundersList(),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data.body,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    return error.response.data.code;
  }
};

export const createLicenseAPI = async (data) => {
  const config = {
    method: "post",
    url: api.createLicense,
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

export const getLicensesList = async (data) => {
  const config = {
    method: "post",
    url: api.getLicenses,
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data.body,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    return error.response.data.code;
  }
};

export const getLicenseDataById = async (data) => {
  const config = {
    method: "get",
    url: api.getLicenseById(data.id),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateLicenseById = async (data) => {
  const config = {
    method: "post",
    url: api.updateLicenseById,
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

export const getLicensedSchoolData = async (data) => {
  const config = {
    method: "post",
    url: api.getLicensedSchools(data.uuid),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.body,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteLicenseById = async (data) => {
  const config = {
    method: "delete",
    url: api.deleteLicense(data.uuid),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteSchoolLicense = async (data) => {
  const config = {
    method: "post",
    url: api.deleteSchoolLicense(),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.body,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    return error;
  }
};

export const getAllSchoolsToAddLicenseAPI = async (data) => {
  const config = {
    method: "post",
    url: api.schoolsToAddLicense,
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

export const addLicenseToSchoolAPI = async (data) => {
  const config = {
    method: "post",
    url: api.addLicenseToSchool,
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

export const getLicenseHistoryByIdAPI = async (data) => {
  const config = {
    method: "get",
    url: api.getLicenseHistoryById(data.id),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    return error.response.data.code;
  }
};

export const getEmailTemplateForContacts = async (data) => {
  const config = {
    method: "get",
    url: api.getEmailTemplates,
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    return error.response.data.code;
  }
};

export const addContactsToLicense = async (data) => {
  const config = {
    method: "post",
    url: api.addContacts,
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

export const getAllDistrictsOrSchoolBasedOnRoleAPI = async (data) => {
  const config = {
    method: "get",
    url: api.getAllDistrictsOrSchoolBasedOnRole(data.role, data.uuid, data.searchText),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    return error.response.data.code;
  }
}

export const getAllContactsForFunderAPI = async (data) => {
  const config = {
    method: "get",
    url: api.getAllContactsForFunder(data.id),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error.response.data.code;
  }
};

export const sendEmailsToContactsAPI = async (data) => {
  const config = {
    method: "post",
    url: api.sendEmailToContacts,
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data.body,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error.response.data.code;
  }
};

export const getEmailHistoryAPI = async (data) => {
  const config = {
    method: "get",
    url: api.getEmailHistory(data.district_uuid),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error.response.data.code;
  }
};

export const deleteLicenseContact = async (data) => {
  const config = {
    method: "post",
    url: api.deleteContact,
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

export const deleteEmailHistoryById = async (data) => {
  const config = {
    method: "delete",
    url: api.deleteEmailHistory(data.id),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    return error;
  }
};

export const exportLicensesAPI = async (data) => {
  const config = {
    method: "post",
    url: api.exportLicense,
    headers: {
      Authorization: `Bearer ${data?.token}`,
    },
    data: data?.body,
  };
  try {
    const response = await axios(config);
    return response.data.response;
  } catch (error) {
    throw error?.data?.response;
  }
};

export const updateSchoolDateAPI = async (data) => {
  const config = {
    method: "post",
    url: api.updateSchoolDate,
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

export const getAllContactsApi = async (data) => {
  const config = {
    method: "get",
    url: api.getAllContacts(
      data?.uuid,
      data?.license_uuid,
      data?.paginationBody?.size,
      data?.paginationBody?.skip,
      data?.paginationBody?.search,
      data?.paginationBody?.role,
    ),
    headers: {
      Authorization: `Bearer ${data?.token}`,
    },
  };

  try {
    const response = await axios(config);

    return response;
  } catch (error) {
    throw error;
  }
};

export const checkLicense = async (data) => {
  const config = {
    method: "get",
    url: api.checkLicense(data?.uuid),
    headers: {
      Authorization: `Bearer ${data?.token}`,
    },
  };

  try {
    const response = await axios(config);

    return response;
  } catch (error) {
    throw error;
  }
};
