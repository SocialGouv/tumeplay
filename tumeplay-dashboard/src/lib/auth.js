import Cookie from "js-cookie";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

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

const forgotPassword = (email) => {
  if(typeof window === "undefined"){
    return;
  }
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/auth/forgot-password/`, {email: email})
    .then((res) => {
      resolve(res)
    })
    .catch((error) => {
      reject(error)
    })
  } )
}

const resetPassword = (password, passwordConfirmation, code) => {
  if(typeof window === "undefined"){
    return;
  }
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/auth/reset-password/`, {
			code,
			password,
			passwordConfirmation,
		})
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
	forgotPassword,
	resetPassword
};
