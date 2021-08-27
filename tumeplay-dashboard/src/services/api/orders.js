import axios from "axios";

const URL = 'http://localhost:1337'

const getOrders = (token) => {
  return axios.get(`${URL}/commandes?delivery=pickup&delivery=home&sent_ne=true`, {headers: {
    Authorization: `Bearer ${token}`
  }});
}

export default getOrders;
