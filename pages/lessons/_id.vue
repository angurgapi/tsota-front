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
          {{ $t('Navbar.lesson') }} {{ $route.params.id }}
          <!-- <span v-if="hasCompletedRecord" class="lesson__complete"
            >Пройден</span
          > -->
        </h2>
        <div class="lesson__info">
          <div class="lesson__letters">
            <LetterSlice
              v-for="letter in lesson.letters"
              :key="letter.id"
              :letter="letter"
            />
            <!-- <div v-for="letter in letters" :key="letter.id" class="letter">
              <span class="letter__value"
                >{{ letter.value }} ({{ letter.transliteration }})</span
              >
              <div class="letter__details f-row">
                {{ letter[locale] || letter.description }}
                <Tooltip v-if="letter.alternative_img">
                  <svg-icon height="20" width="20" name="circle-question" />
                  <template #content>
                    <span>Варианты написания:</span>
                    <img :src="letter.alternative_img" />
                  </template>
                </Tooltip>
              </div>
            </div> -->
            <span v-if="getDescription" class="lesson__description"
              ><i>{{ getDescription }}</i></span
            >
          </div>

          <div
            v-if="lesson.images.length"
            class="lesson__images swiper-container"
          >
            <div class="swiper-wrapper">
              <Polaroid
                v-for="image in lesson.images"
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
        <h3 class="lesson__headline">{{ $t('Lesson.exercise') }}</h3>
        <p class="lesson__legend" v-html="$t('Lesson.exerciseHint')" />

        <img class="lesson__tutorial" src="/img/howto.gif" />
        <WordGuess
          v-for="word in lesson.words"
          :key="word.transliteration"
          :wordData="word"
          :sound="isSoundOn"
          @nailed="lessonNailedWords++"
          @failed="lessonNailedWords--"
        />
      </div>
      <PaginationBtns v-if="links" :totalPages="links.length" />
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
import LetterSlice from '@/components/lessons/LetterSlice'
import { mapState } from 'vuex'

export default {
  name: 'LessonPage',
  components: { WordGuess, PaginationBtns, Firework, LetterSlice },

  data: () => ({
    isLoading: true,
    swiper: null,
    isSoundOn: true,
    lessonNailedWords: 0,
    isLessonComplete: false,
    showFireworks: false,
    lesson: {}
  }),

  async fetch() {
    await this.getLessonData()
  },
  computed: {
    ...mapState('authorization', ['user']),
    ...mapState('links', ['links']),

    locale() {
      return this.$i18n.locale
    },

    getDescription() {
      return this.lesson[this.locale] || null
    },

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
    },
    isLoading(newVal) {
      if (!newVal && this.lesson.images.length) {
        this.initSwiper()
      }
    }
  },

  methods: {
    async getLessonData() {
      // this.isLoading = true
      try {
        const { data } = await this.$axios.get(
          `/lesson/?order_num=${this.$route.params.id}`
        )
        this.lesson = data[0]
        this.lesson.images = data[0].words
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
        // console.log(e)
        return this.$nuxt.error(e)
      }

      // this.isLoading = false
    },

    initSwiper() {
      Swiper.use([Navigation, Pagination, Autoplay])
      this.$nextTick(() => {
        this.swiper = new Swiper('.swiper-container', {
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
        })
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
    setTimeout(() => {
      this.isLoading = false
    }, 1000)
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
  @media (max-width: 400px) {
    max-width: 90vw;
  }
}

// .swiper-wrapper {
//   width: 100%;
//   max-width: 300px;
// }
.polaroid {
  max-width: 100%;
  height: auto;
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
