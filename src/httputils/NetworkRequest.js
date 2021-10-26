import { BASE_URL } from '../utils/AppConstants';

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

	console.log("EndPoint: ", endPoint + " Payload" + JSON.stringify(fetchObj.body));
	return fetch(endPoint, fetchObj)
		.then(handleErrors)
		.then((response) => {
			console.log("EndPoint: ", JSON.stringify(response));
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
