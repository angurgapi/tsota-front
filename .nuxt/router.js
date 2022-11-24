import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6c0eeb9a = () => interopDefault(import('../node_modules/@nuxtjs/svg-sprite/lib/pages/icons-list.vue' /* webpackChunkName: "" */))
const _081bdbb0 = () => interopDefault(import('../pages/lessons/index.vue' /* webpackChunkName: "pages/lessons/index" */))
const _a7994018 = () => interopDefault(import('../pages/numbers.vue' /* webpackChunkName: "pages/numbers" */))
const _0a73de2e = () => interopDefault(import('../pages/shopping.vue' /* webpackChunkName: "pages/shopping" */))
const _92defd5a = () => interopDefault(import('../pages/words.vue' /* webpackChunkName: "pages/words" */))
const _7dae7e90 = () => interopDefault(import('../pages/lessons/_id.vue' /* webpackChunkName: "pages/lessons/_id" */))
const _505552fc = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/_icons",
    component: _6c0eeb9a,
    name: "icons-list"
  }, {
    path: "/lessons",
    component: _081bdbb0,
    name: "lessons"
  }, {
    path: "/numbers",
    component: _a7994018,
    name: "numbers"
  }, {
    path: "/shopping",
    component: _0a73de2e,
    name: "shopping"
  }, {
    path: "/words",
    component: _92defd5a,
    name: "words"
  }, {
    path: "/lessons/:id",
    component: _7dae7e90,
    name: "lessons-id"
  }, {
    path: "/",
    component: _505552fc,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
