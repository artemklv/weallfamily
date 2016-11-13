import {
  USER_SET,
  USER_IS_AUTH_SET,
  USER_IS_LOGIN_FAIL_SET,
  USER_IS_LOGOUT_FAIL_SET,
  USER_IS_PROFILE_FAIL_SET,
  USER_EMAIL_SET,
  USER_FIRST_NAME_SET,
  USER_LAST_NAME_SET,
  USER_PASSWORD_SET,
} from '../constants/userActionTypes'

export function userSet(data) {
  return {
    type: USER_SET,
    payload: data,
  }
}

export function userIsAuthSet(value) {
  return  {
    type: USER_IS_AUTH_SET,
    payload: value,
  }
}

export function userIsLoginFailSet(value) {
  return {
    type: USER_IS_LOGIN_FAIL_SET,
    payload: value,
  }
}

export function userIsLogoutFailSet(value) {
  return {
    type: USER_IS_LOGOUT_FAIL_SET,
    payload: value,
  }
}

export function userIsProfileFaileSet(value) {
  return {
    type: USER_IS_PROFILE_FAIL_SET,
    payload: value,
  }
}

export function userEmailSet(value) {
  return {
    type: USER_EMAIL_SET,
    payload: value,
  }
}

export function userFirstNameSet(value) {
  return {
    type: USER_FIRST_NAME_SET,
    payload: value,
  }
}

export function userLastNameSet(value) {
  return  {
    type: USER_LAST_NAME_SET,
    payload: value,
  }
}

export function userPasswordSet(value) {
  return {
    type: USER_PASSWORD_SET,
    payload: value,
  }
}