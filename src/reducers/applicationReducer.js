import {
  APPLICATION_SET,
  APPLICATION_IS_FETCHING_SET,
  APPLICATION_ERROR_SET
} from '../constants/applicationActionTypes'
import { applicationInitState } from '../store/initState'

export default function applicationReducer(state = applicationInitState, action) {
  switch (action.type) {
    case APPLICATION_SET:
      return action.payload
    case APPLICATION_IS_FETCHING_SET:
      return {...state, isFetching: action.payload}
    case APPLICATION_ERROR_SET:
      return {...state, error: action.payload}
    default:
      return state
  }
}