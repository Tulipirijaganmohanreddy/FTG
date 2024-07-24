import axios from "axios";
import {RolesPrivileges as api} from "../RolesPrivileges/rolesprivileges";

export const GetAllAdminPrivileges = async(data) => {
    const config = {
        method : "get",
        url : api.getAdminPrivileges,
        headers : {
            Authorization : `${data.token}`
        }
    }

    try {
        const response = await axios(config);
        return response?.data?.response;
    }
    catch(error) {
        return error;
    }
}

export const GetHelpDeskPrivileges = async(data) => {
    const config = {
        method : "get",
        url : api.getHelpDeskPrivileges,
        headers : {
            Authorization : `${data.token}`
        }
    }

    try {
        const response = await axios(config);
        return response?.data?.response;
    }
    catch(error) {
        return error;
    }
}