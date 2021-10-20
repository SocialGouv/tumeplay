import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import Routes from './Routes';
import Cookie from "js-cookie";
import AppContext from './AppContext';
import { createBrowserHistory } from 'history';
import UserApi from './services/api/user';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { GrowlScene } from '@crystallize/react-growl';


function App() {

  const [user, setUser] = useState()
  const [token, setToken] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [role, setRole] = useState()
  const [loading, setLoading] = useState(true)
  const history = createBrowserHistory()

  const getUserInfos = async () => {
    let token = Cookie.get('token')
    if (!token) {
      <Redirect to="/login" />
    } else {
      setToken(token)
      let res = await UserApi.retrieveUser(token)
      if(res.status === 200) {
        setUser({...res.data})
        setRole(res.data.role.name)
        setIsAuthenticated(true)
      }
    }
		setLoading(false)
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
        logOut: logOut
			}
		}>
        {
					loading ?
						<div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center text-center bg-white z-50">
							<h1 className="text-xl text-lightBlue-800">En cours de chargement...</h1>
							<Loader type="Puff"
											color='#105985'
											height={200}
											width={200}
											/>
						</div>
						:
						<Router history={history}>
							<Routes />
							<GrowlScene />
						</Router>
        }
    </AppContext.Provider>

  );
}

export default App;
