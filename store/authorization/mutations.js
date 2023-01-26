export default {
  setUser(state, user) {
    state.user = user ? user : null
  },

  logout(state) {
    state.user = null
  }
}
