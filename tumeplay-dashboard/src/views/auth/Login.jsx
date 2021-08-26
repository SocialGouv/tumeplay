import React, {useContext, useState} from 'react'
import AppContext from '../../AppContext';
import login from '../../lib/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import logo from '../../assets/pictures/full-logo.png'


const Login = () => {

  const context = useContext(AppContext)

  const [info, setInfo] = useState({
    identifier: "",
    password: ""
  })

  const handleChange = (e) => {
    e.preventDefault();
    info[e.target.name] = e.target.value;
    setInfo({...info})
  }

  const handleLogin = async () => {
    const res = await login(info.identifier, info.password)
    if(res.status === 200) {
      context.verifyAuthentication(res.data.user)
    }
  }

  return(
    <div className="mx-auto px-4 w-screen h-screen">
      <div className="flex content-center items-center justify-center align-middle h-full">
        <div className="w-full lg:w-5/12 my-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center content-center mb-3">
                <img className="w-auto h-auto object-cover mx-auto" src={logo} alt="" />
                <h1 className="text-blueGray-500 text-4.5xl font-bold" >Connexion</h1>
                <form onSubmit={() => {handleLogin()}} >
                  <div className="mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    >
                      Email
                    </label>
                    <input type="text" value={info.identifier || ''} onChange={e => handleChange(e)} name='identifier' className="relative px-2 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow outline-none w-1/2 pr-10 focus:outline-none focus:ring ease-linear transition-all duration-150" />
                    <span className="z-10 leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pr-4 py-1">
                      <FontAwesomeIcon icon={faUser}/>
                    </span>
                  </div>
                  <div className="mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    >
                      Mot de passe
                    </label>
                    <div className="relative">
                      <input type="password" value={info.password || ''} onChange={e => handleChange(e)} name='password' className="z-10 px-2 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow outline-none w-1/2 pr-10 focus:outline-none focus:ring ease-linear transition-all duration-150" />
                      <span className="z-20 leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pr-4 py-1">
                        <FontAwesomeIcon icon={faLock}/>
                      </span>
                    </div>
                  </div>
                  <button onClick={() => {handleLogin()}} type="button" className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Se connecter</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
