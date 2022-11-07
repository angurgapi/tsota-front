export default {
  pushToast(state, toast) {
    if (state.toasts.length > 1) {
      state.toasts.shift()
    }
    toast.id = Date.now()
    state.toasts.push(toast)
  },
  deleteToast(state, toastId) {
    const idx = state.toasts.map((toast) => toast.id).indexOf(toastId)
    state.toasts.splice(idx, 1)
    // state.toasts = state.toasts.filter(({ id }) => id !== toastId)
  }
}
