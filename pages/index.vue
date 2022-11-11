<template>
  <div class="intro-page f-column">
    <template v-if="isLoading">
      <div>
        <svg-image class="loader" name="tire1" height="22" width="22" />
      </div>
    </template>
    <template v-else>
      <div class="intro-page__about f-column">
        <!-- <h1 class="intro-page__subtitle">{{ $t('Index.first') }}</h1>
        <h2 class="intro-page__name">{{ $t('Index.name') }}</h2>
        <h3 class="intro-page__description">{{ $t('Index.description') }}</h3>
        <div
          class="intro-page__details f-column"
          :class="{ 'intro-page__details--visible': detailsVisible }"
        >
          <span>{{ $t('Index.tools') }}</span>
          <span
            >Vue.js, Nuxt.js, JavaScript, git, EsLint, Jest, GitHub/GitLab, REST
            API, Firebase, Docker</span
          >
          <button class="btn intro-page__btn" @click="showProjects">
            {{ $t('Index.button') }}
          </button>
        </div> -->
        <div v-for="lesson in lessons" :key="lesson.id">
          {{ lesson.title }}
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data: () => ({
    isLoading: true,
    lessons: [],
    detailsVisible: false
  }),
  async fetch() {
    await this.getLessons()
  },

  head: {
    title: 'bricks',
    script: [{ src: '/js/sortable.min.js', defer: true }]
  },

  methods: {
    async getLessons() {
      this.isLoading = true
      try {
        const { data } = await this.$axios.get(
          'https://tsota.herokuapp.com/lessons'
        )
        console.log(data)

        this.lessons = data
      } catch (e) {
        console.log(e)
      }
      this.isLoading = false
    },

    async checkApi() {
      try {
        const response = await this.$axios.get(
          'https://tsota.herokuapp.com/lessons'
        )
        // console.log('response from api', response)
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.showDetails)
    // this.checkApi()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.showDetails)
  }
}
</script>

<style lang="scss" scoped>
.intro-page {
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  font-size: 26px;

  &__about {
    width: 100%;
    text-align: left;
  }

  &__subtitle {
    font-family: 'PF';
    font-size: 14px;
    color: #024013;
  }

  &__description {
    opacity: 0.6;
  }

  &__details {
    align-items: flex-start;
    margin-top: 30px;
    font-family: 'PF';
    opacity: 0;
    transition: 0.5s all ease-in-out;

    span {
      opacity: 0.6;
    }

    &--visible {
      opacity: 1;
    }
  }

  &__btn {
    margin-top: 30px;
    border: 2px solid #024013;
    font-family: 'PF';
    color: #024013;

    &:hover {
      background-color: rgba(2, 64, 19, 10%);
    }
  }

  &__description,
  &__name {
    font-family: 'Playfair', sans-serif;
    font-size: 2em;
    letter-spacing: 0.1em;
    color: #212120;
  }

  @media (max-width: 1000px) {
    font-size: 18px;
  }
}

.loader {
  width: 32px;
  height: 32px;
  fill: #000;
  animation: load8 2s infinite linear;
}

@keyframes load8 {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
