<template>
  <div class="r-toasts f-column">
    <transition-group name="list" tag="div" class="f-column">
      <ToastMessage
        v-for="message in messages"
        :key="message.id"
        :message="message"
        @close="$emit('delete', message.id)"
      />
    </transition-group>
  </div>
</template>

<script>
import ToastMessage from './ToastMessage.vue'
export default {
  name: 'NotificationSlot',
  components: { ToastMessage },
  props: {
    messages: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>
