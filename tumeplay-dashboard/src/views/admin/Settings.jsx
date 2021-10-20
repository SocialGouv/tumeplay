import React, { useState, useContext } from 'react'
import AppContext from '../../AppContext'
import { Formik } from 'formik';
import FormErrorMessage from '../../components/ui/FormErrorMessage';
import ErrorMessage from '../../components/ui/ErrorMessage';
import Loader from '../../components/ui/Loader';
import UserApi from '../../services/api/user';
import { growl } from '@crystallize/react-growl';

const Settings = () => {
	const context = useContext(AppContext)
	const { token } = context
	const [user] = useState(context.user)

	return (
		<>
			<div className="px-4 relative">
				<div className="text-white text-sm uppercase hidden lg:inline-block font-semibold">
					Paramètres
				</div>
				<div className="flex flex-col">
					<div className="tmp-box w-1/3 mt-4">
						<h2 className="text-xl font-semibold mt-2">Mes informations</h2>
						<Formik
								initialValues={{username: user.username}}
								validate={values => {
									const errors = {};

									if (!values.username) {
										errors.username = 'Ce champ est requis';
									} 
				
									return errors;
								}}
								onSubmit={(values, { setSubmitting }) => {
									UserApi.changeUsername(token, {
										username: values.username,
									}).then((response) => {
										context.verifyAuthentication(response.data)
										growl({
											title: 'Superbe!',
											message: 'Votre nom d\'utilisateur a bien été modifié',
											timeout: 2000
										})
										setSubmitting(false);
									}).catch((error) => {
										growl({
											title: 'Erreur serveur',
											message: 'Code erreur : ' + error.response.status,
											type: 'error',
											timeout: 2000
										});
										setSubmitting(false);
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
										<div className="relative w-full mb-6">
											<label
												className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
												htmlFor="grid-username"
											>
												Nom d'utilisateur
											</label>
											<input
												type="text"
												value={values.username} onChange={handleChange} onBlur={handleBlur} name="username"
												className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
												placeholder="Votre nom..."
											/>
											<FormErrorMessage errors={errors} touched={touched} name="username" />
										</div>
										<div className="relative w-full mb-6">
											<label
												className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
												htmlFor="grid-username"
											>
												Nom d'utilisateur
											</label>
											<input
												type="text"
												value={user.email} disabled name="email"
												className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
												placeholder="Votre nom..."
											/>
										</div>
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
													className="bg-indigo-500 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
													type="submit"
												>
													Valider mes informations
												</button>
											}
										</div>
									</form>
								)}
							</Formik>
					</div>
					<div className="tmp-box w-1/3 mt-4">
						<h2 className="text-xl font-semibold mt-2">Mot de passe</h2>
						<Formik
								initialValues={{password: '', password2: ''}}
								validate={values => {
									const errors = {};
									if (!values.password) {
										errors.password = 'Ce champ est requis';
									} else if (
										!/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/i.test(values.password)
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
								onSubmit={(values, { setSubmitting }) => {
									UserApi.changePassword(token, {
										newPassword: values.password,
      							confirmNewPassword: values.password2
									}).then(() => {
										growl({
											title: 'Superbe!',
											message: 'Votre mot de passe a bien été modifié',
											timeout: 2000
										})
										setSubmitting(false);
									}).catch((error) => {
										growl({
											title: 'Erreur serveur',
											message: 'Code erreur : ' + error.response.status,
											type: 'error',
											timeout: 2000
										});
										setSubmitting(false);
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
										<div className="relative w-full mb-6">
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
										<div className="relative w-full mb-6">
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
													className="bg-indigo-500 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
													type="submit"
												>
													Valider le mot de passe
												</button>
											}
										</div>
									</form>
								)}
							</Formik>
					</div>
				</div>
			</div>
		</>
	)
}

export default Settings;
