import React, { useState, useContext, useEffect } from 'react'
import AppContext from '../../AppContext'
import { Formik } from 'formik';
import FormErrorMessage from '../../components/ui/FormErrorMessage';
import ErrorMessage from '../../components/ui/ErrorMessage';
import Loader from '../../components/ui/Loader';
import UserApi from '../../services/api/user';
import ReferentApi from '../../services/api/referents';
import { growl } from '@crystallize/react-growl';
import _ from 'lodash'
import Switch from 'react-switch'

const Settings = () => {
	const context = useContext(AppContext)
	const { token } = context
	const [user] = useState(context.user)
	const [referent, setReferent] = useState({})

	const retrieveReferent = async () => {
		const response = await ReferentApi.findOne(token, {id: user.referent})
		if (response.status === 200) {
			setReferent(response.data)
		} else {
			growl({
				title: 'Erreur',
				message: 'Erreur serveur, veuillez ré-essayer plus tard',
				type: 'error',
				timeout: 1500
			});
		}
	}

	useEffect(() => {
		retrieveReferent()
	}, [user])

	return (
		<>
			<div className="px-4 relative">
				<div className="text-white text-sm uppercase hidden lg:inline-block font-semibold">
					Paramètres
				</div>
				<div className="flex items-start">
					<div className="w-1/3 flex flex-col">
						<div className="tmp-box w-full mt-4">
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
													Email
												</label>
												<input
													type="text"
													value={user.email} disabled name="email"
													className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
													placeholder="Votre email..."
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
						<div className="tmp-box w-full mt-4">
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
					{
						referent && referent.id && (
							<div className="w-1/3 flex">	
								<div className="tmp-box w-full mt-4 ml-4">
								<h2 className="text-xl font-semibold mt-2">Mon lieu de rencontre</h2>
									<Formik
											initialValues={Object.assign(referent, referent.openingHours)}
											validate={values => {
												const errors = {};

												if (
													values.email &&
													!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
												) {
													errors.email = 'Adresse email incorrecte';
												}
												
												if (!values.name) {
													errors.name = 'Ce champ est requis';
												} 
												
												if (!values.phone_number) {
													errors.phone_number = 'Ce champ est requis';
												} 
												
												return errors;
											}}
											onSubmit={(values, { setSubmitting }) => {
												values.openingHours = _.pick(values, [
													'monday_title',
													'monday_value',
													'tuesday_title',
													'tuesday_value',
													'wednesday_title',
													'wednesday_value',
													'thursday_title',
													'thursday_value',
													'friday_title',
													'friday_value',
													'saturday_title',
													'saturday_value',
													'sunday_title',
													'sunday_value'
												])
												values.id = user.referent

												console.log(values)
												ReferentApi.update(token, values).then(() => {
													growl({
														title: 'Superbe!',
														message: 'Votre lieu de rencontre bien été modifié',
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
											}) => {

												const OpeningHoursFields = () => {
													return [
														{label: 'monday_title', value: 'monday_value'},
														{label: 'tuesday_title', value: 'tuesday_value'},
														{label: 'wednesday_title', value: 'wednesday_value'},
														{label: 'thursday_title', value: 'thursday_value'},
														{label: 'friday_title', value: 'friday_value'},
														{label: 'saturday_title', value: 'saturday_value'},
														{label: 'sunday_title', value: 'sunday_value'},
													].map((opening_hours) => {
														return (
															<div className="relative w-full mb-6">
																<label
																	className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
																	htmlFor={`grid-${opening_hours.value}`}
																>
																	{values[opening_hours.label]}
																</label>
																<input
																	type="text"
																	value={values[opening_hours.value]} onChange={handleChange} onBlur={handleBlur} name={opening_hours.value}
																	className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
																	placeholder="Ex: 09h - 17h"
																/>
																<FormErrorMessage errors={errors} touched={touched} name={opening_hours.value} />
															</div>
														)
													})
												}

												return (
													<form onSubmit={handleSubmit}>
														<div className='tmp-switch-container mb-6'>
															<div className='flex justify-start'>
																<label className="block uppercase text-blueGray-600 text-xs font-bold mr-2">Disponible à la commande</label>
																<Switch className='tmp-switch-input'
																				width={35}
																				height={16}
																				handleDiameter={12}
																				checkedIcon={false}
																				uncheckedIcon	={false}
																				checked={values.is_available}
																				onChange={(value) => {
																					handleChange({
																						target: {
																							name: 'is_available',
																							value																						}
																					})
																				}} />
															</div>
														</div>
														<div className="relative w-full mb-6">
															<label
																className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
																htmlFor="grid-name"
															>
																Nom du lieu de rencontre
															</label>
															<input
																type="text"
																value={values.name} onChange={handleChange} onBlur={handleBlur} name="name"
																className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
																placeholder="Nom du lieu de rencontre..."
															/>
															<FormErrorMessage errors={errors} touched={touched} name="name" />
														</div>
														<div className="relative w-full mb-6">
															<label
																className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
																htmlFor="grid-name"
															>
																Nom du lieu de rencontre
															</label>
															<input
																type="text"
																value={values.name} onChange={handleChange} onBlur={handleBlur} name="name"
																className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
																placeholder="Nom du lieu de rencontre..."
															/>
															<FormErrorMessage errors={errors} touched={touched} name="name" />
														</div>
														<div className="relative w-full mb-3">
															<label
																className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
																htmlFor="grid-password"
															>
																Email
															</label>
															<input
																type="email"
																value={values.email} onChange={handleChange} onBlur={handleBlur} name="email"
																className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
																placeholder="Email de référence..."
															/>
															<FormErrorMessage errors={errors} touched={touched} name="email" />
														</div>
														<div className="relative w-full mb-6">
															<label
																className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
																htmlFor="grid-phone_number"
															>
																Numéro de téléphone
															</label>
															<input
																type="text"
																value={values.name} onChange={handleChange} onBlur={handleBlur} name="phone_number"
																className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
																placeholder="Numéro de téléphone..."
															/>
															<FormErrorMessage errors={errors} touched={touched} name="phone_number" />
														</div>
														<div className="relative w-full mb-6">
															<label
																className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
																htmlFor="grid-description"
																>
																Description du lieu de rencontre
															</label>
															<textarea
																value={values.description} onChange={handleChange} onBlur={handleBlur} name="description"
																className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
																placeholder="Décrivez votre lieu de rencontre (cette description sera affichée sur l'application)..."
															/>
															<FormErrorMessage errors={errors} touched={touched} name="description" />
														</div>
														<div className="mt-4">
															<h3 className="text-lg font-semibold">Les horaires d'ouverture</h3>
															{OpeningHoursFields()}
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
																	Valider les modifications
																</button>
															}
														</div>
													</form>
												)
											}
										}
										</Formik>
								</div>
							</div>	
						)
					}
				</div>
			</div>
		</>
	)
}

export default Settings;
