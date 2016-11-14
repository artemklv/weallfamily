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
    this._getData = this._getData.bind(this)
    this._setData = this._setData.bind(this)
    this._checkAuth = this._checkAuth.bind(this)
    this._people = this._people.bind(this)
    this._login = this._login.bind(this)
    this._logout = this._logout.bind(this)
    this._user = this._user.bind(this)
    this._markFriend = this._markFriend.bind(this)
    this.init = this.init.bind(this)
    this.fetch = this.fetch.bind(this)
    this.fetch = this.fetch.bind(this)
  }

  /**
   * Извлекаем данные из хранилища
   * @param {string} key
   * @private
   */
  _getData(key) {
    return JSON.parse(this.localStorage.getItem(key))
  }

  /**
   * Сохраняем данные в хранилище
   * @param {string} key
   * @param {object} data
   * @private
   */
  _setData(key, data) {
    this.localStorage.setItem(key, JSON.stringify(data))
  }

  /**
   * Проверяет авторизацию пользователя
   * @returns {boolean}
   * @private
   */
  _checkAuth() {
    return !!this._getData('token')
  }

  /**
   * Авторизация пользователя в случае успеха возвращает его объект
   * @param {object} data
   * @returns {null|object}
   * @private
   */
  _login(data) {
    const people = this._getData('people')
    if (!people) {
      return null
    }
    const user = people[data.email]
    if (!user) {
      return null
    }
    if (user.password === md5(data.password)) {
      delete user.password
      delete user.isFriend
      this._setData('token', md5(user.email))
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
    const people = this._getData('people')
    this._setData('people', {...people, [data.email]: data})
    return true
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * @param {object} data
   * @returns {boolean}
   * @private
   */
  _user() {
    const token = this._getData('token')
    const people = this._getData('people')
    const peopleIndexes = Object.keys(people)
    for (let index of peopleIndexes) {
      if (md5(index) === token) {
        let user = people[index];
        delete user.password
        return user
      }
    }
    return null
  }

  /**
   * Возвращает список пользователей за исключением текущего пользователя
   * @returns {Array}
   * @private
   */
  _people() {
    let response = [];
    const people = this._getData('people')
    const token = this._getData('token')
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
    const people = this._getData('people')
    if (people && people.keys().includes(data.email) ) {
      let user = people[data.email]
      user.isFriend = data.isFriend;
      this._setData('people', {...people, [user.email]: user})
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
    let people = this._getData('people')
    if (people) {
      return
    }
    people = {};
    data.forEach( item => {
      people[item.email] = {...item, password: md5(item.password)}
    })
    this._setData('people', people)
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
        case '/user':
          response = {user: this._user()}
          break
        case '/people':
          response = {people: this._people()}
          break
        case '/mark_as_friend':
          response = {email: data.email, isFriend: this._markFriend(data)}
          break
        default:
          return reject(this._handleResponse(response, this.STATUS_NOT_FOUND, 'Page not found'))
          break
      }
      return resolve(this._handleResponse(response, this.STATUS_OK, ''))
    })
  }

}

let api = new Api(process.env.NODE_ENV)

export default api