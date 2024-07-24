import BASE_URL from "../..";

export const SSOConfigEndPoints = {
    addSSOConfig : `${BASE_URL}/ssoConfigurations/addSsoConfiguration`,
    deleteSSOConfig : (id) => `${BASE_URL}/ssoConfigurations/deleteSsoConfiguration/${id}`,

    updateSSOConfigByID : (id) => `${BASE_URL}/ssoConfigurations/updateSsoConfiguration/${id}`,
    
    getSSoConfigById : (ID) => `${BASE_URL}/ssoConfigurations/getSsoConfigurationById/${ID}`,



    getSSOConfigByFilter : () => `${BASE_URL}/ssoConfigurations/getSsoConfigurationByFilter`,
    
}