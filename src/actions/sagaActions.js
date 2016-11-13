import {
  SAGA_USER_LOGIN,
  SAGA_USER_LOGOUT,
  SAGA_USER_PROFILE
} from '../constants/sagaActionTypes'

export function sagaUserLogin(email, password) {
  return {
    type: SAGA_USER_LOGIN,
    email,
    password,
  }
}

export function sagaUserLogout() {
  return {
    type: SAGA_USER_LOGOUT,
  }
}

export function sagaUserProfile({email, firstName, lastName, password}) {
  return {
    type: SAGA_USER_PROFILE,
    email,
    firstName,
    lastName,
    password,
  }
}