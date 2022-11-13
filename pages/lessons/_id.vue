<template>
  <div class="page lesson">
    <template v-if="isLoading">
      <div>
        <img class="loader" src="img/khinkali.png" />
      </div>
    </template>
    <template v-else>
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
        </div>
        <div v-if="files" class="lesson__images">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div v-for="file in files" :key="file.id" class="swiper-slide">
                <img
                  class="lesson__img"
                  :src="`https://tsota.herokuapp.com${file.file[0].url}`"
                />
                <span class="lesson__royalty">
                  ©{{ file.royalty || 'getty images' }}</span
                >
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
      <div class="lesson__words">
        <h3 class="lesson__headline">Тренировка</h3>
        <p class="lesson__legend">
          Вы <span class="highlighted">уже можете</span> это прочесть!<br />Заполните
          пропуски напротив слов латинской транслитерацией
        </p>
        <WordGuess
          v-for="word in words"
          :key="word.transliteration"
          :wordData="word"
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
    // images: [],
    files: [],
    swiper: null,
    pagesTotal: 0
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
        this.words = lessonData.words
        this.letters = lessonData.letters
        this.files = lessonData.files
        console.log(this.files)
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
    }
  },
  created() {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
    }, 1500)
  },

  mounted() {
    if (this.files?.length) {
      Swiper.use([Navigation, Pagination, Autoplay])

      const swiper = new Swiper('.swiper-container', {
        //https://swiperjs.com/swiper-api#parameters
        direction: 'horizontal',
        loop: true,
        // remove unused modules if needed
        modules: [Navigation, Pagination, Autoplay],

        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },

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
  }
}
</script>

<style lang="scss" scoped>
.lesson {
  &__legend {
    margin: 20px auto;
    font-family: 'PF';
    text-align: center;
  }

  &__info {
    display: grid;
    justify-items: center;
    grid-gap: 30px;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;

    @media (max-width: 1000px) {
      grid-template-columns: 1fr;
    }
  }

  &__letters {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: fit-content;
  }

  &__letter {
    display: flex;
    align-items: center;

    span {
      // max-width: 300px;

      &:not(:first-child) {
        font-family: 'PF';
      }

      &:first-child {
        margin-right: 20px;
        font-size: 22px;
      }
    }

    @media (max-width: 800px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &__img {
    position: relative;
    width: 100%;
    height: auto;
  }

  &__royalty {
    position: absolute;
    right: 5px;
    font-family: 'Rubik';
    font-size: 12px;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 40%);
  }

  &__words {
    margin-top: 30px;
    margin-bottom: 30px;
    max-width: 100%;
  }

  &__title,
  &__headline {
    font-family: 'PF';
    text-align: center;
  }
}

.swiper-container {
  padding-bottom: 30px;
  max-width: 300px;
}

.swiper-pagination-bullets {
  bottom: -5px;
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
