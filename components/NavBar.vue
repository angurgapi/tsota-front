<template>
  <nav class="navbar f-row" :class="{ 'navbar--fixed': isFixed }">
    <nuxt-link class="navbar__link" to="/">
      <img class="navbar__logo" src="img/ag.svg" />
    </nuxt-link>
    <div class="navbar__right f-row">
      <!-- <nuxt-link class="navbar__link" to="/pets">
        <svg-image height="20" width="20" name="book" />
        Уроки
      </nuxt-link> -->
      <button class="navbar__btn" @click="isModalVisible = !isModalVisible">
        алфавит
      </button>

      <div
        v-click-outside="
          () => {
            isDropdownOpen = false
          }
        "
        class="navbar__menu"
      >
        <button class="navbar__btn" @click="isDropdownOpen = !isDropdownOpen">
          <svg-image height="20" width="20" name="book" />
          учиться
        </button>
        <NavDropdown v-if="isDropdownOpen" @close="isDropdownOpen = false" />
      </div>
      <button
        v-if="!user"
        class="navbar__btn"
        @click="isAuthModalVisible = !isAuthModalVisible"
      >
        войти
      </button>
      <button v-else class="navbar__btn" @click="logOut">выйти</button>
      <!-- <button
        v-for="locale in availableLocales"
        :key="locale.code"
        class="btn navbar__link"
        @click="changeLocale(locale.code)"
      >
        {{ locale.name }}
      </button> -->
    </div>
    <OverlayModal v-if="isModalVisible" @close="isModalVisible = false">
      <template #content><Alphabet /></template>
    </OverlayModal>
    <AuthModal
      v-show="isAuthModalVisible"
      @close="isAuthModalVisible = false"
    />
  </nav>
</template>

<script>
import NavDropdown from './NavDropdown'
import Alphabet from './elements/Alphabet'
import AuthModal from './elements/AuthModal.vue'
import { mapState } from 'vuex'

export default {
  name: 'NavBar',
  components: { NavDropdown, Alphabet, AuthModal },
  data: () => ({
    isFixed: false,
    isDropdownOpen: false,
    isModalVisible: false,
    isAuthModalVisible: false
  }),
  computed: {
    // availableLocales() {
    //   return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    // },
    ...mapState('auth', ['user'])
  },

  methods: {
    // changeLocale(code) {
    //   this.$i18n.setLocale(code)
    //   console.log(this.$i18n.locale)
    // },
    onScroll() {
      if (window.pageYOffset > 0) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },
    logOut() {
      this.$store.commit('auth/LOGOUT')
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>
<style lang="scss" scoped>
.navbar::v-deep .overlay {
  align-items: flex-start;

  &__modal {
    overflow-x: hidden;
    margin-top: 40px;
    max-height: 80vh;
  }

  &__close {
    padding: 0;
    width: 15px;
    height: 15px;
    box-shadow: none;
    background: #fff;
  }
}
</style>
