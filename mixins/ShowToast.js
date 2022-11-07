export default {
  methods: {
    //one-liners
    showFail(text) {
      this.$notify({
        type: 'default',
        success: false,
        text: text
      })
    },
    showSuccess(text) {
      this.$notify({
        type: 'default',
        success: true,
        text: text
      })
    },

    closePush(id) {
      this.$closePush(id)
    }
  }
}
