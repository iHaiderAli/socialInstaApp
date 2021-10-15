
import {
  REQUEST_PENDING,
  REQUEST_FULFILLED,
  REQUEST_REJECTED
} from '../utils/AppConstants'
import { NetworkRequest } from '../httputils/NetworkRequest';

export function sendRequestAction(url, payload, method, token) {
  return dispatch => {

    dispatch(requestBegin());
    return NetworkRequest(url, payload, method, token != null ? token : null)
      .then((res) => {
        dispatch(Success(res));
      })
      .catch((error) => {
        dispatch(ErrorMessage())
      })

  };
}

export const requestBegin = () => ({
  type: REQUEST_PENDING
});

export const Success = res => ({
  type: REQUEST_FULFILLED,
  payload: res
});

export const ErrorMessage = () => ({
  type: REQUEST_REJECTED,
});


