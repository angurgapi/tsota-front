export default {
  async LOGIN({ commit }, { email, password }) {
    try {
      return await this.$api.post('/auth/login', {
        email,
        password
      })
    } catch (e) {
      return Promise.reject(e)
    }
  },

  async LOGOUT({ commit }) {
    try {
      await this.$api.get('/auth/logout')

      commit('SET_USER', null)

      return Promise.resolve(true)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
