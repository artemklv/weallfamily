import api from '../services/api';
import { call, put, take } from 'redux-saga/effects'
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
import {
  APPLICATION_IS_FETCHING_SET,
} from '../constants/applicationActionTypes'
import {
  SAGA_USER_LOGIN,
  SAGA_USER_LOGOUT,
  SAGA_USER_PROFILE,
} from '../constants/sagaActionTypes'
import { userInitState } from '../store/initState'


export function* login({email, password}) {
  try {
    yield put({type: APPLICATION_IS_FETCHING_SET, payload: true})
    const response = yield call(api.fetch('/login', {email: email, password: password}))
    if (response.status === api.STATUS_OK) {
      yield put({type: USER_SET, payload: response.payload})
      yield put({type: USER_IS_AUTH_SET, payload: true})
    } else {
      yield put({type: USER_IS_LOGIN_FAIL_SET, payload: true})
    }
  } catch (error) {
    yield put({type: USER_IS_LOGIN_FAIL_SET, payload: true})
  } finally {
    yield put({type: APPLICATION_IS_FETCHING_SET, payload: false})
  }
}

export function* loginWatch() {
  while(true) {
    const {email, password} = yield take(SAGA_USER_LOGIN)
    yield call(login, {email, password})
  }
}

export function* logout() {
  try {
    yield put({type: APPLICATION_IS_FETCHING_SET, payload: true})
    const response = yield call(api.fetch('/logout'))
    if (response.status === api.STATUS_OK) {
      if (response.payload.logout) {
        yield put({type: USER_SET, payload: userInitState})
      } else {
        yield put({type: USER_IS_LOGOUT_FAIL_SET, payload: true})
      }
    } else {
      yield put({type: USER_IS_LOGOUT_FAIL_SET, payload: true})
    }
  } catch (error) {
    yield put({type: USER_IS_LOGOUT_FAIL_SET, payload: true})
  } finally {
    yield put({type: APPLICATION_IS_FETCHING_SET, payload: false})
  }
}

export function* logoutWatch() {
  while(true) {
    const {email, password} = yield take(SAGA_USER_LOGOUT)
    yield call(logout)
  }
}

export function* profile({email, firstName, lastName, password}) {
  try {
    yield put({type: APPLICATION_IS_FETCHING_SET, payload: true})
    const response = yield call(api.fetch('/profile', {email, firstName, lastName, password}))
    if (response.status === api.STATUS_OK && response.payload.saved) {
      yield put({type: USER_EMAIL_SET, payload: email})
      yield put({type: USER_FIRST_NAME_SET, payload: firstName})
      yield put({type: USER_LAST_NAME_SET, payload: lastName})
      yield put({type: USER_PASSWORD_SET, payload: password})
    } else {
      yield put({type: USER_IS_PROFILE_FAIL_SET, payload: true})
    }
  } catch (error) {
    yield put({type: USER_IS_PROFILE_FAIL_SET, payload: true})
  } finally {
    yield put({type: APPLICATION_IS_FETCHING_SET, payload: false})
  }
}

export function* profileWatch() {
  while(true) {
    const {email, firstName, lastName, password} = yield take(SAGA_USER_PROFILE)
    yield call(profile, {email, firstName, lastName, password})
  }
}