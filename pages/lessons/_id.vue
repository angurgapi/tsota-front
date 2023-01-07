<template>
  <div class="page page--fullwidth lesson">
    <template v-if="isLoading">
      <div>
        <img class="loader" src="img/khinkali.png" />
      </div>
    </template>
    <template v-else>
      <div class="lesson__data card">
        <h2 class="lesson__title">Урок {{ $route.params.id }}</h2>
        <div class="lesson__info">
          <div class="lesson__letters">
            <div
              v-for="letter in letters"
              :key="letter.id"
              class="lesson__letter"
            >
              <span>{{ letter.value }} ({{ letter.transliteration }})</span>
              <span>{{ letter.description }} </span>
            </div>
            <span v-if="description" class="lesson__description"
              ><i>{{ description }}</i></span
            >
          </div>

          <div v-if="images" class="lesson__images swiper-container">
            <div class="swiper-wrapper">
              <Polaroid
                v-for="image in images"
                :key="image.label"
                class="swiper-slide"
                :img="image.url"
                :label="image.label"
                :royalty="image.royalty || ''"
              />
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>

      <div class="lesson__words card">
        <button
          class="btn lesson__volume"
          :class="{ 'lesson__volume--active': isSoundOn }"
          @click="isSoundOn = !isSoundOn"
        >
          <svg-image
            :name="`${isSoundOn ? 'volume-off' : 'volume-on'}`"
            height="25"
            width="25"
          />
        </button>
        <h3 class="lesson__headline">Тренировка</h3>
        <p class="lesson__legend">
          Вы <span class="highlighted">уже можете</span> это прочесть!<br />Заполните
          пропуски напротив слов латинской транслитерацией
        </p>
        <img class="lesson__tutorial" src="/img/howto.gif" />
        <WordGuess
          v-for="word in words"
          :key="word.transliteration"
          :wordData="word"
          :sound="isSoundOn"
          @nailed="lessonNailedWords++"
          @failed="lessonNailedWords--"
        />
      </div>
      <PaginationBtns v-if="pagesTotal" :totalPages="pagesTotal" />
    </template>

    <Firework v-if="showFireworks" />
  </div>
</template>

<script>
import { Swiper, Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import WordGuess from '@/components/lessons/WordGuess'
import Firework from '@/components/lessons/Firework'
import PaginationBtns from '@/components/elements/PaginationBtns'

export default {
  name: 'LessonPage',
  components: { WordGuess, PaginationBtns, Firework },

  async asyncData({ $axios, params, error }) {
    try {
      const { data } = await $axios.get(
        `http://localhost:3000/lesson/?order_num=${params.id}`
      )
      return {
        description: data[0].description || null,
        letters: data[0].letters || [],
        words: data[0].words || [],
        images:
          data[0].words
            .filter((word) => {
              return word.image_url
            })
            .map((word) => {
              return {
                label: word.value,
                url: word.image_url,
                royalty: word.img_royalty
              }
            }) | null
      }
    } catch (e) {
      console.error(e)
      error({ statusCode: 404 })
    }
  },

  data: () => ({
    isLoading: false,
    swiper: null,
    pagesTotal: 0,
    isSoundOn: true,
    description: '',
    lessonNailedWords: 0,
    isLessonComplete: false,
    showFireworks: false
  }),

  async fetch() {
    await this.getTotalPages()
  },

  watch: {
    lessonNailedWords(newVal) {
      if (newVal === this.words.length) {
        this.isLessonComplete = true
        this.congratulateUser()
      } else {
        this.isLessonComplete = false
      }
    }
  },
  methods: {
    async getTotalPages() {
      try {
        const { data } = await this.$axios.get(`http://localhost:3000/lesson`)
        this.pagesTotal = data.length
      } catch (e) {
        console.log(e)
      }
    },
    initSwiper() {
      Swiper.use([Navigation, Pagination, Autoplay])
      this.swiper = new Swiper('.swiper-container', {
        //https://swiperjs.com/swiper-api#parameters
        direction: 'horizontal',
        loop: true,
        modules: [Navigation, Pagination, Autoplay],
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        draggable: true,

        autoplay: {
          delay: 3000
        }
        // Navigation arrows
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev'
        // }
      })
    },
    congratulateUser() {
      const inputs = document.querySelectorAll('input')
      // console.log(inputs)
      inputs.forEach((input) => input.blur())
      this.showFireworks = true
      setTimeout(() => (this.showFireworks = false), 4000)
      let audio = new Audio('sounds/trumpet.mp3')
      audio.volume = 0.7
      audio.play()
    }
  },

  mounted() {
    this.initSwiper()
  }
}
</script>

<style lang="scss">
.page {
  @media (max-width: 420px) {
    padding: 20px 0;
  }
}

.swiper-container {
  max-width: 300px;
}

.swiper-pagination-bullet-active {
  background: #4b83a6;
}

.swiper-wrapper {
  width: 100%;
  max-width: 300px;
}

// .swiper-pagination-bullets {
//   bottom: -5px;
// }
</style>
