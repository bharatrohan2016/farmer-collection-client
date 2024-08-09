import React from 'react'

const validate = (values) => {
	const errors = {};
	
	if(values.email === ''){
		errors.email = "Email is Required";
	}
	if(values.password === ''){
		errors.password = "Password is Required";
	}
	return errors;
}

export default validate;