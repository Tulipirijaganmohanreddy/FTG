import { SSOConfigEndPoints as api } from "../SSOConfiguration/ssoconfig";
import axios from "axios";

export const AddSSOConfig = async (data) => {
  const config = {
    method: "post",
    url: api.addSSOConfig,
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

export const DeleteSSOConfig = async (data) => {
  const config = {
    method: "delete",
    url: api.deleteSSOConfig(data.uuid),
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

export const updateSSOConfig = async (data) => {
  const config = {
    method: "post",
    url: api.updateSSOConfigByID(data.id),
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

export const getSSoConfigByIdApi = async (data) => {
  const config = {
    method: "get",
    url: api.getSSoConfigById(data?.selectedSSOID),

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

export const getSSOConfigByFilterApi = async (data) => {
  const config = {
    method: "post",
    url: api.getSSOConfigByFilter(),
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
