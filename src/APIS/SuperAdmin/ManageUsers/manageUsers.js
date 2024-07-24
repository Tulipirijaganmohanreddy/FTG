import BASE_URL from "../../index";

export const ManageUsersEndPoints = {
  getUsersData: `${BASE_URL}/users/getAllUserData`,
  getAllSuperAdmins: () =>
    `${BASE_URL}/users/getAllSuperAdmin`,
  getAllHelpDeskUsers: (skip) =>
    `${BASE_URL}/users/getAllhelpDesk?size=20&skip=${skip}`,
  deleteAdmin: (uuid) => `${BASE_URL}/users/${uuid}`,
};
