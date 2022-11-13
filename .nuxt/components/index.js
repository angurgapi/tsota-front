export { default as Contacts } from '../../components/Contacts.vue'
export { default as FooterBlock } from '../../components/FooterBlock.vue'
export { default as NavBar } from '../../components/NavBar.vue'
export { default as NavDropdown } from '../../components/NavDropdown.vue'
export { default as ProjectTemplate } from '../../components/ProjectTemplate.vue'
export { default as Puzzle } from '../../components/Puzzle.vue'
export { default as PuzzleTile } from '../../components/PuzzleTile.vue'
export { default as SvgIcon } from '../../components/SvgIcon.vue'
export { default as DropzoneFile } from '../../components/dropzone/DropzoneFile.vue'
export { default as DropzoneWidget } from '../../components/dropzone/DropzoneWidget.vue'
export { default as ElementsAccordion } from '../../components/elements/Accordion.vue'
export { default as ElementsPaginationBtns } from '../../components/elements/PaginationBtns.vue'
export { default as ElementsSvgImage } from '../../components/elements/SvgImage.vue'
export { default as ElementsTooltip } from '../../components/elements/Tooltip.vue'
export { default as HelpersVuePrototypeFunctions } from '../../components/helpers/vuePrototypeFunctions.js'
export { default as LessonsWordGuess } from '../../components/lessons/WordGuess.vue'
export { default as ToastsNotificationSlot } from '../../components/toasts/NotificationSlot.vue'
export { default as ToastsToastForm } from '../../components/toasts/ToastForm.vue'
export { default as ToastsToastMessage } from '../../components/toasts/ToastMessage.vue'

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
