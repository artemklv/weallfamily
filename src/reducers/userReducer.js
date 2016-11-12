import {
  USER_SET,
  USER_IS_AUTH_SET,
  USER_EMAIL_SET,
  USER_FIRST_NAME_SET,
  USER_LAST_NAME_SET,
  USER_PASSWORD_SET
} from '../constants/userActionTypes'

const initialState = {
  isAuth: false,
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_SET:
      return action.payload
    case USER_IS_AUTH_SET:
      return {...state, isAuth: action.payload}
    case USER_EMAIL_SET:
      return {...state, email: action.payload}
    case USER_FIRST_NAME_SET:
      return {...state, firstName: action.payload}
    case USER_LAST_NAME_SET:
      return {...state, lastName: action.payload}
    case USER_PASSWORD_SET:
      return {...state, password: action.payload}
    default:
      return state
  }
}