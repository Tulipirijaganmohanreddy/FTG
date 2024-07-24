import axios from "axios";
import { schoolAdminEndPoint as api } from "./school";

export const getManageClasses = async (data) => {
  const config = {
    method: "post",
    url: api.manageClasses(),
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json",
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

export const getSchoolAdminGetAllClasses = async (data) => {
  const config = {
    method: "get",
    url: api.schoolAdminGetAllClasses(data.classId),
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

export const getSchoolAdminStudentByClasses = async (data) => {
  const config = {
    method: "get",
    url: api.schoolAdminStudentByClass(data.classId, data.skip),

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

export const getStudentDataSchoolAdminAPi = async (data) => {
  const config = {
    method: "get",
    url: api.getSchoolAdminStudentDataByClass(data.classId),
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

export const getAddTeacherToManageClass = async (data) => {
  const config = {
    method: "post",
    url: api.assignSchoolAndClassToAdminUser(),

    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json",
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

export const getAddStudentToClassApi = async (data) => {
  const config = {
    method: "post",
    url: api.assignSchoolAndClassToUser(),
    headers: {
      Authorization: `Bearer ${data.token}`,

      "Content-Type": "application/json",
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

export const getManageUsersAssignmentApi = async (data) => {
  const config = {
    method: "get",
    url: api.manageUsersAssignment(data.userUUID),
    headers: {
      Authorization: `Bearer ${data.token}`,

      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    return error;
  }
};

export const getTeachersListByClassIdApi = async (data) => {
  const config = {
    method: "get",
    url: api.teachersByClassId(data.classId),
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

export const getAddToStudentTable = async (data) => {
  const config = {
    method: "post",
    url: api.schoolAdminGetSchools(),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.body,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {}
};

export const getAllSchoolsOnly = async (data) => {
  const config = {
    method: "post",
    url: api.schoolAdminSchoolsOnly(),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.body,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {}
};

export const getTeachersBySchoolApi = async (data) => {
  const config = {
    method: "post",
    url: api.getTeachersBySchool(data.schoolId),
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

export const getSchoolsApi = async (data) => {
  const config = {
    method: "post",
    url: api.getSchools(data.skip),

    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.finalBody,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getSchoolWithSchoolAdminApi = async (data) => {
  const config = {
    method: "get",
    url: api.getSchoolWithSchoolAdmin(data.schoolId),
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

export const getaddTeacherToClassApi = async (data) => {
  const config = {
    method: "post",
    url: api.addTeacherToClass(),

    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.payloadBody,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const requestToAddAdminForSchoolApi = async (data) => {
  const config = {
    method: "post",
    url: api.requestToAddAdminForSchool(),

    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.payloadBody,
  };
  try {
    const response = await axios(config);

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateSchoolApi = async (data) => {
  const config = {
    method: "post",
    url: api.updateSchool(data.schoolId),

    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.inputs,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addAnnouncement = async (data) => {
  const config = {
    method: "post",
    url: api.addAnnouncement(),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data.finalObj,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateAnnouncement = async (data) => {
  const config = {
    method: "post",
    url: api.updateAnnouncement(data?.uuid),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data.finalObj,
  };

  try {
    const response = await axios(config);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const getManageAnnouncements = async (data) => {
  const config = {
    method: "get",
    url: api.manageAnnouncement(data.role, data.status, data.skip),
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

export const getAddClassToManageClasses = async (data) => {
  const config = {
    method: "post",
    url: api.addClassToManageClasses(),
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

export const createSchoolAdminApi = async (data) => {
  const config = {
    method: "post",
    url: api.createSchoolAdmin(),

    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.reqBody,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    return error;
  }
};

export const editTeacherApi = async (data) => {
  const config = {
    method: "post",
    url: api.editTeacher(data.teacherId),

    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.reqBody,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    return error;
  }
};

export const getTeacherByIdApi = async (data) => {
  const config = {
    method: "get",
    url: api.getTeacherById(data.teacherId),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {}
};

export const getUserRolesListForManageUsersApi = async (data) => {
  const config = {
    method: "get",
    url: api.userRolesListForManageUsers(),
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

export const addUserApi = async (data) => {
  const config = {
    method: "post",
    url: api.addUsers(),

    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.finalPayload,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getTeachersBySchoolsApi = async (data) => {
  const config = {
    method: "post",
    url: api.getTeachersBySchools(),
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

export const getTeachersForLoginUserApi = async (data) => {
  const config = {
    method: "post",
    url: api.getTeachersForLoginUser(),
    headers: {
      Authorization: `Bearer ${data?.token}`,
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

export const getStudentInfoBasedOnSchoolApi = async (data) => {
  const config = {
    method: "post",
    url: api.getStudentInfoBasedOnSchool(data.schoolId),
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

export const getClassByIDApi = async (data) => {
  const config = {
    method: "get",
    url: api.getClassByID(data.classId),
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

export const updateClassByIDApi = async (data) => {
  const config = {
    method: "post",
    url: api.updateClassByID(data.classId),
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

export const removeSchoolAdminFromSchoolApi = async (data) => {
  const config = {
    method: "post",
    url: api.removeSchoolAdminFromSchool(data.schoolId),

    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.finalPayload,
  };
  try {
    const response = await axios(config);

    return response;
  } catch (error) {
    throw error;
  }
};

export const removeAdminFromDistrictApi = async (data) => {
  const config = {
    method: "delete",
    url: api.removeAdminFromDistrict(data.districtUUID),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },

    data: data?.finalPayload,
  };

  try {
    const response = await axios(config);

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateUsersApi = async (data) => {
  const config = {
    method: "post",
    url: api.updateUsers(data.UserId),

    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.finalPayload,
  };
  try {
    const response = await axios(config);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const getCsvFileColumnNamesApi = async (data) => {
  const config = {
    method: "post",
    url: api.getCsvFileColumnNames(),

    headers: {
      Authorization: `Bearer ${data.token}`,

      "Content-Type": "multipart/form-data",
    },

    data: data?.finalBody,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getExportUsers = async (data) => {
  const config = {
    method: "post",
    url: api.getExportUsers(),

    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.body,
  };
  try {
    const response = await axios(config);
    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export const getExportClasses = async (data) => {
  const config = {
    method: "post",
    url: api.getExportClasses(),

    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.body,
  };
  try {
    const response = await axios(config);
    return response.data.response;
  } catch (error) {
    return error;
  }
};

export const createMappingObjectApi = async (data) => {
  const config = {
    method: "post",
    url: api.createMappingObject(),

    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.finalBody,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getMappingObjectListApi = async (data) => {
  const config = {
    method: "get",
    url: api.getMappingObjectList(data.skip),
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

export const removeMappingObjectsApi = async (data) => {
  const config = {
    method: "delete",
    url: api.removeMappingObjects(data.uuid),
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

export const getTablesByIdApi = async (data) => {
  const config = {
    method: "get",
    url: api.getTablesById(data.uuid),
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

export const getMapObjDetailsByIdApi = async (data) => {
  const config = {
    method: "get",
    url: api.getMapObjDetailsById(data.uuid),
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

export const getImportHistoryApi = async (data) => {
  const config = {
    method: "get",
    url: api.getImportHistory(data.skip),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  };

  try {
    const response = await axios(config);

    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const getImportSettingsApi = async (data) => {
  const config = {
    method: "get",
    url: api.getImportSettings(),
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

export const addUpdateImportSettingsApi = async (data) => {
  const config = {
    method: "post",
    url: api.addUpdateImportSettings(),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.finalBody,
  };

  try {
    const response = await axios(config);

    return response;
  } catch (error) {
    throw error;
  }
};

export const rollBackImportDataApi = async (data) => {
  const config = {
    method: "post",
    url: api.rollBackImportData(data.importId),
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

export const previewCsvApi = async (data) => {
  const config = {
    method: "post",
    url: api.previewCsv(),

    headers: {
      Authorization: `Bearer ${data.token}`,

      "Content-Type": "multipart/form-data",
    },

    data: data?.finalBody,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const exportErrors = async (data) => {
  const config = {
    method: "get",
    url: api.exportErrors(),

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

export const updateImportsEmailStatus = async (data) => {
  const config = {
    method: "post",
    url: api.updateImportsEmailStatus,

    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data.body,
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const searchMapping = async (data) => {
  const config = {
    method: "get",
    url: api.searchMapping(data?.searchTerm),

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

export const uploadCsvToDBApi = async (data) => {
  const config = {
    method: "post",
    url: api.uploadCsvToDB(),

    headers: {
      Authorization: `Bearer ${data.token}`,

      "Content-Type": "multipart/form-data",
    },

    data: data?.finalBody,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getFTPDetails = async (data) => {
  const config = {
    method: "get",
    url: api.getFTPDetails(),

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

export const editUserProfileApi = async (data) => {
  const config = {
    method: "post",
    url: api.editUserProfile(data?.userID),

    headers: {
      Authorization: `Bearer ${data.token}`,
    },

    data: data?.finalBody,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const usersAction = async (data) => {
  const config = {
    method: "post",
    url: api.usersAction(),

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

export const classAction = async (data) => {
  const config = {
    method: "post",
    url: api.classAction(),

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

export const exportImportHistory = async (data) => {
  const config = {
    method: "get",
    url: api.exportImportHistory(),

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
