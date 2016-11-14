import { createSelector } from 'reselect';

const userState = state => state.user
let fullNameSelector = createSelector([userState], user => {
    return `${user.firstName} ${user.lastName}`
})
let isAuthSelector = createSelector([userState], user => {
  return user.isAuth
})

export default (state) => {
  return {
    fullName: fullNameSelector(state),
    isAuth: isAuthSelector(state)
  };
};