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

  return (
    <>
			<div className="flex content-center items-center justify-center h-screen">
				<div className="w-full m-auto lg:w-4/12 px-4">
					<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
						<div className="flex-auto px-4 lg:px-10 py-10 pt-0">
							<div className="rounded-t mb-0 px-6 py-6">
								<div className="text-center mb-4 mt-2">
									<img src={logo} className="w-64 mx-auto"/>
								</div>
								<div className="text-center mb-3">
									<h6 className="text-blueGray-500 text-sm font-bold">
										Espace de gestion de la plateforme
									</h6>
								</div>
								<hr className="mt-6 border-b-1 border-blueGray-300" />
							</div>
							<form onSubmit={(e) => {
								e.preventDefault();
								handleLogin()
							}}>
								<div className="relative w-full mb-3">
									<label
										className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
										htmlFor="grid-password"
									>
										Email
									</label>
									<input
										type="email"
										value={info.identifier || ''} onChange={e => handleChange(e)} name="identifier"
										className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
										placeholder="Email"
									/>
								</div>

								<div className="relative w-full mb-3">
									<label
										className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
										htmlFor="grid-password"
									>
										Mot de passe
									</label>
									<input
										type="password"
										value={info.password || ''} onChange={e => handleChange(e)} name="password"
										className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
										placeholder="Mot de passe"
									/>
								</div>
								<div>
									<label className="inline-flex items-center cursor-pointer">
										<input
											id="customCheckLogin"
											type="checkbox"
											className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
										/>
										<span className="ml-2 text-sm font-semibold text-blueGray-600">
											Se souvenir de moi
										</span>
									</label>
								</div>

								<div className="text-center mt-6">
									<button
										className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
										type="submit"
									>
										Se connecter
									</button>
								</div>
							</form>
						</div>
					</div>
					<div className="flex flex-wrap mt-6 relative">
						<div className="w-1/2">
							<a
								href="#pablo"
								onClick={(e) => e.preventDefault()}
								className="text-blueGray-200"
							>
								<small>Mot de passe oublié ?</small>
							</a>
						</div>
					</div>
				</div>
			</div>
    </>
  );
}

export default Login;
