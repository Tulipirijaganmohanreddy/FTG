import BASE_URL from "../..";

export const StatesPartnersEndPoints = {
  addState: `${BASE_URL}/states/addStates`,
  updateState: (uuid) => `${BASE_URL}/states/updateState/${uuid}`,
  getStates: `${BASE_URL}/states/getAllStates`,
  deleteState: (uuid) => `${BASE_URL}/states/deleteStateById/${uuid}`,

  getStateByFilter: () => `${BASE_URL}/states/getStateByFilter`,

  getStateById: (stateId) => `${BASE_URL}/states/getStateById/${stateId}`,

  updateStateById: (stateId) => `${BASE_URL}/states/updateState/${stateId}`,

  getDistrictsForStateOrPartner: () =>
    `${BASE_URL}/districts/getDistrictsForStateOrPartner`,
  getStateAdminsById: (stateId) =>
    `${BASE_URL}/states/getadminsById/${stateId}`,
  getStateOrPartnerLicenses: (stateId) =>
    `${BASE_URL}/states/getStateOrPartnerLicenses/${stateId}`,
};
