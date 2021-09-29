import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getAllBoxes = (token, slug) => {
  return axios.get(`${API_URL}/boxes?environnement.slug=${slug}`, {headers: {
    Authorization: `Bearer ${token}`
  }});
}

export default getAllBoxes;
