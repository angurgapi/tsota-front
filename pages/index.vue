<template>
  <div class="intro-page f-column">
    <template v-if="isLoading">
      <div>
        <img class="loader" src="img/khinkali.png" />
      </div>
    </template>
    <template v-else>
      <div class="banner f-column">
        <div class="banner__title f-column">
          <div class="banner__overlay" />
          <h2>გამარჯობა!</h2>
        </div>
      </div>
      <div class="intro-page__about">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div v-for="card in cards" :key="card.id" class="swiper-slide">
              <IntroCard :card="card" />
            </div>

            <div class="swiper-slide">
              <IntroCard :card="linksCard">
                <template #content>
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
                </template>
              </IntroCard>
            </div>
          </div>

          <div class="swiper-pagination" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { Swiper, Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import IntroCard from '@/components/elements/IntroCard'

export default {
  name: 'IndexPage',
  components: { IntroCard },
  data: () => ({
    isLoading: false,
    links: [],
    swiper: null,
    cards: [
      {
        id: 1,
        title: 'Что это?',
        text: '<span class="highlighted">Aguri (აგური)</span> переводится с грузинского языка как "кирпич". Имея достаточно кирпичей, можно построить все, что угодно. Если ваших друзей не впечатлит, как вы быстро и ловко прочитаете слово "Киндзмараули" на ценнике, тогда здесь уже ничего не поможет...',
        icon: 'block-brick'
      },
      {
        id: 2,
        title: 'Как это?',
        text: 'В каждом уроке вы найдете краткое описание нескольких букв. Ниже          расположен блок для практики: слово слева написано на грузинском, а справа поле ввода, в которое нужно вписать транслитерацию этого слова. <b        >Подсказки для иностранных слов дают только общее представление, но не всегда являются русским переводом.</b>',
        icon: 'book-open-cover'
      }
    ],
    linksCard: {
      title: 'Поехали!',
      icon: 'rocket-launch'
    }
  }),
  async fetch() {
    await this.getLessons()
  },

  head: {
    title: 'Aguri - учите грузинский алфавит быстро'
    // script: [{ src: '/js/sortable.min.js', defer: true }]
  },

  methods: {
    async getLessons() {
      this.isLoading = true
      try {
        const { data } = await this.$axios.get(
          'https://tsota.herokuapp.com/lessons'
        )

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
    },
    initSwiper() {
      Swiper.use([Pagination, Navigation, Autoplay])
      this.swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        modules: [Navigation, Pagination, Autoplay],
        slidesPerView: '1',

        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        draggable: true,
        spaceBetween: 20,
        autoplay: {
          delay: 4000
        }
      })
    }
  },

  mounted() {
    this.initSwiper()
  }
}
</script>

<style lang="scss" scoped>
.intro-page {
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  font-family: 'PF';
  font-size: 26px;

  &__about {
    margin-top: 40px;
    padding: 0 20px;
    width: 100%;
    height: 100%;

    h2 {
      letter-spacing: 0.6px;
      text-align: center;
      text-transform: uppercase;
    }

    @media (max-width: 800px) {
      margin-top: 20px;
    }
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
    align-items: center;
    margin-top: 10px;
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

.banner {
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  color: rgb(217, 122, 67);
  background-image: url('/img/bg1.png');
  background-position: center top;
  background-size: cover;
  background-color: rgba(75, 131, 166, 60%);

  &__overlay {
    position: absolute;
    top: 0;
    z-index: 100;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    background-color: rgba(234, 237, 240, 30%);
    opacity: 0.7;
    backdrop-filter: blur(16px);
  }

  &__title {
    position: relative;
    z-index: 110;
    align-items: center;
    border-radius: 10px;
    padding: 10px 20px;
    width: fit-content;
  }

  h2 {
    z-index: 110;
    font-family: 'Dejavu';
    font-weight: 700;
    font-size: 50px;
    letter-spacing: 0.5px;
    text-shadow: 0 2px 5px #fff;
    text-transform: uppercase;

    @media (max-width: 800px) {
      font-size: 30px;
    }
  }
}

.swiper-wrapper,
.swiper-container {
  max-width: 600px;
}

.swiper-wrapper {
  width: 100%;
  max-width: 600px;
}

.swiper-slide {
  width: 100%;
  height: auto;
}
</style>
