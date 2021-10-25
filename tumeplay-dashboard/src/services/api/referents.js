import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const ReferentApi = {
  findOne: (token, params) => {
    return axios.get(`${API_URL}/referents/${params.id}`,
     {headers: {
      Authorization: `Bearer ${token}`
    }});
  },
	update: (token, params) => {
		return axios.put(`${API_URL}/referents/${params.id}`, params, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
	}
}

export default ReferentApi;
