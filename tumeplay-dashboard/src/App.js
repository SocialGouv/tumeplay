import React, {useState, useEffect} from 'react'
 import './styles/index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Cookie from "js-cookie";
import AppContext from './AppContext';
import { createBrowserHistory } from 'history';

function App() {

  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const history = createBrowserHistory()



  const verifyAuthentication = (user) => {
    const token = Cookie.get("token");
    setToken(token);
    if(token) {
      setUser(user)
      setIsAuthenticated(true)
      history.push(`/orders/box/1`)
    } else {
      Cookie.remove('token')
    }
  }

  const logOut = () => {
    Cookie.remove('token')
    setIsAuthenticated(false)
  }

  useEffect(() => {
    verifyAuthentication()
  }, [])


  return (
    <AppContext.Provider value={
      {
        user: user,
        token: token,
        isAuthenticated: isAuthenticated,
        verifyAuthentication: verifyAuthentication,
        logOut: logOut
      }
    }>
      <Router history={history}>
        <Routes />
      </Router>
    </AppContext.Provider>
  );
}

export default App;
