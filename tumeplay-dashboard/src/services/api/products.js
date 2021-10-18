import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const searchProducts = (token, query) => {
  return axios.get(`${API_URL}/produits?_q=${query}&_limit=10`, {headers: {
    Authorization: `Bearer ${token}`
  }});
}

export default searchProducts;
