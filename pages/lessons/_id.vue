<template>
  <div class="page lesson">
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
                :key="image"
                class="swiper-slide"
                :img="image.url"
                :label="image.label"
                :royalty="image.royalty || 'getty'"
              />
              <!-- <div v-for="image in images" :key="image" class="swiper-slide">
                <img class="lesson__img" :src="image" />
                <span class="lesson__royalty"> ©getty images</span>
              </div> -->
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
        />
      </div>
      <PaginationBtns v-if="pagesTotal" :totalPages="pagesTotal" />
    </template>
  </div>
</template>

<script>
import { Swiper, Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import WordGuess from '@/components/lessons/WordGuess'
import PaginationBtns from '@/components/elements/PaginationBtns'

export default {
  name: 'LessonPage',
  components: { WordGuess, PaginationBtns },

  data: () => ({
    isLoading: false,
    letters: [],
    words: [],
    images: [],
    swiper: null,
    pagesTotal: 0,
    isSoundOn: true,
    description: ''
  }),
  async fetch() {
    await this.getLesson()
    await this.getTotalPages()
  },

  methods: {
    async getLesson() {
      // this.isLoading = true
      try {
        const { data } = await this.$axios.get(
          `https://tsota.herokuapp.com/lessons?order_num=${this.$route.params.id}`
        )

        const lessonData = data[0]
        // console.log('lesson data', data)
        this.description = lessonData.description || null
        this.words = lessonData.words
        this.letters = lessonData.letters
        this.images = lessonData.words
          .filter((word) => {
            return word.image_url
          })
          .map((word) => {
            return {
              label: word.value,
              url: word.image_url,
              royalty: word.img_royalty
            }
          })
        console.log(this.images)
      } catch (e) {
        console.log(e)
      }
      // this.isLoading = false
    },
    async getTotalPages() {
      try {
        const { data } = await this.$axios.get(
          `https://tsota.herokuapp.com/lessons`
        )
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
    }
  },

  mounted() {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
    }, 1500)
    setTimeout(() => {
      this.initSwiper()
    }, 1500)
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

.swiper-container-horizontal > .swiper-pagination-bullets,
.swiper-pagination-custom,
.swiper-pagination-fraction {
  bottom: 1px;
}

.swiper-wrapper {
  width: 100%;
  max-width: 300px;
}

// .swiper-pagination-bullets {
//   bottom: -5px;
// }
</style>
