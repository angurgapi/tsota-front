<template>
  <div class="page page--fullwidth lesson">
    <template v-if="isLoading">
      <div>
        <img class="loader" src="img/khinkali.png" />
      </div>
    </template>
    <template v-else>
      <div class="lesson__data card">
        <h2 class="lesson__title">
          Урок {{ $route.params.id
          }}<span v-if="hasCompletedRecord" class="lesson__complete"
            >Пройден</span
          >
        </h2>
        <div class="lesson__info">
          <div class="lesson__letters">
            <div v-for="letter in letters" :key="letter.id" class="letter">
              <span class="letter__value"
                >{{ letter.value }} ({{ letter.transliteration }})</span
              >
              <div class="letter__details f-row">
                {{ letter.description }}
                <Tooltip v-if="letter.alternative_img">
                  <svg-icon height="20" width="20" name="circle-question" />
                  <template #content>
                    <span>Варианты написания:</span>
                    <img :src="letter.alternative_img" />
                  </template>
                </Tooltip>
              </div>
            </div>
            <span v-if="description" class="lesson__description"
              ><i>{{ description }}</i></span
            >
          </div>

          <div v-if="images.length" class="lesson__images swiper-container">
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

    <Firework v-if="showFireworks" @close="showFireworks = false" />
  </div>
</template>

<script>
import { Swiper, Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import WordGuess from '@/components/lessons/WordGuess'
import Firework from '@/components/lessons/Firework'
import PaginationBtns from '@/components/elements/PaginationBtns'
import { mapState } from 'vuex'

export default {
  name: 'LessonPage',
  components: { WordGuess, PaginationBtns, Firework },

  // async asyncData({ $axios, params, error, isLoading }) {
  //   try {
  //     const { data } = await $axios.get(`/lesson/?order_num=${params.id}`)
  //     return {
  //       description: data[0].description || null,
  //       letters: data[0].letters || [],
  //       words: data[0].words || [],
  //       images: data[0].words
  //         .filter((word) => {
  //           return word.image_url
  //         })
  //         .map((word) => {
  //           return {
  //             label: word.value,
  //             url: word.image_url,
  //             royalty: word.img_royalty
  //           }
  //         })
  //     }
  //   } catch (e) {
  //     console.error(e)
  //     error({ statusCode: 404 })
  //   }
  // },

  data: () => ({
    isLoading: false,
    swiper: null,
    pagesTotal: 0,
    isSoundOn: true,
    lessonNailedWords: 0,
    isLessonComplete: false,
    showFireworks: false,
    //no asyncdata initialized vars
    description: '',
    letters: [],
    words: [],
    images: []
  }),

  async fetch() {
    // await this.getTotalPages()
    await this.getLessonData()
    this.getTotalPages()
    this.initSwiper()
  },
  computed: {
    ...mapState('authorization', ['user']),
    ...mapState('links', ['links']),

    hasCompletedRecord() {
      return (
        this.$auth.loggedIn &&
        this.user &&
        this.user.completedLessons.includes(+this.$route.params.id)
      )
    }
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
    // async getTotalPages() {
    //   this.isLoading = true
    //   try {
    //     const { data } = await this.$axios.get('/lesson')
    //     this.pagesTotal = data.length
    //   } catch (e) {
    //     console.log(e)
    //   }
    //   this.isLoading = false
    // },
    async getLessonData() {
      this.isLoading = true
      try {
        const { data } = await this.$axios.get(
          `/lesson/?order_num=${this.$route.params.id}`
        )
        this.description = data[0].description || null
        this.letters = data[0].letters || []
        this.words = data[0].words || []
        this.images = data[0].words
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
      } catch (e) {
        console.log(e)
      }

      this.isLoading = false
    },
    getTotalPages() {
      this.pagesTotal = this.links.length
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
      inputs.forEach((input) => input.blur())
      this.showFireworks = true
      setTimeout(() => (this.showFireworks = false), 4000)
      if (this.isSoundOn) {
        let audio = new Audio('sounds/trumpet.mp3')
        audio.volume = 0.7
        audio.play()
      }
      if (this.user) {
        this.addCompletedLesson()
      }
    },
    async addCompletedLesson() {
      try {
        const user = await this.$axios.patch(`/user/${this.user.id}`, {
          lessonNum: +this.$route.params.id
        })
        console.log(user)
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted() {
    this.initSwiper()
    console.log(this.links)
  },
  beforeDestroy() {
    this.swiper = null
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

.swiper-wrapper {
  width: 100%;
  max-width: 300px;
}

.lesson {
  .tooltip {
    font-family: 'PF';
    img {
      max-width: 60px;
    }
  }
}

// .swiper-pagination-bullets {
//   bottom: -5px;
// }
</style>
