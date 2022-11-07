<template>
  <div class="r-toast f-row">
    <button class="r-toast__close" @click="$emit('close', message.id)">
      <svg-image name="close" />
    </button>

    <div class="r-toast__left">
      <div
        class="r-toast__circle f-column"
        :style="`background: ${
          message.success
            ? 'linear-gradient(180deg, #68E36A 0%, #00BCC8 100%);'
            : '#FF4040'
        }`"
      >
        <svg-image
          class="r-toast__icon"
          :name="message.success ? 'checked' : 'caution'"
        />
      </div>
    </div>
    <div class="r-toast__right f-column">
      <span class="r-toast__status">{{
        message.success ? $t('Toasts.success') : $t('Toasts.error')
      }}</span
      ><span class="r-toast__description">{{ message.text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToastMessage',
  props: {
    message: {
      type: Object,
      required: true
    }
  }
}
</script>
