<template>
  <nav class="navbar f-row" :class="{ 'navbar--fixed': isFixed }">
    <nuxt-link class="navbar__link" to="/">
      <div class="navbar__logo f-row">
        <img class="navbar__logo navbar__logo--mob" src="img/logo-pic.svg" />
        <img class="navbar__logo navbar__logo--desk" src="img/logo-text.svg" />
      </div>
    </nuxt-link>
    <div class="navbar__right f-row">
      <button class="navbar__btn" @click="isModalVisible = !isModalVisible">
        {{ $t('Navbar.alphabet') }}
      </button>

      <LocaleSwitcher
        :option="getLocaleOption"
        :locale="locale"
        @toggle="toggleLocale"
      />
      <NavDropdown v-if="isDropdownOpen" @close="isDropdownOpen = false" />

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
          <span>{{ $t('Navbar.learn') }}</span>
        </button>
        <NavDropdown v-if="isDropdownOpen" @close="isDropdownOpen = false" />
      </div>
      <!-- <button
        v-if="!$auth.user"
        class="navbar__btn"
        @click="isAuthModalVisible = !isAuthModalVisible"
      >
        войти
      </button> -->
      <!-- <nuxt-link v-else class="navbar__btn" to="/profile"> кабинет </nuxt-link> -->
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
import LocaleSwitcher from '@/components/elements/LocaleSwitcher'
import Alphabet from './elements/Alphabet'
import AuthModal from './elements/AuthModal.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'NavBar',
  components: { NavDropdown, Alphabet, AuthModal, LocaleSwitcher },
  data: () => ({
    isFixed: false,
    isDropdownOpen: false,
    isModalVisible: false,
    isAuthModalVisible: false
  }),

  computed: {
    ...mapState('authorization', ['user']),
    ...mapState('i18n', ['locale']),
    // ...mapState({
    //   user: 'authorization/user',
    //   locale: 'i18n/locale'
    // }),

    getLocaleOption() {
      return this.locale === 'ru' ? 'en' : 'ru'
    }
  },

  methods: {
    ...mapMutations('i18n', ['setLocale']),

    toggleLocale() {
      this.$i18n.setLocale(this.getLocaleOption)
      this.$cookiz.set('lang', this.getLocaleOption)
    },
    logOut() {
      this.$store.dispatch('authorization/logout')
    },

    onScroll() {
      if (window.pageYOffset > 0) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
    if (window.pageYOffset > 0) {
      this.isFixed = true
    }
    console.log(this.$store)
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
    height: fit-content;
    cursor: grab;
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
