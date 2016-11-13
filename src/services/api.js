import md5 from 'md5'

const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;

/**
 * Эмулирует взаимодействие с сервером
 */
class Api {

  static get STATUS_OK() {
    return STATUS_OK
  }

  static get STATUS_NOT_FOUND() {
    return STATUS_NOT_FOUND
  }

  constructor(env) {
    if (env === 'test') {
      this.localStorage = require('localStorage')
    } else {
      this.localStorage = window.localStorage
    }
    this._checkAuth = this._checkAuth.bind(this)
    this._people = this._people.bind(this)
    this._login = this._login.bind(this)
    this._logout = this._logout.bind(this)
    this._markFriend = this._markFriend.bind(this)
    this.init = this.init.bind(this)
  }

  /**
   * Проверяет авторизацию пользователя
   * @returns {boolean}
   * @private
   */
  _checkAuth() {
    const token = this.localStorage.getItem('token')
    if (!token) {
      return false;
    }
    const people = this.localStorage.getItem('people')
    if (typeof token !== 'object') {
      return false;
    }
    const peopleIndexes = Object.keys(people)
    return peopleIndexes.indexOf(token) !== -1
  }

  /**
   * Авторизация пользователя в случае успеха возвращает его объект
   * @param {object} data
   * @returns {null|object}
   * @private
   */
  _login(data) {
    const people = this.localStorage.getItem('people')
    if (typeof people !== 'object') {
      return null
    }
    const user = people[data.email]
    if (!user) {
      return null
    }
    if (user.password === md5(data.password)) {
      this.localStorage.setItem('token', md5(user.email))
      return user
    }
    return null
  }

  /**
   * Разлогирование пользователя
   * @returns {boolean}
   * @private
   */
  _logout() {
    let token = this.localStorage.removeItem('token')
    return true;
  }

  /**
   * Сохраняет данные пользователя
   * @param {object} data
   * @returns {boolean}
   * @private
   */
  _profile(data) {
    const  people = this.localStorage.getItem('people')
    this.localStorage.setItem('people', {...people, [data.email]: data})
    return true
  }

  /**
   * Возвращает список пользователей за исключением текущего пользователя
   * @returns {Array}
   * @private
   */
  _people() {
    let response = [];
    const people = this.localStorage.getItem('people')
    const token = this.localStorage.getItem('token')
    Object.keys(people).forEach(index => {
      if (md5(index) !== token) {
        let user = people[index];
        response.push({
          firstName: user.firstName,
          lastName: user.lastName,
          isFriend: !!user.isFriend,
        })
      }
    })
    return response
  }

  /**
   * Помечает пользователя как друга
   * @param {object} data
   * @returns {boolean}
   * @private
   */
  _markFriend(data) {
    const people = this.localStorage.getItem('people')
    if (typeof people === 'object' && people.keys().includes(data.email) ) {
      let user = people[data.email]
      user.isFriend = data.isFriend;
      this.localStorage.setItem('people', {...people, [user.email]: user})
      return true
    }
    return false
  }

  /**
   * Возвращает стандартный нормализированный ответ сервера
   * @param {object} data
   * @param {int} status
   * @param {string} message
   * @returns {{status: number, payload: {}, message: string}}
   * @private
   */
  _handleResponse(data = {}, status = 200, message = '') {
    return {
      status: status,
      payload: data,
      message: message,
    }
  }

  /**
   * Сохраняет начальные данные пользователей
   * @param data
   * @return {void}
   */
  init(data) {
    let people = this.localStorage.getItem('people')
    if ( typeof people === 'object' ) {
      return
    }
    people = {};
    data.forEach( item => {
      people[item.email] = {...item, password: md5(item.password)}
    })
    this.localStorage.setItem('people', people)
  }

  /**
   * fake fetch data from server
   * @param {string} url
   * @param {object} data
   * @returns {Promise}
   */
  fetch(url, data = {}) {
    return new Promise((resolve, reject) => {
      let response = {}
      switch (url) {
        case '/login':
          response = this._login(data);
          break
        case '/logout':
          response = {logout: this._logout()}
          break
        case '/check_auth':
          response = {isAuth: this._checkAuth()}
          break
        case '/profile':
          response = {saved: this._profile(data)}
          break
        case '/people':
          response = {people: this._people()}
          break
        case '/mark_as_friend':
          response = {email: data.email, isFriend: this._markFriend(data)}
          break
        default:
          return reject(this._handleResponse(response, this.STATUS_NOT_FOUND, 'Page not found'))
      }
      return this._handleResponse(response, this.STATUS_OK, '')
    })
  }

}

let api = new Api(process.env.NODE_ENV)

export default api