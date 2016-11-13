import { combineReducers } from 'redux'
import userReducer from '../reducers/userReducer'
import applicationReducer from '../reducers/applicationReducer'

const rootReducer = combineReducers({
  user: userReducer,
  application: applicationReducer,
})

export default rootReducer