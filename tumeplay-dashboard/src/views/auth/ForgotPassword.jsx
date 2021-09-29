import React, {useContext, useState} from 'react'
import AppContext from '../../AppContext';
import { forgotPassword } from '../../services/api/auth';
import logo from '../../assets/pictures/full-logo.png';
import checkIcon from '../../assets/pictures/check-icon.png';
import Loader from '../../components/ui/Loader';
import { Formik } from 'formik';
import FormErrorMessage from '../../components/ui/FormErrorMessage';
import ErrorMessage from '../../components/ui/ErrorMessage';


const ForgotPassword = () => {

	const [serverError, setServerError] = useState(null)
	const [mailSent, setMailSent] = useState(false)

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
										Demande de réinitialisation de mot de passe
									</h6>
								</div>
								<hr className="mt-6 border-b-1 border-blueGray-300" />
							</div>
							{
								mailSent 
								?
								<div className="flex flex-col items-center justify-center">
									<img src={checkIcon} className="w-12" />
									<p className="text-blueGray-500 px-12 text-center mt-4">Un email contenant un lien pour réinitialiser votre mot de passe vient de vous être envoyé.</p>
								</div>
								:
								<Formik
								initialValues={{email: '', password: ''}}
								validate={values => {
									setServerError(null);
									const errors = {};
									if (!values.email) {
										errors.email = 'Ce champ est requis';
									} else if (
										!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
									) {
										errors.email = 'Adresse email incorrecte';
									}

									return errors;
								}}
								onSubmit={async (values, { setSubmitting }) => {
									forgotPassword(values.email)
									.then(() => {
										setMailSent(true)
										setSubmitting(false);
									}, (res) => {
										if (res.response.status === 400) {
											console.log('here')
											setServerError('Cet email n\'existe pas dans notre base de donnée')
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
												Email
											</label>
											<input
												type="email"
												value={values.email} onChange={handleChange} onBlur={handleBlur} name="email"
												className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
												placeholder="Email"
											/>
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
													Valider ma demande
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

export default ForgotPassword;
