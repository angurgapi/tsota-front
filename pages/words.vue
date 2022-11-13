<template>
  <div class="page">
    <div class="lesson__data card">
      <h2 class="lesson__title">Слова для запоминания</h2>
      <div v-if="words" class="lesson__images swiper-container">
        <div class="swiper-wrapper">
          <div v-for="word in words" :key="word.id" class="swiper-slide">
            <img class="lesson__img" :src="word.image_url" />
            <span class="lesson__royalty"> ©getty images</span>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.min.css'

export default {
  name: 'Words',
  data: () => ({
    words: [],
    swiper: null
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

        this.words = data.filter((word) => {
          return word.image_url
        })
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
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        draggable: true,

        autoplay: {
          delay: 3000
        }
      })
    }
  },
  mounted() {
    if (this.words.length) {
      this.initSwiper()
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-container {
  padding-bottom: 30px;
  max-width: 300px;
}

.swiper-wrapper {
  width: 100%;
  max-width: 300px;
}

.swiper-slide {
  width: 100%;
  height: auto;
}
</style>
