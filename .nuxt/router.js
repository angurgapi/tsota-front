import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _505552fc = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _7dae7e90 = () => interopDefault(import('../pages/lessons/_id.vue' /* webpackChunkName: "pages/lessons/_id" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/ru",
    component: _505552fc,
    name: "index___ru"
  }, {
    path: "/ru/lessons/:id?",
    component: _7dae7e90,
    name: "lessons-id___ru"
  }, {
    path: "/lessons/:id?",
    component: _7dae7e90,
    name: "lessons-id___en"
  }, {
    path: "/",
    component: _505552fc,
    name: "index___en"
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
