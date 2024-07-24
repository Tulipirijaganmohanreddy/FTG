import axios from "axios";
import { districtEndPoints as api } from "./district";

export const getEmails = async (data) => {
  const config = {
    method: "post",
    url: api.emailSetting(),
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json",
    },
    data: data?.body,
  };
  try {
    const response = await axios(config);

    return response.data;
  } catch (error) {}
};

export const mandatesApiShow = async (data) => {
  const config = {
    method: "post",
    url: api.mandatesApi(),
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

export const getDistrictForDistrictAdminApi = async (data) => {
  const config = {
    method: "get",
    url: api.getDistrictForDistrictAdmin(data.userId),
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios(config);

    return response;
  } catch (error) {
    throw error;
  }
};
export const getAutoPromote = async (data) => {
  const config = {
    method: "post",
    url: api.getAutoPromote,
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
    throw error.response.data;
  }
};

export const getMandateData = async (data) => {
  const config = {
    method: "post",
    url: api.getMandates(),
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

export const getTestItems = async (token) => {
  const config = {
    method: "get",
    url: api.getAllTestItems(),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {}
};

export const postMandate = async (data) => {
  const config = {
    method: "post",
    url: api.addMandate(),
    headers: {
      Authorization: `Bearer ${data?.token}`,
    },
    data: data?.finalObject,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMandate = async (data) => {
  const config = {
    method: "post",
    url: api.updateMandate(data.mandateId),
    headers: {
      Authorization: `Bearer ${data?.token}`,
    },
    data: data?.finalObject,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const rolesAndPrivilagesByRole = async (data) => {
  const config = {
    method: "get",
    url: api.getRolesAndPrivilegesByRole(data.selectedRole, data.district_uuid),
    headers: {
      Authorization: `Bearer ${data?.token}`,
    },
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateRolesAndPrivilages = async (data) => {
  const config = {
    method: "post",
    url: api.updateRolesAndPrivilages(),
    headers: {
      Authorization: `Bearer ${data?.token}`,
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

export const districtStatistics = async (data) => {
  const config = {
    method: "get",
    url: api.districtStatistics(data.uuid),
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const accessLogCounts = async (data) => {
  const config = {
    method: "get",
    url: api.getAccessLogsCount(data?.uuid),
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

export const updateDistrictForDistrictAdminApi = async (data) => {
  const config = {
    method: "post",
    url: api.updateDistrictForDistrictAdmin(data?.UUID),
    headers: {
      Authorization: `Bearer ${data?.token}`,
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

export const recievedNotificationsApi = async (data) => {
  const config = {
    method: "get",
    url: api.recievedNotifications(),
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

export const getStudentsListForReportsApi = async (data) => {
  const config = {
    method: "post",
    url: api.getStudentsListForReports(),
    headers: {
      Authorization: `Bearer ${data?.token}`,
    },
    data: data?.finalObj,
  };
  try {
    const response = await axios(config);

    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const overviewReportSummaryByClassApi = async (data) => {
  const config = {
    method: "post",
    url: api.overviewReportSummaryByClass(),
    headers: {
      Authorization: `Bearer ${data?.token}`,
    },
    data: data?.finalObj,
  };
  try {
    const response = await axios(config);

    return response;
  } catch (error) {
    return error;
  }
};

export const updateNotificationApproveRequestApi = async (data) => {
  const config = {
    method: "post",
    url: api.updateNotificationApproveStatus(),

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

export const deleteAnnouncementRequestApi = async (data) => {
  const config = {
    method: "delete",
    url: api.deleteAnnouncement(data.uuid),
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

export const getStates = async (data) => {
  const config = {
    method: "get",
    url: api.getStates(),
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

export const mergeUsersAPI = async (data) => {
  const config = {
    method: "post",
    url: api.mergeUsers(),

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

export const assignAndUnAssignUsers = async (data) => {
  const config = {
    method: "post",
    url: api.assignAndUnAssignUsers(),

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

export const changePasswordDA = async (data) => {
  const config = {
    method: "post",
    url: api.changePasswordDA(),

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

export const listOfImportErrorsApi = async (data) => {
  const config = {
    method: "get",
    url: api.listOfImportErrors(data),

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

export const deleteMandate = async (data) => {
  const config = {
    method: "delete",
    url: api.deleteMandate(data?.mandateId),

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

export const dataExport = async (data) => {
  const config = {
    method: "get",
    url: api.dataExport(),

    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  };
  try {
    const response = await axios(config);
    return response.data.response;
  } catch (error) {
    throw error.response.data;
  }
};

export const dataExportFilters = async (data) => {
  const config = {
    method: "post",
    url: api.dataExportFilters(),

    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.finalPayload,
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const completionReportApi = async (data) => {
  const config = {
    method: "post",
    url: api.completionReport(),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.body,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const completionReportCsvApi = async (data) => {
  const config = {
    method: "post",
    url: api.completionReportCsv,
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.body,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const overviewReportApi = async (data) => {
  const config = {
    method: "post",
    url: api.overviewReport,
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.body,
  };

  try {
    const response = await axios(config);
    return response.data.response;
  } catch (error) {
    throw error.response.data;
  }
};

export const getSchoolsInDistrictsForStateAndPartner = async (data) => {
  const config = {
    method: "post",
    url: api.schoolsInDistrictsForStateAndPartner(),

    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data.data,
  };
  try {
    const response = await axios(config);
    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export const schoolAcademicYear = async (data) => {
  const config = {
    method: "get",
    url: api.schoolAcademicYear(),

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

export const downloadAllStudentsReport = async (data) => {
  const config = {
    method: "post",
    url: api.downloadAllStudentsReport(),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.payload,
  };

  try {
    const response = await axios(config);

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const emailAllStudentsReport = async (data) => {
  const config = {
    method: "post",
    url: api.emailAllStudentsReport,
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.payload,
  };

  try {
    const response = await axios(config);

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getPartnerLicenses = async (data) => {
  const config = {
    method: "post",
    url: api.partnerLicenses,
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.body,
  };

  try {
    const response = await axios(config);

    return response.data.response;
  } catch (error) {
    throw error.response.data;
  }
};
export const getLicenseDistricts = async (data) => {
  //districts in licenses for state admin and partner in report filters
  const config = {
    method: "post",
    url: api.licenseDistricts,
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.body,
  };

  try {
    const response = await axios(config);
    return response.data.response;
  } catch (error) {
    throw error.response.data;
  }
};

export const uploadCsvToSftp = async (data) => {
  const config = {
    method: "post",
    url: api.uploadCsvSftp,
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "multipart/form-data",
    },
    data: data?.finalBody,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Initiate csv upload
export const initiateUpload = async (data) => {
  const config = {
    method: "post",
    url: api.initiateUpload,
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.body,
  };

  try {
    const response = await axios(config);
    return response.data.response;
  } catch (error) {
    throw error.response.data;
  }
};

export const uploadCsv = (data) => {
  const config = {
    method: "post",
    url: api.uploadCsv(data.uploadId),
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "multipart/form-data",
    },
    data: data?.body,
  };

  return axios(config);
};

export const completeUpload = async (data) => {
  const config = {
    method: "get",
    url: api.completeUpload(data.data),
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const promoteStudentsApi = async (data) => {
  const config = {
    method: "post",
    url: api.promoteStudents(),
    headers: {
      Authorization: `Bearer ${data?.token}`,
    },

    data: data?.body,
  };

  try {
    const response = await axios(config);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};


export const promoteStudentHistoryApi = async (data) => {

  const config = {

    method: "post",
    url : api.promoteStudentHistory(),
    headers : {
      Authorization : `Bearer ${data?.token}`
    },

    data: data?.body

  }


  try {
    const response = await axios(config)
    return response.data
  }

  catch(error){

    return error.response.data
  }


}