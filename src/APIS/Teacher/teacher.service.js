import axios from "axios";
import { teacherEndpoints as api } from "./teacher";

export const getSchools = async (data) => {
  const config = {
    method: "get",
    url: api.schools(data),
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

export const getClasses = async (data) => {
  const config = {
    method: "post",
    url: api.classes(),
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

export const getClassesByEvent = async (data) => {
	const config = {
		method: "get",
		url: api.classesByEvent(data.body),

    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios(config);

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getEventTestList = async (token) => {
  const config = {
    method: "get",
    url: api.eventTestList(),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getValidatedList = async (data) => {
  const config = {
    method: "get",
    url: api.validatedList(data.eventId),
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

export const getPendingList = async (data) => {
  const config = {
    method: "get",
    url: api.pendingList(data.eventId),
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

export const getRecentTestEventsList = async (data) => {
  const config = {
    method: "post",
    url: api.recentEventTestList(),
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

export const getRecommondedEventTestList = async (data) => {
  const config = {
    method: "post",
    url: api.recommondedEventTestList(),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data.schools,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMandateEventTestList = async (data) => {
  const config = {
    method: "post",
    url: api.mandateEventTestList(),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.schools,
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const postEvent = async (data) => {
  const config = {
    method: "post",
    url: api.createEvent(),
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json",
    },
    data: data?.payload,
  };
  try {
    const response = await axios(config);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const agPostEvent = async (data) => {
  const config = {
    method: "post",
    url: api.agCreateEvent(),
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json",
    },
    data: data?.payload,
  };
  try {
    const response = await axios(config);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const alPostEvent = async (data) => {
  const config = {
    method: "post",
    url: api.alCreateEvent(),
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json",
    },
    data: data?.payload,
  };
  try {
    const response = await axios(config);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEvent = async (data) => {
  const config = {
    method: "post",
    url: api.deleteEvent(data.eventId),
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

export const agDeleteEvent = async (data) => {
  const config = {
    method: "post",
    url: api.agDeleteEvent(data.eventId),
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
    return error;
  }
};

export const alDeleteEvent = async (data) => {
  const config = {
    method: "post",
    url: api.alDeleteEvent(),
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
    return error;
  }
};

export const getEventsList = async (data) => {
  const config = {
    method: "post",
    url: api.eventsList(data.data),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: {
      teachers: data?.data?.teacherUUIDs,
    },
  };
  try {
    const response = await axios(config);

    return response;
  } catch (error) {
    throw error;
  }
};

export const getFgEventsList = async (data) => {
  const config = {
    method: "get",
    url: api.fgEventsList(),
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

export const getEventById = async (data) => {
  const config = {
    method: "get",
    url: api.eventById(data.eventId),
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

export const getAgEventById = async (data) => {
  const config = {
    method: "get",
    url: api.agEventById(data.eventId),
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

export const getAlEventById = async (data) => {
  const config = {
    method: "get",
    url: api.alEventById(data.eventId),
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
export const updateEventById = async (data) => {
  const config = {
    method: "post",
    url: api.updateEventById(data.eventId),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.payload,
  };
  try {
    const response = await axios(config);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAlEventById = async (data) => {
  const config = {
    method: "post",
    url: api.updateAlEventById(data.eventId),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data.payload,
  };
  try {
    const response = await axios(config);

    return response;
  } catch (error) {
    throw error;
  }
};
export const updateAgEventById = async (data) => {
  const config = {
    method: "post",
    url: api.updateAgEventById(data.eventId),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data?.payload,
  };
  try {
    const response = await axios(config);

    return response;
  } catch (error) {
    throw error;
  }
};
export const getEventStudentList = async (data) => {
  const config = {
    method: "post",
    url: api.eventStudentList(data.eventId, data.pageNumber),
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

export const updateFgEventOrder = async (data) => {
  const config = {
    method: "post",
    url: api.updateFgEventOrder(),
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

export const getApproveStudentList = async (data) => {
  const config = {
    method: "post",
    url: api.approveStudentList(),
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

export const fgStoreStudentData = async (data) => {
  const config = {
    method: "post",
    url: api.fgStoreStudentData(),
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
export const agStoreStudentData = async (data) => {
  const config = {
    method: "post",
    url: api.agStoreStudentData(),
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

export const alStoreStudentData = async (data) => {
  const config = {
    method: "post",
    url: api.alStoreStudentData(data.token),
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
export const getAgStudentResultById = async (data) => {
  const config = {
    method: "post",
    url: api.agStudentResultById(),
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
export const getAlStudentResultById = async (data) => {
  const config = {
    method: "post",
    url: api.alStudentResultById(),
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
    return error;
  }
};

export const getFilteredManageClasses = async (data) => {
  const config = {
    method: "post",
    url: api.filterManageClasses(),
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

export const getStudentsByClass = async (data) => {
  const config = {
    method: "get",
    url: api.studentsByClass(data.classId),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllUsers = async (data) => {
  const config = {
    method: "post",
    url: api.getAllUsers(),
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
export const getActivityGramEventsList = async (data) => {
  const config = {
    method: "get",
    url: api.activityGramEventList(data?.data),
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

export const getActivityGramEventStudentList = async (data) => {
  const config = {
    method: "get",
    url: api.activityGramEventStudentList(data.eventId),
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

export const getActivityLogEventList = async (data) => {
  const config = {
    method: "get",
    url: api.activityLogEventsList(data.data),
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

export const getActivityLogClassList = async (data) => {
  const config = {
    method: "get",
    url: api.activityLogClassList(data.challengeId),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {}
};

export const getActivityLogStudentsList = async (data) => {
  const config = {
    method: "get",
    url: api.activityLogEventStudentList(data.challengeId),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {}
};

export const getActivityLogFilterByStudent = async (data) => {
  const config = {
    method: "post",
    url: api.activityLogFilterByStudent(),
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

export const rejectedStudentList = async (data) => {
  const config = {
    method: "post",
    url: api.rejectedStudentList(),
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
