<template>
  <div class="dropdown" @mouseleave="$emit('close')">
    <Accordion title="буквы" dark>
      <template #content>
        <ul keep-alive class="dropdown__links" @click="$emit('close')">
          <li v-for="i in 10" :key="i">
            <nuxt-link
              class="dropdown__link f-row"
              :class="{ 'dropdown__link--active': isCurrent(i) }"
              :to="`/lessons/${i}`"
              >урок {{ i }}</nuxt-link
            >
          </li>
        </ul>
      </template>
    </Accordion>
    <ul keep-alive class="dropdown__links" @click="$emit('close')">
      <li>
        <nuxt-link
          class="dropdown__link f-row"
          :class="{ 'dropdown__link--active': $route.path === '/words' }"
          to="/words"
          >карточки</nuxt-link
        >
      </li>
      <li>
        <nuxt-link
          class="dropdown__link f-row"
          :class="{ 'dropdown__link--active': $route.path === '/numbers' }"
          to="/numbers"
          >числа</nuxt-link
        >
      </li>
      <li>
        <nuxt-link
          class="dropdown__link f-row"
          :class="{ 'dropdown__link--active': $route.path === '/shopping' }"
          to="/shopping"
          >шоппинг</nuxt-link
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
  // computed: {
  //   ...mapState('links', ['links'])
  // },
  methods: {
    isCurrent(linkNum) {
      return this.$route.params.id == linkNum
    }
  }
  // created() {
  //   this.$store.dispatch('links/getLinks')
  // }
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
