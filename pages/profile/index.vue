<template>
  <div class="page">
    <h2 class="page__title">Личный кабинет</h2>
    <template v-if="$auth.loggedIn">
      <div class="user-data">
        <span class="user-data__label">логин</span> <span>{{ user.name }}</span>
        <span class="user-data__label">e-mail</span>
        <span>{{ user.email }}</span>
        <span class="user-data__label">роль</span>
        <span>{{ user.role }}</span>
      </div>
      <div v-if="user.completedLessons.length" class="user-lessons f-column">
        <h4>Пройденные уроки</h4>
        <div class="user-lessons__lessons f-row">
          <div
            v-for="(lesson, index) in getSortedLessons"
            :key="index"
            class="card user-lessons__lesson"
          >
            {{ lesson }}
          </div>
        </div>
      </div>
      <button class="navbar__btn" @click="logOut">выйти</button>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  middleware: ['auth'],

  async fetch() {
    this.getUserData()
  },

  computed: {
    ...mapState('authorization', ['user']),
    getSortedLessons() {
      let sortedLessons = [...this.user.completedLessons].sort()
      return sortedLessons
    }
  },

  methods: {
    async getUserData() {
      try {
        console.log('triggered user data')
        const data = await this.$axios.get('/auth/profile')
        console.log(data)
      } catch (e) {
        console.log(e)
      }
    },
    logOut() {
      // this.$store.commit('authorization/logOut')
      this.$store.dispatch('authorization/logout')
    }
  }
}
</script>

<style lang="scss" scoped>
.user-data {
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 16px;
  &__label {
    text-align: right;
    font-weight: 600;
  }
}
.user-lessons {
  margin-top: 40px;
  &__lessons {
    margin-top: 20px;
  }
  &__lesson {
    &:not(:last-child) {
      margin-right: 14px;
    }
  }
}
</style>
