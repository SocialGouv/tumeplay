import React, {useState, useEffect} from 'react'
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Cookie from "js-cookie";
import AppContext from './AppContext';
import { createBrowserHistory } from 'history';
import login from './lib/auth';



function App() {

  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const history = createBrowserHistory()



  const verifyAuthentication = (user) => {
    const token = Cookie.get("token");
    if(token) {
      setUser(user)
      setIsAuthenticated(true)
      history.push('/')
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
