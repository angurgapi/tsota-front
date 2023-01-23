export default {
  async LOGIN({ commit }, { email, password }) {
    try {
      console.log(email, password)
      const { data } = await this.$auth.loginWith('local', {
        data: { email: email, password: password }
      })
      console.log('auth module results: ', data)
      if (data.token) {
        console.log('auth successful')
        // commit('SET_USER', data.user)
        // this.$auth.setUser(data.user)
        await this.$auth.setUser({
          email: data.user.email,
          password: data.user.password,
          role: data.user.role
        })
        console.log(this.$auth)
      }

      return data
    } catch (e) {
      console.log(e)
    }
  },

  async LOGOUT({ commit }) {
    try {
      await this.$auth.logout()
      console.log(this.$auth.user)

      commit('SET_USER', null)

      return Promise.resolve(true)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
