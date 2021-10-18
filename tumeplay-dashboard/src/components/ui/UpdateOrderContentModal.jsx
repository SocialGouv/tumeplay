import React, { useContext, useEffect } from 'react'
import Loader from '../../components/ui/Loader';
import { Formik } from 'formik';
import FormErrorMessage from '../../components/ui/FormErrorMessage';
import ErrorMessage from '../../components/ui/ErrorMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OrdersAPI from '../../services/api/orders';
import AppContext from '../../AppContext';
import AsyncSelect from 'react-select/async';
import searchProducts from '../../services/api/products';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ConfirmModal = ({closeModal, order, boxes}) => {
  const context = useContext(AppContext)
  const {token} = context

	const promiseOptions = (inputValue) => {
		return new Promise((resolve) => 
			searchProducts(token, inputValue)
			.then((response) =>  {
				resolve(response.data)
			})
		)
	}

	const ProductsSelector = (title, name, values, handleChange) => {
		const model = values[name];

		return (
			<div className="relative w-full mb-4">
				<label
						className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
					>
					{title}
				</label>
				{
					model.map((product, index) => {
						return(
							<div className="flex flex-wrap items-center mb-4" key={`${index}-${product.id}`}>
								<AsyncSelect 
								className="flex-1 mr-4"
								name={`product-${index}-${product.id}`}
								value={product}
								handleChange
								cacheOptions 
								defaultOptions
								getOptionValue={(product) => product.id }
								getOptionLabel={(product) => product.title }
								onChange={(product) => {
									model[index] = Object.assign(product, {qty: 1})
									handleChange({
										target: {
											name: name,
											value: model
										}
									})
								}}
								loadOptions={promiseOptions} />
								<input name={`qty-${index}-${product.id}`}
										min={1}
										value={product.qty}
										onChange={(e) => {
											model[index] = Object.assign(model[index], {qty: e.target.value})
											handleChange({
												target: {
													name: name,
													value: model
												}
											})
										}}
										className="border-0 px-2 py-2 mr-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-14 ease-linear transition-all duration-150"
										type="number" />
								<FontAwesomeIcon onClick={() => {
									model.splice(index, 1)
									handleChange({
										target: {
											name: name,
											value: model
										}
									})
								}}icon={faTrash} color="gray" className="cursor-pointer" />
							</div>
						)
					})
				}
				<div className="flex justify-center">
					<button onClick={() => {
														model.push({id: Math.round(Math.random() * 1000)})
														handleChange({
															target: {
																name: name,
																value: model
															}
														})
													}}
									type="button" 
									className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-full text-xl mr-1 shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">+</button>
				</div>
			</div>
		)
	}

	return(
		<div className="relative top-1/2 transform -translate-y-1/2 mx-auto p-5 border w-1/3 shadow-lg rounded-md bg-white">
			<div className="mt-3 text-center">
				<h3 className="text-lg leading-6 font-medium text-lightBlue-800">Contenu de la commande</h3>
				<Formik
					initialValues={{
						box_number: order.content[0].__component === 'commandes.box' ? order.content[0].box.number.toString() : 'box-sur-mesure',
						box_sur_mesure_products: order.content[0].__component === 'commandes.box-sur-mesure' ? order.content[0].produits.map((_) => Object.assign(_.produit, {qty: _.quantity})) : [],
						additionnal_products: order.additionnal_products.map((_) => Object.assign(_.produit, {qty: _.quantity})) || []
					}}
					validate={values => {
						const errors = {};
						
						if (!values.box_number) {
							errors.box_number = 'Ce champ est requis';
						}

						return errors;
					}}
					onSubmit={(values, { setSubmitting }) => {
						if (values.box_number !== 'box-sur-mesure') {
							order.box_number = parseInt(values.box_number);

							const chosenBox = boxes.find((b) => b.number === order.box_number)
							order.content = [
								{
									__component: 'commandes.box',
									box: chosenBox.id,
								}
							]

							order.additionnal_products = values.additionnal_products.map((_) => { 
								return {
									produit: _.id,
									quantity: _.qty
								}
							})
						} else {
							order.content = [
								{
									__component: 'commandes.box-sur-mesure',
									produits: values.box_sur_mesure_products.map((_) => { 
										return {
											produit: _.id,
											quantity: _.qty
										}
									})
								}
							]
							order.additionnal_products = []
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
									Box distribuée
								</label>
								<select
									value={values.box_number} onChange={(e) => {
										handleChange(e)
									}} onBlur={handleBlur} name="box_number"
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

								{
								values.box_number && values.box_number !== 'box-sur-mesure' && (
									ProductsSelector('Produits supplémentaires', 'additionnal_products', values, handleChange)
								)
							}
							{
								values.box_number && values.box_number === 'box-sur-mesure' && (
									ProductsSelector('Produits de la box sur mesure', 'box_sur_mesure_products', values, handleChange)
								)
							}
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
