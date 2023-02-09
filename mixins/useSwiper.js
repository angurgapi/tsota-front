import { Swiper, Navigation, Pagination, Autoplay } from 'swiper'
export default {
  methods: {
    useSwiper() {
      if (this.matchMedia('width < 800')) {
        this.initSwiper()
      }
      window.addEventListener('resize', this.onResize)
    },
    initSwiper(container = 'swiper-container') {
      Swiper.use([Pagination, Navigation, Autoplay])
      this.swiper = new Swiper(`.${container}`, {
        direction: 'horizontal',
        effect: 'flip',
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
    },
    onResize() {
      if (this.matchMedia('width < 800')) {
        this.initSwiper()
      } else {
        this.swiper = null
      }
    }
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  }
}
