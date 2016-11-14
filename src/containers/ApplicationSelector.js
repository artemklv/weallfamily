import { createSelector } from 'reselect';

const isUserAuth = state => state.user.isAuth
let menuItemsSelector = createSelector([isUserAuth], (isUserAuth) => {
  let index = 1
  let menuItems = [{
    title: 'Главная страница',
    url: '/',
    index
  }]
  if (isUserAuth) {
    menuItems.push({
      title: 'Профиль',
      url: '/profile',
      index: ++index
    })
  } else {
    menuItems.push({
      title: 'Зарегистрироваться',
      url: '/register',
      index: ++index
    })
  }
  return menuItems
});

const error = state => state.application.error
let errorSelector = createSelector([error], error => {
  return error;
})

export default (state) => {
  return {
    menu: menuItemsSelector(state),
    error: errorSelector(state)
  };
};