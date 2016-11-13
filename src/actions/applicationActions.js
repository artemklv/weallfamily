import {
  APPLICATION_SET,
  APPLICATION_IS_FETCHING_SET,
  APPLICATION_ERROR_SET
} from '../constants/applicationActionTypes'

export function applicationSet(data) {
  return {
    type: APPLICATION_SET,
    payload: data,
  }
}

export function applicationIsFetchingSet(value) {
  return {
    type: APPLICATION_IS_FETCHING_SET,
    payload: value,
  }
}

export function applicationErrorSet(value) {
  return {
    type: APPLICATION_ERROR_SET,
    payload: value,
  }
}