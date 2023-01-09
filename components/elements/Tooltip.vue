<template>
  <div class="tooltip-trigger">
    <slot />
    <div
      class="tooltip"
      :class="{
        'tooltip--bottom': bottom,
        'tooltip--tipless': tipless,
        'tooltip--left': left
      }"
    >
      <span v-if="text" class="content">{{ text }}</span>
      <slot v-else name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    text: {
      type: String
    },
    tipless: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Boolean,
      default: false
    },
    left: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getTooltipOffset() {
      const content = document.querySelector('.tooltip')
      let tooltipWidth = content.getBoundingClientRect().width
      let windowWidth = window.innerWidth
      let offsetLeft = content.getBoundingClientRect().left

      if (offsetLeft < 0) {
        content.style.transform = `translateX(${-offsetLeft}px)`
        // content.style.left = '5px'
      }

      if (offsetLeft + tooltipWidth > windowWidth) {
        content.style.transform = `translateX(-${
          offsetLeft + tooltipWidth - windowWidth
        }px)`
        // content.style.left = 'none'
        // content.style.right = '5px'
      }
    }
  },
  mounted() {
    this.getTooltipOffset()
    window.addEventListener('resize', this.getTooltipOffset)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getTooltipOffset)
  }
}
</script>

<style lang="scss" scoped>
.tooltip-trigger {
  position: relative;
  display: inline-block;
  padding-left: 8px;
}

.tooltip-trigger:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

.tooltip {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 50%;
  bottom: 100%;
  z-index: 1010;
  visibility: hidden;
  margin-left: -125px;
  border-radius: 10px;
  padding: 10px;
  width: fit-content;
  max-width: 250px;
  height: fit-content;
  box-shadow: 0 8px 24px rgba(233, 233, 233, 84%),
    0 -8px 24px rgba(233, 233, 233, 84%);
  white-space: normal;
  text-align: center;
  color: #000;
  background-color: #fff;

  // opacity: 0;
  transition: opacity 1s;
  @media (max-width: 290px) {
    font-size: 10px;
    max-width: 100vw;
    flex-shrink: 1;
    img {
      width: 50px;
    }
  }

  .content {
    z-index: 1010;
    margin: 0 auto;
  }

  &--bottom {
    top: 100%;
  }

  &--left {
    left: 0;
    right: 20px;
  }

  &--tipless {
    .content::after {
      display: none !important;
    }
  }
}

.content::after {
  content: ' ';
  position: absolute;
  left: 50%;
  top: 100%;
  margin-left: -5px;
  border-style: solid;
  border-width: 5px;
  border-color: #fff transparent transparent;
}
</style>
