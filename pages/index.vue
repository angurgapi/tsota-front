<template>
  <div class="intro-page f-column">
    <template v-if="isLoading">
      <div>
        <img class="loader" src="img/khinkali.png" />
      </div>
    </template>
    <template v-else>
      <div class="intro-page__about f-column">
        <p class="intro-page__intro">
          <span class="highlighted">Aguri (აგური)</span> переводится с
          грузинского языка как "кирпич". Если начать с малого, со временем
          можно обнаружить, что уже и фундамент готов, и половина первого этажа
          построена,
          <!-- <s>стену, покрыть крышу черепицей, созвать друзей на шашлыки...</s> -->
          и ценники в супермаркете читаются быстро, не оставляя вопросов, где
          тут Киндзмараули по акции. Мы, конечно, начнем с алфавита.
        </p>

        <ul class="intro-page__links">
          <li v-for="link in links" :key="link.order_num">
            <nuxt-link
              class="intro-page__link f-row"
              :to="`/lessons/${link.order_num}`"
              >Урок {{ link.order_num }}:<span
                v-for="(letter, index) in getLessonLetters(link)"
                :key="index"
                class="intro-page__letter"
                >{{ letter }}</span
              ></nuxt-link
            >
          </li>
        </ul>
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
    links: []
  }),
  async fetch() {
    await this.getLessons()
  },

  head: {
    title: 'Aguri'
    // script: [{ src: '/js/sortable.min.js', defer: true }]
  },

  methods: {
    async getLessons() {
      this.isLoading = true
      try {
        const { data } = await this.$axios.get(
          'https://tsota.herokuapp.com/lessons'
        )
        console.log(data)

        this.links = data
      } catch (e) {
        console.log(e)
      }
      this.isLoading = false
    },
    getLessonLetters(lesson) {
      return lesson.letters.map((letter) => {
        return letter.value
      })
    }
  }

  // mounted() {
  //   this.$store.dispatch('links/getLinks')
  // }
}
</script>

<style lang="scss" scoped>
.intro-page {
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  font-family: 'PF';
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

  &__links {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  }

  &__link {
    color: #0d1418;

    &:hover {
      color: rgb(11, 110, 249);
    }
  }

  &__letter {
    margin-left: 16px;
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
  //border-radius: 50%;
  width: 42px;
  height: 42px;
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
