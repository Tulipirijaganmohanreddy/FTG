import axios from 'axios';

import { testResultsEndPoints as api } from './testResults';

export const enterTestResults = async (data) => {

  const config = {
    method: 'post',
    url: api.testResults,
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

export const updateStudentData = async (data) => {

  const config = {
    method: 'post',
    url: api.updateStudentResult,
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
