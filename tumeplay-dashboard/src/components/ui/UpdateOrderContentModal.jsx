import React, { useContext, useEffect } from 'react'
import Loader from '../../components/ui/Loader';
import { Formik } from 'formik';
import FormErrorMessage from '../../components/ui/FormErrorMessage';
import ErrorMessage from '../../components/ui/ErrorMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OrdersAPI from '../../services/api/orders';
import AppContext from '../../AppContext';

const ConfirmModal = ({closeModal, order, boxes}) => {
  const context = useContext(AppContext)
  const {token} = context

	return(
		<div className="relative top-1/2 transform -translate-y-1/2 mx-auto p-5 border w-1/3 shadow-lg rounded-md bg-white">
			<div className="mt-3 text-center">
				<h3 className="text-lg leading-6 font-medium text-lightBlue-800">Contenu de la commande</h3>
				<Formik
					initialValues={{
						box_number: order.content[0].__component === 'commandes.box' ? order.content[0].box.number.toString() : 'box-sur-mesure'
					}}
					validate={values => {
						const errors = {};
						
						if (!values.box_number) {
							errors.box_number = 'Ce champ est requis';
						}

						return errors;
					}}
					onSubmit={(values, { setSubmitting }) => {
						
						if (order.box_number !== parseInt(values.box_number)) {
							if (values.box_number !== 'box-sur-mesure') {
								order.box_number = parseInt(values.box_number);

								const chosenBox = boxes.find((b) => b.number === order.box_number)
								order.content[0] = {
									__component: 'commandes.box',
									box: chosenBox.id,
								}
							} else {

							}

							OrdersAPI.update(token, order).then(() => {
								setSubmitting(false);
								closeModal();
							}, (e) => {
								setSubmitting(false);
								console.log(e)
							})
						} else {
							closeModal();
						}
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
									Box distribuée
								</label>
								<select
									value={values.box_number} onChange={handleChange} onBlur={handleBlur} name="box_number"
									className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
									placeholder="Choisir..."
								>
									<option checked={!values.box_number} />
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
								<FormErrorMessage errors={errors} touched={touched} name="box_number" />
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
