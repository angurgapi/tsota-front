<template>
  <div class="dropdown" @mouseleave="$emit('close')">
    <Accordion title="буквы" dark>
      <template #content>
        <ul keep-alive class="dropdown__links" @click="$emit('close')">
          <li v-for="link in links" :key="link.order_num">
            <nuxt-link
              class="dropdown__link f-row"
              :class="{ 'dropdown__link--active': isCurrent(link.order_num) }"
              :to="`/lessons/${link.order_num}`"
              >урок {{ link.order_num }}</nuxt-link
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

  computed: {
    ...mapState('links', ['links'])
  },
  methods: {
    isCurrent(linkNum) {
      return this.$route.params.id == linkNum
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown {
  &::v-deep.accordion__btn {
    padding-left: 20;
    font-family: 'PF';
    font-weight: 600;
    letter-spacing: 0.7px;
    color: #000 !important;
    opacity: 0.9;
  }
}
</style>
