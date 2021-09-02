import axios from "axios";

const URL = 'http://localhost:1337'
const OrdersAPI = {
  getOrders: (token) => {
    return axios.get(`${URL}/commandes?delivery=pickup&delivery=home&sent_ne=true`, {headers: {
      Authorization: `Bearer ${token}`
    }});
  },
  countOrders: (token) => {
    return axios.get(`${URL}/commandes/count`, {headers: {
      Authorization: `Bearer ${token}`
    }});
  },
  printMondialRelayPDF: (token, ids) => {
    return axios.post(`${URL}/mondial-relay/merge-pdf`, {ids: ids}, {headers: {
      Authorization: `Bearer ${token}`
    }});
  }
}

export default OrdersAPI;
