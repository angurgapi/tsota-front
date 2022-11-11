<template>
  <div class="page lesson">
    <h2 class="lesson__title">Урок {{ $route.params.id }}</h2>
    <div class="lesson__info">
      <div class="lesson__letters">
        <div v-for="letter in letters" :key="letter.id" class="lesson__letter">
          <span>{{ letter.value }} ({{ letter.transliteration }})</span>
          <span>{{ letter.description }} </span>
        </div>
      </div>
      <div v-if="images" class="lesson__images">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div v-for="image in images" :key="image.url" class="swiper-slide">
              <img
                class="lesson__img"
                :src="`https://tsota.herokuapp.com${image.url}`"
              />
              <span class="lesson__royalty"> ©{{ image.caption }}</span>
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
  </div>
</template>

<script>
import { Swiper, Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import WordGuess from '@/components/lessons/WordGuess'

export default {
  name: 'LessonPage',
  components: { WordGuess },

  async asyncData({ $axios, route }) {
    try {
      const { data } = await $axios.get(
        `https://tsota.herokuapp.com/lessons?order_num=${route.params.id}`
      )

      const lessonData = data[0]
      console.log('lesson data', data)
      console.log(lessonData)

      return {
        words: lessonData.words,
        letters: lessonData.letters,
        images: lessonData.slides
      }
    } catch (e) {
      console.log(e)
    }
  },
  data: () => ({
    letters: [],
    words: [],
    images: [],
    swiper: null
  }),

  mounted() {
    console.log(this.images)
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
</style>
