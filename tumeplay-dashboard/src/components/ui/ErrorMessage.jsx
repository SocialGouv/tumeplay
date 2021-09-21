import React from 'react';

const ErrorMessage = ({ message }) => {
  return(
		<span className="text-xs text-error">{message}</span>
  )
}

export default ErrorMessage;
