export default ({ $auth, store, error, $axios, $cookiz }) => {
  // const token = $auth.strategies.local.token.get()
  const token = $cookiz.get('c._token.local')
  if (token) {
    $axios.setToken(token, 'Bearer')
  }

  $axios.onError((e) => {
    if (e.name === 'ExpiredAuthSessionError') {
      store.dispatch('logout')
    } else if (e.response?.status === 500) {
      error({ statusCode: 404 })
    } else if (e.response?.status === 401) {
      try {
        const { title, description } = e.response?.data?.error?.message
        if (title || description) {
          console.log(`<b>${title}: </b>${description}`)
        }
        store.dispatch('logout')
      } catch (e) {
        console.error(e)
      }
    }
  })
}
