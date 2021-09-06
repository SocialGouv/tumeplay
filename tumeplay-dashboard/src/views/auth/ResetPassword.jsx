import React, {useContext, useState} from 'react'
import AppContext from '../../AppContext';
import { resetPassword } from '../../lib/auth';
import logo from '../../assets/pictures/full-logo.png';
import checkIcon from '../../assets/pictures/check-icon.png';
import Loader from '../../components/ui/Loader';
import { Formik } from 'formik';
import FormErrorMessage from '../../components/ui/FormErrorMessage';
import ErrorMessage from '../../components/ui/ErrorMessage';
import {
	Link,
  useLocation
} from "react-router-dom";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const ResetPassword = () => {
	const [serverError, setServerError] = useState(null)
	const [resetDone, setResetDone] = useState(false)

	let query = useQuery();

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
										Réinitialisation de votre mot de passe
									</h6>
								</div>
								<hr className="mt-6 border-b-1 border-blueGray-300" />
							</div>
							{
								resetDone 
								?
								<div className="flex flex-col items-center justify-center">
									<img src={checkIcon} className="w-12" />
									<p className="text-blueGray-500 px-12 text-center mt-4">
										Votre mot de passe a bien été modifié.
									</p>
									<Link
										to="/"
										className="bg-blueGray-800 mt-4 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
									>
										Retour à l'écran de connexion
									</Link>
								</div>
								:
								<Formik
								initialValues={{password: '', password2: ''}}
								validate={values => {
									setServerError(null);
									const errors = {};
									if (!values.password) {
										errors.password = 'Ce champ est requis';
									} else if (
										!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(values.password)
									) {
										errors.password = 'Le mot de passe doit comporter au moins 8 caractères et doit comporter au moins un caractère numérique.'
									}
									
									if (!values.password2) {
										errors.password2 = 'Ce champ est requis';
									} 
									
									if (values.password && values.password2 && values.password !== values.password2) {
										errors.password2 = 'Les deux mot de passe ne correspondent pas';
									}

									return errors;
								}}
								onSubmit={async (values, { setSubmitting }) => {
									resetPassword(
										values.password,
										values.password2,
										query.get('code')
									)
									.then(() => {
										setResetDone(true)
										setSubmitting(false);
									}, (res) => {
										if (res.response.status === 400) {
											setServerError('Votre lien est invalide')
										} else {
											setServerError('Désolé, une erreur s\'est produite, veuillez réessayer ultérieurement')
										}
									})
								}}
							>
								{({
									values,
									errors,
									touched,
									handleChange,
									handleBlur,
									handleSubmit,
									isSubmitting
								}) => (
									<form onSubmit={handleSubmit}>
										<div className="relative w-full mb-3">
											<label
												className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
												htmlFor="grid-password"
											>
												Nouveau mot de passe
											</label>
											<input
												type="password"
												value={values.password} onChange={handleChange} onBlur={handleBlur} name="password"
												className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
												placeholder="Taper votre nouveau mot de passe..."
											/>
											<FormErrorMessage errors={errors} touched={touched} name="password" />
										</div>
										<div className="relative w-full mb-3">
											<label
												className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
												htmlFor="grid-password"
											>
												Répetez le nouveau mot de passe
											</label>
											<input
												type="password"
												value={values.password2} onChange={handleChange} onBlur={handleBlur} name="password2"
												className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
												placeholder="Retapez le mot de passe..."
											/>
											<FormErrorMessage errors={errors} touched={touched} name="password2" />
										</div>
										<FormErrorMessage errors={errors} touched={touched} name="email" />
										<div className="text-center mt-6">
											{
												isSubmitting
												?
												<button
													className="flex justify-center bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
													type="button"
												>
													<Loader />
												</button>
												:
												<button
													className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
													type="submit"
												>
													Valider le mot de passe
												</button>
											}
											{
												serverError && (
													<ErrorMessage message={serverError} />
												)
											}
										</div>
									</form>
								)}
							</Formik>
							}
						</div>
					</div>
				</div>
			</div>
    </>
  );
}

export default ResetPassword;
