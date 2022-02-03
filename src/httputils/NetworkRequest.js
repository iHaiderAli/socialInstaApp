import { BASE_URL_STAGGING, BASE_URL_LIVE } from '../utils/AppConstants';

export const NetworkRequest = (endPoint, payload, method, token) => {

	const HEADERS_PROTECTED = {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}

	let fetchObj = {
        method: method,
    }
    token != null ? fetchObj.headers = HEADERS_PROTECTED : null,
    method !== 'GET' ? fetchObj.body = payload : null;

	console.log("EndPoint: ", BASE_URL_STAGGING+endPoint + " Payload" + JSON.stringify(payload));
	return fetch(BASE_URL_STAGGING+endPoint, fetchObj)
		.then(handleErrors)
		.then((response) => {
			if (response.status >= 200 && response.status < 300) {
				return response.json();
			} else {
				let error = response;
				throw error;
			}
		})
		.catch((error) => {
			console.log(error.message)
			throw error
		})
};

export function handleErrors(response) {
	if (!response.ok) {
		throw Error(response.status);
	}
	return response;
}
