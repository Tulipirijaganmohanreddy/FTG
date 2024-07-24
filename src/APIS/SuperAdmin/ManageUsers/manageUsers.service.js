import axios from "axios";
import { ManageUsersEndPoints as api } from "../ManageUsers/manageUsers";

export const getManageUsersData = async (data) => {
  const config = {
    method: "get",
    url: api.getUsersData,
    headers: {
      Authorization: `${data.token}`,
    },
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    return error;
  }
};

export const getAllSuperAdminsDataAPI = async (data) => {
  const config = {
    method: "post",
    url: api.getAllSuperAdmins(),
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

export const getAllSuperAdminHelpDeskUsers = async (data) => {
  const config = {
    method: "get",
    url: api.getAllHelpDeskUsers(data.skip),
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

export const deleteAdminOrHelpDesk = async (data) => {
  const config = {
    method: "delete",
    url: api.deleteAdmin(data.uuid),
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
