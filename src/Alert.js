import React, { useEffect } from 'react'

const Alert = ({ type, msg, alertMessage }) => {
	useEffect(() => {
		const timeOut = setTimeout(() => alertMessage(), 2000);
		return () => clearTimeout(timeOut);
	}, [alertMessage]);

	return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert
