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
    title: 'Aguri',
    // htmlAttrs: {
    //   lang: 'en'
    // },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Aguri - платформа, где можно быстро выучить грузинский алфавит'
      },

      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Aguri - платформа, где можно быстро выучить грузинский алфавит'
      },
      {
        name: 'google-site-verification',
        content: 'DTupBiYMNTWXChIu78dUiQLeMG7_crHKbxxRKiFKUAo'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/img/aguri-small.svg' }]
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
    proxy: false,
    credentials: false,
    prefix: process.env.API_URL
    // proxyHeaders: false,
  },


  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/global-components',
    '@/plugins/show-toast-mixin.js',
    '@/plugins/vue-prototype-functions.js',
    '@/plugins/vue-click-outside',
    '@/plugins/axios.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/moment'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/svg-sprite', '@nuxtjs/axios', '@nuxtjs/auth-next',  ['cookie-universal-nuxt', { alias: 'cookiz' }]],
  svgSprite: {
    input: '~/assets/icons/'
  },
  moment: {
    defaultLocale: 'ru',
    locales: ['ru']
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /*
     ** Run ESLint on save
     */

    // postcss: null,
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
  },

  publicRuntimeConfig: {
    apiUrl: process.env.API_URL
  },

  auth: {
    redirect: {
      callback: false,
      logout: '/',
      home: false
    },
    // rewriteRedirects: true,
    cookie: {
      prefix: 'c.',
      options: {
        path: '/',
        expires: 30,
        sameSite: 'lax'
      }
    },

    strategies: {
      local: {
        endpoints: {
          login: { url: `${process.env.API_URL}/auth/login`, method: 'post', propertyName: 'token' },
          user: { url: `${process.env.API_URL}/auth/profile`, method: 'get', propertyName: 'user' },
          logout: false
        },
        autoFetchUser: true
      }
    }
  }
}
