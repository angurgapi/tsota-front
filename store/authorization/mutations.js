export default {
  SET_USER(state, user) {
    state.user = user ? user : null
  },

  LOGOUT(state) {
    state.user = null
  }
}
