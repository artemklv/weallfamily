import { createSelector } from 'reselect';

const isUserAuth = state => state.user.isAuth
let menuItemsSelector = createSelector([isUserAuth], (isUserAuth) => {
  let menuItems = [{
    title: 'Главная страница',
    url: '/'
  }]
  if (isUserAuth) {
    menuItems.push({
      title: 'Профиль',
      url: '/profile'
    })
  } else {
    menuItems.push({
      title: 'Зарегистрироваться',
      url: '/register'
    })
  }
  return menuItems
});

export default (state) => {
  return {
    menu: menuItemsSelector(state)
  };
};