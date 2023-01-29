import { Swiper, Navigation, Pagination, Autoplay } from 'swiper'
export default {
  methods: {
    useSwiper() {
      if (this.matchMedia('width < 800')) {
        this.initSwiper()
      } else {
        this.swiper = null
        document.addEventListener('resize', this.useSwiper())
      }
    },
    initSwiper(container = 'swiper-container') {
      //   let windowWidth = window.innerWidth
      Swiper.use([Pagination, Navigation, Autoplay])
      this.swiper = new Swiper(`.${container}`, {
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
  }
}
