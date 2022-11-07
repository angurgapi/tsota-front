<template>
  <div class="wrapper">
    <NavBar />
    <div class="wrapper__content">
      <Nuxt />
    </div>
    <FooterBlock />
    <client-only>
      <NotificationSlot :messages="toasts" @delete="closePush" />
    </client-only>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NotificationSlot from '@/components/toasts/NotificationSlot'
import NavBar from '@/components/NavBar.vue'
import FooterBlock from '@/components/FooterBlock.vue'

export default {
  components: { NavBar, FooterBlock, NotificationSlot },
  computed: {
    ...mapState('toasts', ['toasts'])
  },
  methods: {
    closePush(id) {
      this.$closePush(id)
    }
  }
}
</script>

<style lang="scss">
.wrapper {
  background: url('~/assets/bgg.jpg');
}
</style>
