import { createSelector } from 'reselect';

const user = state => state.user
let menuItemsSelector = createSelector([user], user => {
  let index = 1
  let menuItems = [{
    title: 'Главная страница',
    url: '/',
    index
  }]
  if (user.isAuth) {
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
let isAuthSelector = createSelector([user], user => {
  return user.isAuth
})

const error = state => state.application.error
let errorSelector = createSelector([error], error => {
  return error;
})

export default (state) => {
  return {
    menu: menuItemsSelector(state),
    error: errorSelector(state),
    isAuth: isAuthSelector(state)
  };
};