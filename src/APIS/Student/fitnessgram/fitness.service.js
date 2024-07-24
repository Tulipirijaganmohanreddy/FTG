import axios from 'axios';
import { fitnessGramEndPoints as api } from '../fitnessgram/fitness';

export const studentFitnessGram = async (data) => {

  const config = {
    method: 'get',
    url: api.fitnessGram,
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    // data: data.body,
  };

  try {
    const response = await axios(config);

    return response;
  } catch (error) {
    return error;
  }
};

export const studentReportApi = async (data) => {


  

  const config = {
    method: 'post',
    url: api.studentReport,
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
