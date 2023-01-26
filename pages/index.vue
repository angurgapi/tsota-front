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
        <section class="intro-page__section f-column">
          <h2 class="intro-page__subheader">Что тут полезного?</h2>
          <div class="intro-page__motivation">
            <div
              v-for="(reason, index) in reasons"
              :key="index"
              class="intro-page__card card"
            >
              <p v-html="reason" />
            </div>
          </div>
        </section>

        <section class="intro-page__section f-column">
          <h2 class="intro-page__subheader">Как учиться?</h2>

          <div v-if="matchMedia('width > 800')" class="intro-page__motivation">
            <div v-for="(card, index) in learningCards" :key="index">
              <IntroCard :card="card" />
            </div>
          </div>

          <div v-else class="swiper-container">
            <div class="swiper-wrapper">
              <div
                v-for="card in learningCards"
                :key="card.id"
                class="swiper-slide"
              >
                <IntroCard :card="card" />
              </div>
            </div>

            <div class="swiper-pagination" />
          </div>
        </section>

        <section class="intro-page__section f-column">
          <h2 class="intro-page__subheader">За дело!</h2>
          <div class="intro-page__process">
            <svg-image name="elearning" />
            <div class="card">
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
          </div>
        </section>
      </div>
    </template>
  </div>
</template>

<script>
import { Swiper, Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import IntroCard from '@/components/elements/IntroCard'
import MatchMedia from '@/mixins/MatchMedia'

export default {
  name: 'IndexPage',
  components: { IntroCard },
  mixins: [MatchMedia],
  data: () => ({
    isLoading: false,
    links: [],
    swiper: null,
    isDesktop: true,
    learningCards: [
      {
        id: 1,
        title: 'Помаленечку',
        text: '<span class="highlighted">Aguri (აგური)</span> переводится с грузинского языка как "кирпич". Путь в тысячу ли начинается с первого шага, а мы начнем с алфавита.',
        icon: 'block-brick'
      },
      {
        id: 2,
        title: 'Уроки от простого к сложному',
        text: 'За один урок вы изучите 3-4 буквы. Ниже попрактикуете чтение слов, содержащих только уже знакомые вам буквы. Попутно выучите несколько слов.</b>',
        icon: 'book-open-cover'
      },
      {
        id: 3,
        title: 'Картинки',
        text: 'За один урок вы изучите 3-4 буквы. Ниже попрактикуете чтение слов, содержащих только уже знакомые вам буквы. Попутно выучите несколько слов.</b>',
        icon: 'image'
      }
    ],
    reasons: [
      'Вы до глубины души очарованы грузинской культурой,\
                   хотите ходить в театры и наслаждаться постановками на языке оригинала, разбить садик, выращивать тархун..? <br/> <b>Смягчите себе погружение в язык!</b>',
      'Вы в Грузии, но вас другая цель <s>(управлять электропоездом)</s> - дождаться своей гуманитарной визы в Германию и цифрово кочевать дальше? <br/> <b>Зато наловчитесь быстро выбирать гречу в магазине.</b>',
      'На улице <span class="rare">некомфортно</span> - это вас сейчас прокляли, или пожелали хорошего вечера? <br/> <b>Пора пополнять словарный запас.</b>'
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
        const { data } = await this.$axios.get('/lesson')
        this.links = data
      } catch (e) {
        console.log(e)
      }
      this.isLoading = false
    },
    getLessonLetters(lesson) {
      let lessonLetters = lesson.letters.map((letter) => {
        return letter.value
      })

      return lessonLetters
    },
    initSwiper() {
      let windowWidth = window.innerWidth
      // console.log(windowWidth)
      // console.log(document.querySelectorAll('.swiper-slide'))
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
    if (this.matchMedia('width < 800')) {
      this.initSwiper()
    }
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
    max-width: 1000px;
    color: #0a183d;
    height: 100%;

    @media (max-width: 800px) {
      margin-top: 20px;
    }
  }

  &__section {
    margin-top: 30px;
    font-size: 15px;
    line-height: 18px;
    padding-bottom: 20px;
    align-items: center;
    .card {
      width: 100%;
      transition: 0.2s all ease-in-out;
      &:hover {
        transform: scale(1.05);
      }
    }
    &:nth-child(2) {
      .card {
        text-align: justify;
      }
    }
  }

  &__motivation {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 300px));
    justify-content: center;
    grid-gap: 20px;
  }
  &__subheader {
    margin-bottom: 32px;
    letter-spacing: 0.6px;
    text-align: center;
    text-transform: uppercase;
    color: #0a183d;
  }
  &__subtitle {
    font-family: 'PF';
    font-size: 14px;
    color: #024013;
  }

  &__process {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 35px;
    img {
      width: 100%;
      height: auto;
    }
    @media (max-width: 800px) {
      grid-template-columns: 1fr;
    }
  }

  &__description {
    opacity: 0.6;
  }

  &__links {
    display: flex;
    flex-direction: column;
    align-items: center;
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
.swiper-container {
  max-width: 100%;
}
.swiper-wrapper {
  padding-bottom: 30px;
  width: 100%;
  max-width: 100%;
}

.swiper-slide {
  width: 100%;
  height: auto;
}

.swiper-pagination {
  height: 25px;
  margin: auto;
  // bottom: -10px;
}
</style>
