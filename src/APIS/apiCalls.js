import axios from 'axios';
// const url = 'https://records-collection.bharatrohan.in';
const url = 'http://localhost:3200'


function getHeaders(){
    const token = localStorage.getItem('token');

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
    return headers;
}

function  getFormHeaders(){
    const token = localStorage.getItem('token');
    const headers =  { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data'};
    return headers;
}

export const login = async (data) => {
	const result = await axios.post(`${url}/api/user/sign-in`, data);
	return result.data;
}

export const onboard = async (data) => {
	const result = await axios.post(`${url}/api/farmer/register-farmer`, data, { headers : getFormHeaders() });
	return result.data;
}

export const update = async (id, data) => {
	const result = await axios.patch(`${url}/api/farmer/update-farmer/${id}`, data, { headers : getFormHeaders() });
	return result.data;
}

export const deleteFarmer = async (id) => {
	const result = await axios.delete(`${url}/api/farmer/delete-farmer/${id}`, { headers : getHeaders() });
	return result.data;
}

export const manage = async (data) => {
	const result = await axios.get(`${url}/api/farmer/get-all`, {headers : getHeaders()});
	return result.data;
}
export const getOne = async (id) => {
	const result = await axios.get(`${url}/api/farmer/get-single/${id}`, {headers : getHeaders()});
	return result.data;
}