import Cookie from "js-cookie";
import axios from "axios";

const API_URL = "http://localhost:1337"

const login = (identifier, password) => {
  if(typeof window === "undefined"){
    return;
  }
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/auth/local/`, {identifier, password})
    .then((res) => {
      Cookie.set("token", res.data.jwt);
      resolve(res)
    })
    .catch((error) => {
      reject(error)
    })
  } )
}

export default login;
