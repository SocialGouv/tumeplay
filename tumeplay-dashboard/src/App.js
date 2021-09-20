import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Cookie from "js-cookie";
import AppContext from './AppContext';
import { createBrowserHistory } from 'history';
import UserApi from './services/api/user';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


function App() {

  const [user, setUser] = useState()
  const [token, setToken] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [role, setRole] = useState()
  const [userRetrieved, setUserRetrieved] = useState(false)
  const history = createBrowserHistory()

  const getUserInfos = async () => {
    let token = Cookie.get('token')
    setToken(token)
    let res = await UserApi.retrieveUser(token)
    if(res.status === 200) {
      setUser({...res.data})
      setRole(res.data.role.name)
      setIsAuthenticated(true)
    }
    setUserRetrieved(true)
  }


  useEffect(() => {
    getUserInfos()
  }, [])

  const verifyAuthentication = (user) => {
    const token = Cookie.get('token');
    setToken(token);
    if(token) {
      setUser({...user})
      if(user) {
        setRole(user.role.name)
      }
      setIsAuthenticated(true)
    } else {
      Cookie.remove('token')
    }
  }

  const logOut = () => {
    Cookie.remove('token')
    setIsAuthenticated(false)
  }

  return (
    <AppContext.Provider value={
      {
        user: user,
        token: token,
        role: role,
        isAuthenticated: isAuthenticated,
        verifyAuthentication: verifyAuthentication,
        logOut: logOut,
        userRetrieved: userRetrieved
        }
      }>
      <Router history={history}>
        <Routes />
      </Router>
    </AppContext.Provider>

  );
}

export default App;
