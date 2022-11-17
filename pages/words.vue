<template>
  <div class="page">
    <template v-if="isLoading">
      <div>
        <img class="loader" src="img/khinkali.png" />
      </div>
    </template>
    <template v-else>
      <div class="lesson__data card">
        <h2 class="lesson__title">Слова для запоминания</h2>
        <div v-if="words" class="lesson__images swiper-container">
          <div class="swiper-wrapper">
            <div
              v-for="word in words"
              :key="word.id"
              class="swiper-slide flashcard"
            >
              <img class="flashcard__img" :src="word.image_url" />
              <span class="flashcard__royalty"> ©getty images</span>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { Swiper, Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.min.css'

export default {
  name: 'Words',
  data: () => ({
    words: [],
    swiper: null,
    isLoading: false
  }),
  async fetch() {
    await this.getImages()
  },

  methods: {
    async getImages() {
      try {
        const { data } = await this.$axios.get(
          'https://tsota.herokuapp.com/words'
        )

        this.words = data
          .filter((word) => {
            return word.image_url
          })
          .sort(() => Math.random() - 0.5)
      } catch (e) {
        console.log(e)
      }
    },
    initSwiper() {
      Swiper.use([Navigation, Pagination, Autoplay])
      this.swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        modules: [Navigation, Pagination, Autoplay],
        slidesPerView: 1,
        draggable: true
      })
    }
  },
  beforeMount() {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
    }, 1500)

    if (this.words.length) {
      setTimeout(() => {
        this.initSwiper()
      }, 1600)
    }
  }
}
</script>

<style lang="scss" scoped>
.lesson__title {
  margin-bottom: 30px;
}

.swiper-wrapper {
  width: 100%;
  max-width: 450px;

  @media (max-width: 700px) {
    max-width: 90vw;
  }
}

.swiper-pagination-bullet-active {
  background: #4b83a6;
}

.swiper-slide {
  width: 100%;
  height: auto;
}

.flashcard {
  img {
    margin: auto;
    width: 100%;
    height: auto;
  }

  &__royalty {
    float: right;
    width: 100%;
    text-align: right;
    text-transform: uppercase;
    opacity: 0.3;
  }
}
</style>
