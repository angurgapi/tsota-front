export const Contacts = () => import('../../components/Contacts.vue' /* webpackChunkName: "components/contacts" */).then(c => wrapFunctional(c.default || c))
export const FooterBlock = () => import('../../components/FooterBlock.vue' /* webpackChunkName: "components/footer-block" */).then(c => wrapFunctional(c.default || c))
export const NavBar = () => import('../../components/NavBar.vue' /* webpackChunkName: "components/nav-bar" */).then(c => wrapFunctional(c.default || c))
export const NavDropdown = () => import('../../components/NavDropdown.vue' /* webpackChunkName: "components/nav-dropdown" */).then(c => wrapFunctional(c.default || c))
export const SvgIcon = () => import('../../components/SvgIcon.vue' /* webpackChunkName: "components/svg-icon" */).then(c => wrapFunctional(c.default || c))
export const ElementsAccordion = () => import('../../components/elements/Accordion.vue' /* webpackChunkName: "components/elements-accordion" */).then(c => wrapFunctional(c.default || c))
export const ElementsAlphabet = () => import('../../components/elements/Alphabet.vue' /* webpackChunkName: "components/elements-alphabet" */).then(c => wrapFunctional(c.default || c))
export const ElementsAuthModal = () => import('../../components/elements/AuthModal.vue' /* webpackChunkName: "components/elements-auth-modal" */).then(c => wrapFunctional(c.default || c))
export const ElementsIntroCard = () => import('../../components/elements/IntroCard.vue' /* webpackChunkName: "components/elements-intro-card" */).then(c => wrapFunctional(c.default || c))
export const ElementsLocaleSwitcher = () => import('../../components/elements/LocaleSwitcher.vue' /* webpackChunkName: "components/elements-locale-switcher" */).then(c => wrapFunctional(c.default || c))
export const ElementsOverlayModal = () => import('../../components/elements/OverlayModal.vue' /* webpackChunkName: "components/elements-overlay-modal" */).then(c => wrapFunctional(c.default || c))
export const ElementsPaginationBtns = () => import('../../components/elements/PaginationBtns.vue' /* webpackChunkName: "components/elements-pagination-btns" */).then(c => wrapFunctional(c.default || c))
export const ElementsPolaroid = () => import('../../components/elements/Polaroid.vue' /* webpackChunkName: "components/elements-polaroid" */).then(c => wrapFunctional(c.default || c))
export const ElementsSvgImage = () => import('../../components/elements/SvgImage.vue' /* webpackChunkName: "components/elements-svg-image" */).then(c => wrapFunctional(c.default || c))
export const ElementsTooltip = () => import('../../components/elements/Tooltip.vue' /* webpackChunkName: "components/elements-tooltip" */).then(c => wrapFunctional(c.default || c))
export const Errors = () => import('../../components/errors/404.vue' /* webpackChunkName: "components/errors" */).then(c => wrapFunctional(c.default || c))
export const HelpersVuePrototypeFunctions = () => import('../../components/helpers/vuePrototypeFunctions.js' /* webpackChunkName: "components/helpers-vue-prototype-functions" */).then(c => wrapFunctional(c.default || c))
export const LessonsFirework = () => import('../../components/lessons/Firework.vue' /* webpackChunkName: "components/lessons-firework" */).then(c => wrapFunctional(c.default || c))
export const LessonsWordGuess = () => import('../../components/lessons/WordGuess.vue' /* webpackChunkName: "components/lessons-word-guess" */).then(c => wrapFunctional(c.default || c))
export const ToastsNotificationSlot = () => import('../../components/toasts/NotificationSlot.vue' /* webpackChunkName: "components/toasts-notification-slot" */).then(c => wrapFunctional(c.default || c))
export const ToastsToastForm = () => import('../../components/toasts/ToastForm.vue' /* webpackChunkName: "components/toasts-toast-form" */).then(c => wrapFunctional(c.default || c))
export const ToastsToastMessage = () => import('../../components/toasts/ToastMessage.vue' /* webpackChunkName: "components/toasts-toast-message" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
