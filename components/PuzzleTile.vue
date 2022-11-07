<template>
  <div
    :data-id="tile.num"
    class="puzzle-tile"
    :class="{ 'puzzle-tile--correct': isCorrectOrder }"
  >
    <!-- <div class="puzzle-tile__num">{{ tile.num }}</div> -->
    <span :style="`font-family: ${getFont}`">{{
      tile.content[getLocale]
    }}</span>
    <template v-if="!isCorrectOrder">
      <span
        v-if="tile.num === 3 || tile.num === 4"
        class="circle circle--top"
      />
      <span
        v-if="tile.num === 1 || tile.num === 3"
        class="circle circle--right"
      />
      <span
        v-if="tile.num === 1 || tile.num === 2"
        class="circle circle--bottom"
      />
      <span
        v-if="tile.num === 4 || tile.num === 2"
        class="circle circle--left"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'PuzzleTile',
  props: {
    tile: {
      type: Object,
      required: true
    },
    isCorrectOrder: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getLocale() {
      return this.$i18n.locale
    },
    getLetterSpacing() {
      return this.$i18n.locale === 'en' ? '0.3' : '-1.9'
    },
    getFont() {
      return this.$i18n.locale === 'en' ? 'Yomogi' : 'Rubik'
    }
  }
}
</script>

<style lang="scss">
.puzzle-tile {
  position: relative;
  border-radius: 10px;
  padding: 2.5em;
  width: 100%;
  font-family: 'Yomogi';
  font-size: 22px;
  text-align: left;
  color: #fff;
  background-color: #191c1f;
  aspect-ratio: 1/1;

  &__num {
    position: absolute;
    left: 5px;
    top: 5px;
  }

  span {
    transform: rotate(180deg);
  }

  // transform: rotate(180deg);

  &:nth-child(odd) {
    text-align: right;
  }

  &--correct {
    // span {
    //   transform: rotate(180deg);
    // }
    border-radius: 0;

    &:first-child {
      border-radius: 10px 0 0;
    }

    &:nth-child(2) {
      border-radius: 0 10px 0 0;
    }

    &:nth-child(3) {
      border-radius: 0 0 0 10px;
    }

    &:nth-child(4) {
      border-radius: 0 0 10px;
    }
  }

  @media (max-width: 800px) {
    font-size: 15px;
  }

  @media (max-width: 500px) {
    font-size: 11px;
  }
}

.circle {
  position: absolute;
  z-index: 0;
  border-radius: 50%;
  width: 4em;
  height: 4em;

  &--top {
    left: calc(50% - 2em);
    top: -1.5em;
    clip-path: inset(50% 0 0 0);
    background-color: #191c1f;
  }

  &--right {
    left: calc(100% - 2em);
    top: calc(50% - 2em);
    clip-path: inset(0 50% 0 0);
    background-color: #191c1f;
  }

  &--bottom {
    left: calc(50% - 2em);
    top: calc(100% - 2em);
    clip-path: inset(50% 0 0 0);
    background-color: #fff;
  }

  &--left {
    left: -2em;
    top: calc(50% - 2em);
    clip-path: inset(0 50% 0 0);
    background-color: #fff;
  }
}
</style>
