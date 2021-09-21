import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const UserApi = {
  retrieveUser: (token) => {
    return axios.get(`${API_URL}/users/me`,
     {headers: {
      Authorization: `Bearer ${token}`
    }});
  }
}

export default UserApi;
