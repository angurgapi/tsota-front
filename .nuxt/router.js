import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _940bd72c = () => interopDefault(import('../pages/lessons/index.vue' /* webpackChunkName: "pages/lessons/index" */))
const _f81a8894 = () => interopDefault(import('../pages/numbers.vue' /* webpackChunkName: "pages/numbers" */))
const _7b3c9b50 = () => interopDefault(import('../pages/profile/index.vue' /* webpackChunkName: "pages/profile/index" */))
const _2a9ffaac = () => interopDefault(import('../pages/shopping.vue' /* webpackChunkName: "pages/shopping" */))
const _7297e595 = () => interopDefault(import('../pages/words.vue' /* webpackChunkName: "pages/words" */))
const _6af62952 = () => interopDefault(import('../pages/lessons/_id.vue' /* webpackChunkName: "pages/lessons/_id" */))
const _0c5cb73e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/lessons",
    component: _940bd72c,
    name: "lessons"
  }, {
    path: "/numbers",
    component: _f81a8894,
    name: "numbers"
  }, {
    path: "/profile",
    component: _7b3c9b50,
    name: "profile"
  }, {
    path: "/shopping",
    component: _2a9ffaac,
    name: "shopping"
  }, {
    path: "/words",
    component: _7297e595,
    name: "words"
  }, {
    path: "/lessons/:id",
    component: _6af62952,
    name: "lessons-id"
  }, {
    path: "/",
    component: _0c5cb73e,
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
