import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const UserApi = {
  retrieveUser: (token) => {
    return axios.get(`${API_URL}/users/me`,
     {headers: {
      Authorization: `Bearer ${token}`
    }});
  },
  changePassword: (token, params) => {
    return axios.post(`${API_URL}/users/change-password`, params, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
  },
  changeUsername: (token, params) => {
    return axios.post(`${API_URL}/users/change-username`, params, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
  }
}

export default UserApi;
