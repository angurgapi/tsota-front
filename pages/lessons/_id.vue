<template>
  <div class="page lesson">
    <h2>Урок {{ $route.params.id }}</h2>
    <div class="lesson__info">
      <div class="lesson__letters">
        <div v-for="letter in letters" :key="letter.id" class="lesson__letter">
          <span
            >{{ letter.attributes.value }} ({{
              letter.attributes.transliteration
            }})</span
          >
          <span>{{ letter.attributes.description }} </span>
        </div>
      </div>
      <div v-if="images" class="lesson__images">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div
              v-for="image in images"
              :key="image.attributes.url"
              class="swiper-slide"
            >
              <img
                class="lesson__img"
                :src="`http://localhost:1337${image.attributes.url}`"
              />
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
    <div class="lesson__words">
      <h4>Тренировка</h4>
      <h5>Вы <span class="highlighted">уже можете</span> это прочесть!</h5>
      <h5>Заполните пропуски напротив слов латинской транслитерацией</h5>
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
        `http://localhost:1337/api/lessons/${route.params.id}?populate=*`
      )

      const lessonData = data.data.attributes
      console.log(lessonData)

      return {
        words: lessonData.words.data,
        letters: lessonData.letters.data,
        images: lessonData.images.data
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
  h4,
  h5 {
    text-align: center;
  }

  h5 {
    margin-bottom: 20px;
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
      max-width: 300px;

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
    width: 100%;
    height: auto;
  }

  &__words {
    margin-top: 30px;
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
