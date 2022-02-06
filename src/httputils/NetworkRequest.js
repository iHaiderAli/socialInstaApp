import { BASE_URL_STAGGING, BASE_URL_LIVE } from '../utils/AppConstants';

export const NetworkRequest = (endPoint, payload, method, token) => {

	var formBody = [];
	for (var key in payload) {
		var encodedKey = encodeURIComponent(key);
		var encodedValue = encodeURIComponent(payload[key]);
		formBody.push(encodedKey + '=' + encodedValue);
	}
	formBody = formBody.join('&');

	console.log("EndPoint: ", BASE_URL_STAGGING + endPoint + " Payload" + JSON.stringify(payload));

	return fetch(BASE_URL_STAGGING + endPoint, {
		method: method,
		body: formBody,
		headers: token != null ? {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'Authorization': 'Bearer ' + token,
		} : {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		},
	})
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
