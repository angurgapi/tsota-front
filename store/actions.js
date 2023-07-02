export default {
  async nuxtServerInit({ commit }, { req }) {
    const user = this.$cookiz.get('user') || null
    if (user) {
      commit('authorization/setUser', user)
    }
    // console.log(user)

    const { data } = await this.$axios.get('/lesson')
    commit('links/setLinks', data)

    // const locale = req.headers["accept-language"].split(",")[0] || "en";
    const locale =
      this.$cookiz.get('lang') ||
      req.headers['accept-language'][0] + req.headers['accept-language'][1]
    // console.log(locale)
    commit('setLocale', locale)
  }
}
