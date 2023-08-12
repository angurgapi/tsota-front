import actions from '@/store/actions'
import mutations from '@/store/mutations'

export { mutations, actions }

export const getters = {
  getAuth: (state) => state.auth.loggedIn
}
