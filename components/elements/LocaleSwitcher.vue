<template>
  <div
    v-click-outside="
      () => {
        isMenuOpen = false
      }
    "
    class="locale-switcher f-col"
  >
    <button class="navbar__btn" @click="isMenuOpen = !isMenuOpen">
      {{ locale }}
    </button>
    <div v-show="isMenuOpen" class="locale-switcher__menu">
      <button class="navbar__btn" @click="toggleLocale">
        {{ option }}
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    locale: {
      type: String,
      default: 'en'
    },
    option: {
      type: String,
      default: 'ru'
    }
  },
  setup(props, { emit }) {
    const isMenuOpen = ref(false)

    const toggleLocale = () => {
      emit('toggle')
      isMenuOpen.value = false
    }

    return {
      isMenuOpen,
      toggleLocale
    }
  }
})
</script>

<style lang="scss" scoped>
.locale-switcher {
  position: relative;

  &__menu {
    position: absolute;
    top: 30px;
    background: #fff;
    border-radius: 5px;
  }
}
</style>
