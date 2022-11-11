export const Contacts = () => import('../../components/Contacts.vue' /* webpackChunkName: "components/contacts" */).then(c => wrapFunctional(c.default || c))
export const FooterBlock = () => import('../../components/FooterBlock.vue' /* webpackChunkName: "components/footer-block" */).then(c => wrapFunctional(c.default || c))
export const NavBar = () => import('../../components/NavBar.vue' /* webpackChunkName: "components/nav-bar" */).then(c => wrapFunctional(c.default || c))
export const NavDropdown = () => import('../../components/NavDropdown.vue' /* webpackChunkName: "components/nav-dropdown" */).then(c => wrapFunctional(c.default || c))
export const ProjectTemplate = () => import('../../components/ProjectTemplate.vue' /* webpackChunkName: "components/project-template" */).then(c => wrapFunctional(c.default || c))
export const Puzzle = () => import('../../components/Puzzle.vue' /* webpackChunkName: "components/puzzle" */).then(c => wrapFunctional(c.default || c))
export const PuzzleTile = () => import('../../components/PuzzleTile.vue' /* webpackChunkName: "components/puzzle-tile" */).then(c => wrapFunctional(c.default || c))
export const SvgIcon = () => import('../../components/SvgIcon.vue' /* webpackChunkName: "components/svg-icon" */).then(c => wrapFunctional(c.default || c))
export const DropzoneFile = () => import('../../components/dropzone/DropzoneFile.vue' /* webpackChunkName: "components/dropzone-file" */).then(c => wrapFunctional(c.default || c))
export const DropzoneWidget = () => import('../../components/dropzone/DropzoneWidget.vue' /* webpackChunkName: "components/dropzone-widget" */).then(c => wrapFunctional(c.default || c))
export const ElementsAccordion = () => import('../../components/elements/Accordion.vue' /* webpackChunkName: "components/elements-accordion" */).then(c => wrapFunctional(c.default || c))
export const ElementsSvgImage = () => import('../../components/elements/SvgImage.vue' /* webpackChunkName: "components/elements-svg-image" */).then(c => wrapFunctional(c.default || c))
export const ElementsTooltip = () => import('../../components/elements/Tooltip.vue' /* webpackChunkName: "components/elements-tooltip" */).then(c => wrapFunctional(c.default || c))
export const HelpersVuePrototypeFunctions = () => import('../../components/helpers/vuePrototypeFunctions.js' /* webpackChunkName: "components/helpers-vue-prototype-functions" */).then(c => wrapFunctional(c.default || c))
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
