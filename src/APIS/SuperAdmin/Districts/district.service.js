import axios from "axios";
import { districtsEndPoints as api } from "../Districts/district";

export const addNewDistrict = async (data) => {
  const config = {
    method: "post",
    url: api.AddDistricts,
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data.body,
  };

  try {
    const response = await axios(config);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateDistrictData = async (data) => {
  const config = {
    method: "post",
    url: api.UpdateDistricts(data.body.uuid),
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

export const DeleteDistrictData = async (data) => {
  const config = {
    method: "delete",
    url: api.DeleteDistrict(data.uuid),
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

export const AddSchool = async (data) => {
  const config = {
    method: "post",
    url: api.addSchool,
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

export const AddAdminUser = async (data) => {
  const config = {
    method: "post",
    url: api.createAdminUser,
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

export const EditTeacherUser = async (data) => {
  const config = {
    method: "post",
    url: api.editTeacherInfo(data.uuid),
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

export const getSchoolsApi = async (data) => {
  const config = {
    method: "post",
    url: api.getSchools,

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

export const getTeachersAPI = async (data) => {
  const config = {
    method: "get",
    url: api.getTeachers(data.schoolId),
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

export const getAdminByDistrictAPI = async (data) => {
  const config = {
    method: "get",
    url: api.getDistrictAdmin(data.districtId),
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

export const getSchoolsByDistrictIDAPI = async (data) => {
  const config = {
    method: "post",
    url: api.getSchoolsByDistrictId(data.districtId),
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

export const getDistrictByFilterAPI = async (data) => {
  const config = {
    method: "post",
    url: api.getDistrictByFilter(),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data.formData,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateSchoolById = async (data) => {
  const config = {
    method: "post",
    url: api.updateSchool(data.body.uuid),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data.body,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {}
};

export const AssignAdminToDistrictById = async (data) => {
  const config = {
    method: "post",
    url: api.assignAdminToDistrict(data.districtId),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data.body,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {}
};
export const updateAdminUsersById = async (data) => {
  const config = {
    method: "post",
    url: api.updateAdminDetails(data.id),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data.body.formData,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {}
};

export const deleteAdminUserById = async (data) => {
  const config = {
    method: "delete",
    url: api.deleteAdminUser(data.districtId),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data.body,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {}
};

export const GetSchoolAdminsBySchoolId = async (data) => {
  const config = {
    method: "get",
    url: api.getSchoolAdminsBySchoolId(data.schoolId),
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

export const GetTeachersAndSchoolsByDistrictId = async (data) => {
  const config = {
    method: "get",
    url: api.getSchoolsAndTeacherofDistrict(data.districtId),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  };
  try {
    const response = await axios(config);

    return response;
  } catch (error) {}
};

export const GetUsersDataById = async (data) => {
  const config = {
    method: "get",
    url: api.getUsersDataById(data.userId),
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

export const RemoveSchool = async (data) => {
  const config = {
    method: "delete",
    url: api.removeSchool(data.uuid),
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

export const GetUniqueFieldsDataAPI = async (data) => {
  const config = {
    method: "post",
    url: api.checkUniqueFields,
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data.body,
  };
  try {
    const response = await axios(config);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const GetClassesOfUsersAPI = async (data) => {
  const config = {
    method: "post",
    url: api.getClassOfUsers,
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

export const getDistrictAdminUsersToDistrict = async (data) => {
  const config = {
    method: "post",
    url: api.getDistrictAdminUsersToDistrict(data.district_uuid),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.body,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getMetricsReport = async (data) => {
  const config = {
    method: "get",
    url: api.getMetricsReport(),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  };
  try {
    const response = await axios(config);
    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export const getExportContact = async (data) => {

  const config = {
    method: "post",
    url: api.getExportContact(),
    headers: {
      Authorization: `Bearer ${data?.token}`,
    },
  };

  try {
    const response = await axios(config);
    return response.data.response;
  } catch (error) {
    throw error;
  }
};
