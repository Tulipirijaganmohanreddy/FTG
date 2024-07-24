import BASE_URL from "../index";

export const smartEndPoints = {
	smartCoach: () => `${BASE_URL}/resources/getRecentResources`,
	testSelection: () => `${BASE_URL}/resources/getAllResources`,



	getRecommendedSmartCoach: () => `${BASE_URL}/resources/getRecentResources`,
	getRecentResourcesByTest:() =>`${BASE_URL}/resources/getRecentResourcesByTest`
	
};
