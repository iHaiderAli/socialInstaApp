import {
  REQUEST_PENDING,
  REQUEST_FULFILLED,
  REQUEST_REJECTED,
  REQUEST_ERROR
} from '../utils/AppConstants'

const initialState = {
  loading: false,
  error: '',
  success: false,
  response: null
}

export default function getResponseReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PENDING:
      return {
        ...state,
        loading: true,
        error: ''
      }
    case REQUEST_FULFILLED:
      return {
        ...state,
        loading: false,
        success: true,
        response: action.payload
      }
    case REQUEST_REJECTED:
      return {
        ...state,
        loading: false,
        success: false,
        error: REQUEST_ERROR
      }

    default:
      return state
  }
}
