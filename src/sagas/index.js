import { fork } from 'redux-saga/effects'
import {
  loginWatch,
  logoutWatch,
  profileWatch
} from './user'

// all sagas add here
export default function* rootSaga() {
  yield [
    fork(loginWatch),
    fork(logoutWatch),
    fork(profileWatch)
  ]
}