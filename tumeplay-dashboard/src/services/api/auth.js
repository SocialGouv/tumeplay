import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const login = (identifier, password) => {
  if(typeof window === "undefined"){
    return;
  }
  return axios.post(`${API_URL}/auth/local/`, {identifier, password})
}

const forgotPassword = (email) => {
  if(typeof window === "undefined"){
    return;
  }
  return axios.post(`${API_URL}/auth/forgot-password/`, {email: email})
}

const resetPassword = (password, passwordConfirmation, code) => {
  if(typeof window === "undefined"){
    return;
  }
  axios.post(`${API_URL}/auth/reset-password/`, {
			code,
			password,
			passwordConfirmation,
		})
}

export {
	login,
	forgotPassword,
	resetPassword
};
