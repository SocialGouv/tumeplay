import Cookie from "js-cookie";
import axios from "axios";
import { useHistory } from "react-router";

const API_URL = "http://localhost:1337"


export const login = (identifier, password) => {
  let history = useHistory()
  if(typeof window === "undefined"){
    return;
  }
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/auth/local`, {identifier, password})
    .then((res) => {
      Cookie.set("token", res.data.jwt);
      resolve(res)
      history.push("/")
    })
    .catch((error) => {
      reject(error)
    })
  } )
}
