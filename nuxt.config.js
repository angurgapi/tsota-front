const currentTime = new Date().getTime()
// let script = [
//   {
//     src: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/5.3.7/js/swiper.min.js',
//     defer: true
//   }
// ]

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'static',
  ssr: true,

  head: {
    title: 'brick',
    // htmlAttrs: {
    //   lang: 'en'
    // },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/img/brick-icon.png' }]
  },
  script: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/5.3.7/js/swiper.min.js',
      defer: true
    }
  ],
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/main.scss', '@/assets/scss/modules/app.scss'],
  static: {
    prefix: false
  },
  router: {
    base: '/'
  },
  axios: {
    // proxy: true,
    credentials: false
    // proxyHeaders: false,
  },
  // proxy: {
  //   host: "localhost",
  //   port: 3000,
  // },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/global-components',
    '@/plugins/show-toast-mixin.js',
    '@/plugins/vue-prototype-functions.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/moment'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/svg-sprite', '@nuxtjs/axios', 'nuxt-i18n'],
  svgSprite: {
    input: '~/assets/icons/'
  },
  moment: {
    defaultLocale: 'ru',
    locales: ['ru']
  },
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'en',
        file: 'en.js'
      },
      {
        code: 'ru',
        name: 'ru',
        file: 'ru.js'
      }
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'en',
    loadLanguagesAsync: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /*
     ** Run ESLint on save
     */

    postcss: null,
    filenames: {
      chunk: ({ isDev }) =>
        isDev ? `[name].${currentTime}.js` : `[contenthash].${currentTime}.js`,
      app: ({ isDev }) =>
        isDev ? `[name].${currentTime}.js` : `[contenthash].${currentTime}.js`
    },
    extend(config, { isDev, isClient }) {
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  }
}
