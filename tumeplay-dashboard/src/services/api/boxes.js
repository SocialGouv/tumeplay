import axios from "axios";

const URL = 'http://localhost:1337'


const getAllBoxes = (token) => {
  return axios.get(`${URL}/boxes?environnement.name=Métropole`, {headers: {
    Authorization: `Bearer ${token}`
  }});
}

export default getAllBoxes;
