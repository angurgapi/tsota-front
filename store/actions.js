export default {
  async nuxtServerInit({ commit }, { app }) {
    const user = this.$cookiz.get('user') || null
    if (user) {
      commit('authorization/setUser', user)
    }
    // console.log(user)

    const { data } = await this.$axios.get('/lesson')
    commit('links/setLinks', data)
  }
}
