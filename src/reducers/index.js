import { combineReducers } from 'redux'
import userReducer from '../reducers/userReducer'
import applicationReducer from '../reducers/applicationReducer'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  user: userReducer,
  application: applicationReducer,
  form: formReducer
})

export default rootReducer