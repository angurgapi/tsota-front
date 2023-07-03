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
  head() {
    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('Description')
        }
      ]
    }
  },
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
  // background: url('~/assets/bgg.jpg');
  // background-color: rgb(243, 244, 245);
  background: linear-gradient(
    238deg,
    rgba(72, 91, 166, 16%) 0%,
    rgba(244, 195, 34, 16.3%) 50%,
    rgba(238, 115, 7, 16%) 100%
  );
}
</style>
