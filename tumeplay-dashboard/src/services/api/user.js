import axios from "axios";

const URL = 'http://localhost:1337';

const UserApi = {
  retrieveUser: (token) => {
    return axios.get(`${URL}/users/me`,
     {headers: {
      Authorization: `Bearer ${token}`
    }});
  }
}

export default UserApi;
