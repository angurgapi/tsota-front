export default {
  async login({ commit }, { email, password }) {
    try {
      const { data } = await this.$auth.loginWith('local', {
        data: { email: email, password: password }
      })
      console.log('$auth res: ', data)
      if (data.token) {
        console.log('auth successful')
        this.$cookiz.set('user', data.user)
        commit('setUser', data.user)
        return data
      }
    } catch (e) {
      console.log(e)
      console.log('login request did not return token')
    }
  },

  async logout({ commit }) {
    try {
      await this.$auth.logout()
      console.log('auth module logged out')
      commit('setUser', null)
      this.$cookiz.remove('user')
      return Promise.resolve(true)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
