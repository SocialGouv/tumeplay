import React, {useContext, useState} from 'react'
import AppContext from '../../AppContext';
import login from '../../lib/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";


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
    <div className="container p-32">
      <h1>Connexion</h1>
      <form>
        <div class="relative flex w-full flex-wrap mb-3">
          <input type="text" value={info.identifier || ''} onChange={e => handleChange(e)} name='identifier' className="relative px-2 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-1/2 pr-10" />
          <span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 right-1 pr-2 py-1">
            <FontAwesomeIcon icon={faUser}/>
          </span>
        </div>
        <div class="relative flex w-full flex-wrap mb-3">
          <input type="password" value={info.password || ''} onChange={e => handleChange(e)} name='password' className="relative px-2 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-1/2 pr-10" />
          <span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 right-1 pr-2 py-1">
            <FontAwesomeIcon icon={faLock}/>
          </span>
        </div>
        <button onClick={() => {handleLogin()}} type="button" className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Se connecter</button>
      </form>
    </div>
  )
}

export default Login;
