<template>
  <div class="dropdown" @mouseleave="$emit('close')">
    <Accordion title="буквы" dark>
      <template #content>
        <ul keep-alive class="dropdown__links" @click="$emit('close')">
          <li v-for="link in links" :key="link.order_num">
            <nuxt-link
              class="dropdown__link f-row"
              :to="`/lessons/${link.order_num}`"
              >урок {{ link.order_num }}</nuxt-link
            >
          </li>
        </ul>
      </template>
    </Accordion>
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

<style lang="scss" scoped>
.dropdown {
  &::v-deep.accordion__btn {
    font-family: 'PF';
    font-weight: 600;
    letter-spacing: 0.7px;
    color: #000 !important;
    opacity: 0.9;
  }
}
</style>
