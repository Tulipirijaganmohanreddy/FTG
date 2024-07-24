import BASE_URL from "./index";
import DownloadReport from "../components/DownloadReport";

export const authEndpoints = {
	login: `${BASE_URL}/users/login`,

	loginUserById: (userId) => `${BASE_URL}/users/getUserById/${userId}`,

	changeRole: `${BASE_URL}/users/changeRole`,

	logOut: () => `${BASE_URL}/users/logout`,
	forgotUserName: () => `${BASE_URL}/users/forgotUsername`,
	forgotPassword: () => `${BASE_URL}/users/forgotPassword`,
	globalSearch: () => `${BASE_URL}/search`,
	forgotDistrictCode: () => `${BASE_URL}/users/forgotDistrictCode`,
	changeUserName: (userId) => `${BASE_URL}/users/changeUsername/${userId}`,
	changePassword: (userId) => `${BASE_URL}/users/changePassword/${userId} `,
	getDistrictsByZipCode: (zipcode) =>
		`${BASE_URL}/districts/getDistrictByZipcode/${zipcode}`,

	getNotificationsCount: () =>
		`${BASE_URL}/announcement/getCountOfNotification`,

	notificationsRead: (UUID) =>
		`${BASE_URL}/announcement/notificationIsRead/${UUID}`,
	viewResource: (data) =>
		`${BASE_URL}/files?filePath=${data?.filePath}&isDownload=${data?.isDownload}&module=${data?.module}`,
	getReportPdf: (uuid,fileName) => `${BASE_URL}/reports/getReportPdfUrl/${uuid}?file=${fileName}`,
	userPrivileges: () => `${BASE_URL}/privileges/loginUserPrivileges`,
	refreshToken: () => `${BASE_URL}/users/generateUserRefreshToken`,
	resetPassword: () => `${BASE_URL}/users/resetPassword`,
};
