import React, { useContext, useEffect } from 'react'
import Loader from '../../components/ui/Loader';
import { Formik } from 'formik';
import FormErrorMessage from '../../components/ui/FormErrorMessage';
import OrdersAPI from '../../services/api/orders';
import AppContext from '../../AppContext';

const ConfirmModal = ({closeModal, order, boxes}) => {
  const context = useContext(AppContext)
  const {token} = context

	return(
		<div className="relative top-1/2 transform -translate-y-1/2 mx-auto p-5 border w-1/3 shadow-lg rounded-md bg-white">
			<div className="mt-3 text-center">
				<h3 className="text-lg leading-6 font-medium text-lightBlue-800">Informations anonymes</h3>
				<Formik
					initialValues={
						order.user_data || {
							sex: '',
							age: '',
							district: '',
							city: '',
							schooling: '',
							first_box: true,
							comment: '',
							old_box: undefined
						}
					}
					validate={values => {
						const errors = {};
						
						//TODO : WRITE ERRORS CHECKS

						return errors;
					}}
					onSubmit={(values, { setSubmitting }) => {
						order.user_data = values

						if (order.user_data.first_box === 'oui') {
							delete order.user_data.old_box;
						}

						OrdersAPI.update(token, order).then(() => {
							setSubmitting(false);
							closeModal();
						}, (e) => {
							setSubmitting(false);
							console.log(e)
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
						<form onSubmit={handleSubmit} className="text-left">
							<div className="relative w-full mb-4">
								<label
									className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
								>
									Sex
								</label>
								<select
									value={values.sex} onChange={handleChange} onBlur={handleBlur} name="sex"
									className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
									placeholder="Choisir..."
								>
									<option checked={!values.sex} />
									<option value="man">Homme</option>
									<option value="woman">Femme</option>
									<option value="other">Autre</option>
								</select>
								<FormErrorMessage errors={errors} touched={touched} name="sex" />
							</div>

							<div className="relative w-full mb-4">
								<label
									className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
								>
									Age
								</label>
								<input
									type="text"
									value={values.age} onChange={handleChange} onBlur={handleBlur} name="age"
									className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
									placeholder="14..."
								/>
								<FormErrorMessage errors={errors} touched={touched} name="age" />
							</div>

							<div className="relative w-full mb-4">
								<label
									className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
								>
									Quartier d'habitation
								</label>
								<input
									type="text"
									value={values.district} onChange={handleChange} onBlur={handleBlur} name="district"
									className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
									placeholder="Quartier..."
								/>
								<FormErrorMessage errors={errors} touched={touched} name="district" />
							</div>

							<div className="relative w-full mb-4">
								<label
									className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
								>
									Code postal
								</label>
								<input
									type="text"
									value={values.zipcode} onChange={handleChange} onBlur={handleBlur} name="zipcode"
									className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
									placeholder="Code postal à 5 chiffres..."
								/>
								<FormErrorMessage errors={errors} touched={touched} name="zipcode" />
							</div>

							<div className="relative w-full mb-4">
								<label
									className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
								>
									Scolarité
								</label>
								<select
									value={values.schooling} onChange={handleChange} onBlur={handleBlur} name="schooling"
									className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
									placeholder="Choisir..."
								>
									<option checked={!values.schooling} />
									<option value="Collège">Collège</option>
									<option value="Lycée">Lycée</option>
									<option value="CAP/BEP">CAP/BEP</option>
									<option value="Université">Université</option>
									<option value="En formation professionnelle">En formation professionnelle</option>
									<option value="En recherche d'emploi">En recherche d'emploi</option>
									<option value="En emploi">En emploi</option>
									<option value="Autre">Autre</option>
								</select>
								<FormErrorMessage errors={errors} touched={touched} name="schooling" />
							</div>

							<div className="relative w-full mb-4">
								<label
									className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
								>
									Première box reçue ?
								</label>
								<select
									value={values.first_box} onChange={handleChange} onBlur={handleBlur} name="first_box"
									className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
									placeholder="Choisir..."
								>
									<option value="oui">Oui</option>	
									<option value="non">Non</option>
								</select>
								<FormErrorMessage errors={errors} touched={touched} name="first_box" />
							</div>

							{
								values.first_box === "non" && (
									<div className="relative w-full mb-4">
										<label
											className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
										>
											Box précédemment reçue
										</label>
										<select
											value={values.old_box} onChange={handleChange} onBlur={handleBlur} name="old_box"
											className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
											placeholder="Choisir..."
										>
											<option checked={!values.old_box} />
											{
												boxes.map(
													box => {
														return (
															<option value={box.number}>{box.title}</option>
														)
													}
												)
											}
											<option value="box-sur-mesure">La box sur mesure</option>
										</select>
										<FormErrorMessage errors={errors} touched={touched} name="old_box" />
									</div>
								)
							}

							<div className="relative w-full mb-4">
								<label
									className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
								>
									Commentaire (si nécessaire)
								</label>
								<textarea
									value={values.comment} onChange={handleChange} onBlur={handleBlur} name="comment"
									className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
									placeholder="Commentaire..."
								/>
								<FormErrorMessage errors={errors} touched={touched} name="comment" />
							</div>

							<div className="flex space-around items-center mt-8">
								<button
									className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full mr-1 shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
									onClick={() => closeModal()}
								>
									Annuler
								</button>
								{
									isSubmitting
									?
									<button
										className="flex justify-center px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full ml-1 shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
										type="button"
									>
										<Loader />
									</button>
									:
									<button
										className="px-4 py-2 bg-lightBlue-500 text-white text-base font-medium rounded-md w-full ml-1 shadow-sm hover:bg-lightBlue-600 focus:outline-none focus:ring-2 focus:ring-lightBlue-300"
										type="submit"
									>
										Valider
									</button>
								}
							</div>
						</form>
					)}
				</Formik>
			</div>
		</div>
	)
}

export default ConfirmModal;
