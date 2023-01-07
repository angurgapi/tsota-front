<template>
  <div class="overlay" @click="$emit('close')">
    <div class="overlay__modal" @click.prevent>
      <button class="btn overlay__close" @click="$emit('close')">
        <svg-icon name="close" height="20" width="20" />
      </button>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OverlayModal',
  mounted() {
    document.body.style.overflow = 'hidden'
  },
  beforeDestroy() {
    document.body.style.overflow = 'auto'
  }
}
</script>

<style lang="scss">
.overlay {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background: rgba(33, 54, 95, 55%);
  backdrop-filter: blur(8px);

  &__modal {
    position: relative;
    overflow-y: scroll;
    margin: auto;
    border-radius: 8px;
    max-height: 90vh;
    background: #fff;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
  }

  &__close {
    position: absolute;
    right: 20px;
    top: 10px;
    border-radius: 50%;
    padding: 0;
    width: 50px;
    height: 50px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 8%);
    background: #fff;

    svg {
      fill: #000;
    }
  }
}
</style>
