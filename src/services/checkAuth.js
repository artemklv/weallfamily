import api from './api'
import store from '../store/createStore'
import { applicationErrorSet } from '../actions/applicationActions'

export default function(nextState, replace, callback) {
  // Если пользователь уже авторизован (переходит по ссылке внутри приложения)
  const state = store.getState()
  if (state.user.isAuth) {
    return callback()
  }
  // Открывает страницу впервый раз
  api.fetch('/check_auth').then( response => {
    if ( !response.status === api.STATUS_OK || !response.payload.isAuth) {
      store.dispatch(applicationErrorSet('Для просмотра данных страниц необходимо авторизоваться'))
      replace('/')
    }
    callback()
  }).catch( error => {
    store.dispatch(applicationErrorSet('Ошибка получения данных  с сервера попробуйте позже'))
    replace('/')
    callback(error)
  })
}