import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '../layouts/error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_5055428a from 'nuxt_plugin_plugin_5055428a' // Source: ./components/plugin.js (mode: 'all')
import nuxt_plugin_plugin_51dc2bf2 from 'nuxt_plugin_plugin_51dc2bf2' // Source: ./composition-api/plugin.mjs (mode: 'all')
import nuxt_plugin_cookieuniversalnuxt_a3086770 from 'nuxt_plugin_cookieuniversalnuxt_a3086770' // Source: ./cookie-universal-nuxt.js (mode: 'all')
import nuxt_plugin_axios_63af6ca0 from 'nuxt_plugin_axios_63af6ca0' // Source: ./axios.js (mode: 'all')
import nuxt_plugin_pluginutils_2a89d59b from 'nuxt_plugin_pluginutils_2a89d59b' // Source: ./nuxt-i18n/plugin.utils.js (mode: 'all')
import nuxt_plugin_pluginrouting_656b6826 from 'nuxt_plugin_pluginrouting_656b6826' // Source: ./nuxt-i18n/plugin.routing.js (mode: 'all')
import nuxt_plugin_pluginmain_0834e509 from 'nuxt_plugin_pluginmain_0834e509' // Source: ./nuxt-i18n/plugin.main.js (mode: 'all')
import nuxt_plugin_nuxtsvgsprite_df840084 from 'nuxt_plugin_nuxtsvgsprite_df840084' // Source: ./nuxt-svg-sprite.js (mode: 'all')
import nuxt_plugin_moment_20e9b8f8 from 'nuxt_plugin_moment_20e9b8f8' // Source: ./moment.js (mode: 'all')
import nuxt_plugin_globalcomponents_54ec6fe8 from 'nuxt_plugin_globalcomponents_54ec6fe8' // Source: ../plugins/global-components (mode: 'all')
import nuxt_plugin_showtoastmixin_65319118 from 'nuxt_plugin_showtoastmixin_65319118' // Source: ../plugins/show-toast-mixin.js (mode: 'all')
import nuxt_plugin_vueprototypefunctions_12a6ec62 from 'nuxt_plugin_vueprototypefunctions_12a6ec62' // Source: ../plugins/vue-prototype-functions.js (mode: 'all')
import nuxt_plugin_vueclickoutside_f1d34236 from 'nuxt_plugin_vueclickoutside_f1d34236' // Source: ../plugins/vue-click-outside (mode: 'all')
import nuxt_plugin_axios_397e53b5 from 'nuxt_plugin_axios_397e53b5' // Source: ../plugins/axios.js (mode: 'all')
import nuxt_plugin_i18n_66ff12a5 from 'nuxt_plugin_i18n_66ff12a5' // Source: ../plugins/i18n.js (mode: 'all')
import nuxt_plugin_auth_51442890 from 'nuxt_plugin_auth_51442890' // Source: ./auth.js (mode: 'all')
import nuxt_plugin_meta_273b48f8 from 'nuxt_plugin_meta_273b48f8' // Source: ./composition-api/meta.mjs (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root ? this.$root.$options.$nuxt : null
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const store = createStore(ssrContext)
  const router = await createRouter(ssrContext, config, { store })

  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"titleTemplate":"Kodala  | %s","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"name":"google-site-verification","content":"DTupBiYMNTWXChIu78dUiQLeMG7_crHKbxxRKiFKUAo"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Fimg\u002Flogo-min.svg"}],"style":[],"script":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    beforeSerializeFns: ssrContext ? ssrContext.beforeSerializeFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_5055428a === 'function') {
    await nuxt_plugin_plugin_5055428a(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_51dc2bf2 === 'function') {
    await nuxt_plugin_plugin_51dc2bf2(app.context, inject)
  }

  if (typeof nuxt_plugin_cookieuniversalnuxt_a3086770 === 'function') {
    await nuxt_plugin_cookieuniversalnuxt_a3086770(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_63af6ca0 === 'function') {
    await nuxt_plugin_axios_63af6ca0(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginutils_2a89d59b === 'function') {
    await nuxt_plugin_pluginutils_2a89d59b(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginrouting_656b6826 === 'function') {
    await nuxt_plugin_pluginrouting_656b6826(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginmain_0834e509 === 'function') {
    await nuxt_plugin_pluginmain_0834e509(app.context, inject)
  }

  if (typeof nuxt_plugin_nuxtsvgsprite_df840084 === 'function') {
    await nuxt_plugin_nuxtsvgsprite_df840084(app.context, inject)
  }

  if (typeof nuxt_plugin_moment_20e9b8f8 === 'function') {
    await nuxt_plugin_moment_20e9b8f8(app.context, inject)
  }

  if (typeof nuxt_plugin_globalcomponents_54ec6fe8 === 'function') {
    await nuxt_plugin_globalcomponents_54ec6fe8(app.context, inject)
  }

  if (typeof nuxt_plugin_showtoastmixin_65319118 === 'function') {
    await nuxt_plugin_showtoastmixin_65319118(app.context, inject)
  }

  if (typeof nuxt_plugin_vueprototypefunctions_12a6ec62 === 'function') {
    await nuxt_plugin_vueprototypefunctions_12a6ec62(app.context, inject)
  }

  if (typeof nuxt_plugin_vueclickoutside_f1d34236 === 'function') {
    await nuxt_plugin_vueclickoutside_f1d34236(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_397e53b5 === 'function') {
    await nuxt_plugin_axios_397e53b5(app.context, inject)
  }

  if (typeof nuxt_plugin_i18n_66ff12a5 === 'function') {
    await nuxt_plugin_i18n_66ff12a5(app.context, inject)
  }

  if (typeof nuxt_plugin_auth_51442890 === 'function') {
    await nuxt_plugin_auth_51442890(app.context, inject)
  }

  if (typeof nuxt_plugin_meta_273b48f8 === 'function') {
    await nuxt_plugin_meta_273b48f8(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    // Ignore 404s rather than blindly replacing URL in browser
    if (process.client) {
      const { route } = router.resolve(app.context.route.fullPath)
      if (!route.matched.length) {
        return resolve()
      }
    }
    router.replace(app.context.route.fullPath, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
