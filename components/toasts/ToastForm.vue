<template>
  <div class="card">
    <div class="form f-column">
      <input
        v-model="message"
        maxlength="255"
        type="text"
        class="form__input"
        :placeholder="$t('Toasts.placeholder')"
      />
      <div class="form__actions">
        <button class="btn btn--success" @click="testNotify('success')">
          {{ $t('Toasts.success') }}
        </button>
        <button class="btn btn--danger" @click="testNotify('fail')">
          {{ $t('Toasts.error') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToastForm',
  data: () => ({
    message: ''
  }),
  methods: {
    testNotify(mode) {
      let msg = this.message.length
        ? this.message
        : this.$t('Toasts.placeholder')
      mode === 'success' ? this.showSuccess(msg) : this.showFail(msg)
      this.clearInput()
    },
    clearInput() {
      this.message = ''
    }
  },
  mounted() {
    this.showSuccess(this.$t('Toasts.testSuccess'))
    setTimeout(() => {
      this.showFail(this.$t('Toasts.testError'))
    }, 6000)
  }
}
</script>
