<template>
  <transition name="fade2">
    <div class="overlay" @click.prevent="$emit('close')">
      <div class="overlay__modal" @click.stop>
        <div class="auth-form">
          <div class="auth-form__header f-row">
            <button
              class="btn auth-form__tab"
              :class="{ 'auth-form__tab--active': mode === 'registration' }"
              @click="mode = 'registration'"
            >
              Регистрация
            </button>
            <button
              class="btn auth-form__tab"
              :class="{ 'auth-form__tab--active': mode === 'login' }"
              @click="mode = 'login'"
            >
              Вход
            </button>
          </div>

          <input
            v-if="mode === 'registration'"
            v-model="userData.name"
            class="form__input"
            placeholder="name"
          />
          <input
            v-model="userData.email"
            class="form__input"
            placeholder="email"
            :class="{ 'form__input--error': invalidData }"
            @input="invalidData = false"
          />
          <input
            v-model="userData.password"
            class="form__input"
            placeholder="password"
            :class="{ 'form__input--error': invalidData }"
            @input="invalidData = false"
          />
          <div class="form__actions">
            <button class="btn btn--danger" @click="$emit('close')">
              отмена
            </button>
            <button class="btn btn--success" @click="authUser">
              {{ mode === 'registration' ? 'регистрация' : 'вход' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'AuthModal',

  data: () => ({
    mode: 'login',
    userData: {
      email: '',
      password: ''
    },
    invalidData: false
  }),
  methods: {
    ...mapActions('authorization', ['login']),

    async authUser() {
      console.log(this.userData)
      if (this.mode === 'registration') {
        try {
          const { data } = await this.$axios.post(
            `${this.$config.apiUrl}/auth/register`,
            this.userData
          )
          if (data.id) {
            console.log('successful registration, user id: ', data.id)
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          const data = await this.login(this.userData)
          if (data.token) {
            this.$emit('close')
            this.$router.push('/profile')
          }
        } catch (e) {
          console.log(e)
          this.invalidData = true
        }
      }
    }
  }
}
</script>

<style lang="scss">
.auth-form {
  padding: 24px;
  &__tab {
    font-size: 22px;
    color: #0a1873;
    opacity: 0.7;
    &--active {
      opacity: 1;
    }
  }
  .form__actions,
  .form__input {
    margin-top: 20px;
  }

  .form__input--error {
    border-color: red;
  }
}
</style>
