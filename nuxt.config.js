const currentTime = new Date().getTime();

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: "static",
  ssr: true,

  head: {
    titleTemplate: "Kodala  | %s",
    // htmlAttrs: {
    //   lang: 'en'
    // },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },

      {
        name: "google-site-verification",
        content: "DTupBiYMNTWXChIu78dUiQLeMG7_crHKbxxRKiFKUAo",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/img/logo-min.svg" }],
  },
  script: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/Swiper/5.3.7/js/swiper.min.js",
      defer: true,
    },
  ],
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/scss/main.scss", "@/assets/scss/modules/app.scss"],
  static: {
    prefix: false,
  },
  router: {
    base: "/",
  },
  axios: {
    proxy: false,
    credentials: false,
    prefix: process.env.API_URL,
    // proxyHeaders: false,
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/global-components",
    "@/plugins/show-toast-mixin.js",
    "@/plugins/vue-prototype-functions.js",
    "@/plugins/vue-click-outside",
    "@/plugins/axios.js",
    "@/plugins/i18n.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/moment", "@nuxtjs/composition-api/module"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/svg-sprite",
    "nuxt-i18n",
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    ["cookie-universal-nuxt", { alias: "cookiz" }],
  ],
  svgSprite: {
    input: "~/assets/icons/",
  },
  moment: {
    defaultLocale: "ru",
    locales: ["ru"],
  },
  i18n: {
    strategy: "no_prefix",
    locales: [
      {
        code: "en",
        name: "English",
        file: "en.js",
      },
      {
        code: "ru",
        name: "Русский",
        file: "ru.js",
      },
    ],
    defaultLocale: "en",
    lazy: true,
    langDir: "locales/",
    vuex: {
      moduleName: "i18n",
      syncLocale: true,
      syncMessages: false,
      syncRouteParams: false,
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      alwaysRedirect: true,
      fallbackLocale: "en",
    },
    seo: false,
    baseUrl: "/",
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
        isDev ? `[name].${currentTime}.js` : `[contenthash].${currentTime}.js`,
    },
    extend(config, { isDev, isClient }) {
      config.resolve.alias["vue"] = "vue/dist/vue.common";
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
          options: {
            fix: true,
          },
        });
      }
    },
  },

  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
  },

  auth: {
    redirect: {
      callback: false,
      logout: "/",
      home: false,
    },
    // rewriteRedirects: true,
    cookie: {
      prefix: "c.",
      options: {
        path: "/",
        expires: 30,
        sameSite: "lax",
      },
    },

    strategies: {
      local: {
        endpoints: {
          login: {
            url: `${process.env.API_URL}/auth/login`,
            method: "post",
            propertyName: "token",
          },
          user: {
            url: `${process.env.API_URL}/auth/profile`,
            method: "get",
            propertyName: "user",
          },
          logout: false,
        },
        autoFetchUser: true,
      },
    },
  },
};
