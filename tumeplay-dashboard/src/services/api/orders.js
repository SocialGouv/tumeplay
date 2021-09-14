import axios from "axios";

const URL = 'http://localhost:1337'
const OrdersAPI = {
  getOrders: (token, searchParam) => {
    return axios.get(`${URL}/commandes?delivery=pickup&delivery=home${searchParam}`, {headers: {
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
  },
  printColissimoPDF: (token, ids) => {
    return axios.post(`${URL}/colissimo/generate-pdf`, {ids: ids}, {headers: {
      Authorization: `Bearer ${token}`
    }});
  },
  setOrdersToSent: (token, orders) => {
    return axios.put(`${URL}/orders/bulks`, {orders: orders}, {headers: {
      Authorization: `Bearer ${token}`
    }});
  },
}

export default OrdersAPI;
