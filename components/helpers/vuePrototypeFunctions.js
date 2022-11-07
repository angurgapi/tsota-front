export default {
  $notify(msg) {
    this.$store.commit('toasts/pushToast', msg)
    setTimeout(() => {
      this.$store.commit('toasts/deleteToast', msg.id)
    }, 6000)
  },
  $closePush(id) {
    this.$store.commit('toasts/deleteToast', id)
  }
}
