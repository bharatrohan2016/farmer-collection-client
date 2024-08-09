import axios from 'axios';
const url = 'https://records-collection.bharatrohan.in';

export const login = async (data) => {
	const result = await axios.post(`${url}/api/user/sign-in`, data);
	return result.data;
}

export const onboard = async (data) => {
	const result = await axios.post(`${url}/register-farmer`, data);
	return result.data;
}

export const manage = async (data) => {
	const result = await axios.get(`${url}/get-all`, data);
	return result.data;
}