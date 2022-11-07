<template>
  <div class="card">
    <div class="toast-form f-column">
      <input
        v-model="message"
        maxlength="255"
        type="text"
        class="toast-form__input"
        :placeholder="$t('Toasts.placeholder')"
      />
      <div class="toast-form__actions">
        <button class="btn btn--success" @click="testNotify('success')">
          {{ $t('Toasts.success') }}
        </button>
        <button class="btn btn--error" @click="testNotify('fail')">
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

<style lang="scss">
.toast-form {
  padding: 24px;

  &__input {
    outline: none;
    border: 1px solid #a8aaad;
    border-radius: 5px;
    padding: 10px;
    height: 46px;
    background: #fff;

    &:focus {
      border: 1px solid black;
    }
  }

  &__actions {
    display: grid;
    grid-gap: 18px;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 30px;
  }
}

.adas {
  width: 100px;
  height: 100px;
}
</style>
