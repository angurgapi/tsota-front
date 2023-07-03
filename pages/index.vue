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
      <h1 class="intro-page__headline">{{ $t('Index.banner') }}</h1>
      <p class="intro-page__sub">{{ $t('Index.bannerSub') }}</p>
      <div class="intro-page__about">
        <section class="intro-page__section f-column">
          <h2 class="intro-page__subheader">
            {{ $t('Index.description.title') }}
          </h2>
          <div class="intro-page__motivation">
            <ReasonCard
              v-for="(reason, index) in reasons"
              :key="index"
              class="intro-page__card card"
              :card="reason"
            />
          </div>
        </section>

        <section class="intro-page__section f-column">
          <h2 class="intro-page__subheader">{{ $t('Index.process.title') }}</h2>

          <div v-if="matchMedia('width > 700')" class="intro-page__stages">
            <div v-for="(card, index) in stages" :key="`stage-${index}`">
              <IntroCard :card="card" />
            </div>
          </div>

          <div v-else class="swiper-container">
            <div class="swiper-wrapper">
              <div
                v-for="(card, index) in stages"
                :key="`stage-${index}`"
                class="swiper-slide"
              >
                <IntroCard :card="card" />
              </div>
            </div>

            <div class="swiper-pagination" />
          </div>
        </section>

        <section class="intro-page__section f-column">
          <h2 class="intro-page__subheader">{{ $t('Index.work') }}</h2>
          <div class="intro-page__process">
            <svg-image name="elearning" />

            <ul class="intro-page__links">
              <li v-for="link in links" :key="link.order_num">
                <nuxt-link
                  class="lesson-link f-row"
                  :to="`/lessons/${link.order_num}`"
                  ><span class="lesson-link__title">
                    {{ $t('Navbar.lesson') }} {{ link.order_num }}:</span
                  >
                  <p class="lesson-link__description">
                    <!-- буквы -->
                    <span
                      v-for="(letter, index) in getLessonLetters(link)"
                      :key="index"
                      class="lesson-link__letter"
                      >{{ letter }}</span
                    >
                  </p>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </template>
  </div>
</template>

<script>
import IntroCard from '@/components/elements/IntroCard'
import ReasonCard from '@/components/elements/ReasonCard'
import MatchMedia from '@/mixins/MatchMedia'
import useSwiper from '@/mixins/useSwiper'
import { mapState } from 'vuex'

export default {
  name: 'IndexPage',
  components: { IntroCard, ReasonCard },
  mixins: [MatchMedia, useSwiper],
  data() {
    return {
      isLoading: false,
      swiper: null,
      isDesktop: true,
      linksCard: {
        title: 'Поехали!',
        icon: 'rocket-launch'
      }
    }
  },
  head() {
    return {
      title: this.$t('Main')
    }
  },

  computed: {
    ...mapState('links', ['links']),
    reasons() {
      return [
        {
          text: this.$t('Index.description.blocks[0]'),
          image: 'img/landscape.png'
        },
        {
          text: this.$t('Index.description.blocks[1]'),
          image: 'img/waiting.png'
        },
        {
          text: this.$t('Index.description.blocks[2]'),
          image: 'img/street.png'
        }
      ]
    },
    stages() {
      return [
        {
          title: this.$t('Index.process.blocks[0].title'),
          text: this.$t('Index.process.blocks[0].text'),
          icon: 'block-brick'
        },
        {
          title: this.$t('Index.process.blocks[1].title'),
          text: this.$t('Index.process.blocks[0].text'),
          icon: 'book-open-cover'
        },
        {
          title: this.$t('Index.process.blocks[2].title'),
          text: this.$t('Index.process.blocks[2].text'),
          icon: 'image'
        }
      ]
    }
  },

  methods: {
    getLessonLetters(lesson) {
      let lessonLetters = lesson.letters.map((letter) => {
        return letter.value
      })

      return lessonLetters
    }
  },

  mounted() {
    this.useSwiper()
  }
}
</script>
