export default {
  data() {
    return {
      window: {
        width: null,
        height: null
      }
    }
  },

  methods: {
    matchMedia(query) {
      // Пример запроса: width > 1024
      const [param, operator, value] = query.split(' ')

      return operator === '>'
        ? this.window[param] >= value
        : this.window[param] < value
    }
  },

  mounted() {
    // setTimeout(() => {
    this.window.width = window.innerWidth
    this.window.height = window.innerHeight

    window.addEventListener('resize', () => {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    })
    // })

    this.$nextTick(() => {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    })
  }
}
