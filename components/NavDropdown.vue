<template>
  <div class="dropdown">
    <ul class="dropdown__links" @click="$emit('close')">
      <li v-for="link in links" :key="link.order_num">
        <nuxt-link
          class="dropdown__link f-row"
          :to="`/lessons/${link.order_num}`"
          >Урок {{ link.order_num }}</nuxt-link
        >
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'NavDropdown',
  //   async asyncData({ $axios }) {
  //     try {
  //       const data = $axios.$get('http://localhost:1337/api/lessons')
  //       console.log()
  //       return {
  //         links: data.data
  //       }
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   },
  //   data: () => ({
  //     links: []
  //   }),
  computed: {
    ...mapState('links', ['links'])
  },
  created() {
    this.$store.dispatch('links/getLinks')
  }
}
</script>
