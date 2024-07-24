const BASE_URL_OBJ = {
  production: `https://api.fitnessgram.net/api`,

  staging: `https://api.fitnessgram.com/api`,

	development: `http://52.205.6.23:5001/api`,	
};
const BASE_URL = BASE_URL_OBJ[import.meta.env.VITE_APP_ENV];
export default BASE_URL;
