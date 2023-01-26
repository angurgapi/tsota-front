export default {
  async nuxtServerInit({ commit }, { app }) {
    const user = this.$cookiz.get('user')
    // console.log(user)
    commit('authorization/setUser', user)
    const { data } = await this.$axios.get('/lesson')
    commit('links/setLinks', data)
  }
}
