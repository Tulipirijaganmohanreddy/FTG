import { data } from "autoprefixer";
import axios from "axios";
import { StatesPartnersEndPoints as api } from "../StatesPartners/states";

export const AddStates = async (data) => {
  const config = {
    method: "post",
    url: api.addState,
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data.body,
  };

  try {
    const result = await axios(config);
    return result.data;
  } catch (error) {
    // return error.response.data.message;

    throw error;
  }
};

export const UpdateState = async (data) => {
  const config = {
    method: "post",
    url: api.updateState(data.body.uuid),
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

export const GetAllStates = async (data) => {
  const config = {
    method: "post",
    url: api.getStates,
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

export const DeleteState = async (data) => {
  const config = {
    method: "delete",
    url: api.deleteState(data.uuid),
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





export const getStateByFilterApi = async (data) => {
  const config = {
    method: "post",
    url: api.getStateByFilter(),
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

export const getStateByIdApi = async (data) => {
  const config = {
    method: "get",

    url: api.getStateById(data?.stateId),

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

export const updateStateById = async (data) => {
  const config = {
    method: "post",
    url: api.updateStateById(data?.stateId),
    headers: {
      Authorization: `Bearer ${data?.token}`,
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

export const getDistrictsForStateOrPartnerApi = async (data) => {
  const config = {
    method: "post",
    url: api.getDistrictsForStateOrPartner(),
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

export const getStateAdminsById = async (data) => {
  const config = {
    method: "get",
    url: api.getStateAdminsById(data.stateId),
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

export const getStateOrPartnerLicenses = async (data) => {
  const config = {
    method: "get",
    url: api.getStateOrPartnerLicenses(data.stateId),
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
