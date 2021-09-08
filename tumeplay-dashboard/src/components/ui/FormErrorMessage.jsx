import React from 'react';
import ErrorMessage from './ErrorMessage';

const FormErrorMessage = ({ errors, touched, name }) => {
  if (errors[name] && touched[name])
		return <ErrorMessage message={errors[name]} />

	return <></>
}

export default FormErrorMessage;
