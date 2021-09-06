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

const forgotPassword = (identifier) => {
  if(typeof window === "undefined"){
    return;
  }
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/auth/forgot-password/`, {email: identifier})
    .then((res) => {
      resolve(res)
    })
    .catch((error) => {
      reject(error)
    })
  } )
}

export {
	login,
	forgotPassword
};
