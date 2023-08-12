<template>
  <div class="word-guess">
    <span class="word-guess__label">{{ wordData.value }}</span>
    <div class="word-guess__guess">
      <span class="word-guess__hint">{{ getHint }}</span>
      <input
        maxlength="55"
        type="text"
        class="form__input"
        :class="{ correct: isCorrect }"
        @keypress="checkSpelling"
        @input="checkSpelling"
      />
    </div>

    <!-- <span>{{ wordData.attributes.hint }}</span> -->
  </div>
</template>

<script>
export default {
  name: 'WordGuess',
  props: {
    wordData: {
      type: Object,
      required: true
    },
    sound: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    isCorrect: false
  }),

  computed: {
    getHint() {
      const locale = this.$i18n.locale
      const word = this.wordData
      return word[locale] ? word[locale] : word.hint
    }
  },

  watch: {
    word(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.checkSpelling()
      }
    },
    isCorrect(newVal, oldVal) {
      if (newVal < oldVal) {
        this.$emit('failed')
      } else {
        this.$emit('nailed')
      }
    }
  },

  methods: {
    checkSpelling(event) {
      let word = event.target.value
      this.isCorrect =
        word.toLowerCase().trim() ===
        this.wordData.transliteration.toLowerCase()

      if (this.isCorrect && this.sound) {
        this.playSound()
      }
    },
    playSound() {
      let audio = new Audio('sounds/yepp.mp3')
      audio.volume = 0.7
      audio.play()
    }
  }
}
</script>

<style lang="scss" scoped>
.word-guess {
  display: grid;
  align-items: center;
  grid-gap: 18px;

  // grid-template-columns: minmax(100px, 1fr);

  grid-template-columns: 34% 60%;
  margin-bottom: 10px;
  max-width: 100%;

  &__guess {
    position: relative;

    &::v-deep .form__input {
      padding: 11px 11px 5px !important;
      height: 50px !important;
    }
  }

  &__hint {
    position: absolute;
    left: 11px;
    top: 3px;
    z-index: 10;
    font-size: 12px;
    opacity: 0.6;
  }

  &__label {
    width: 100%;
    font-size: 18px;

    @media (max-width: 340px) {
      font-size: 15px;
    }
  }
}

.correct {
  border: 1px solid rgba(17, 237, 75, 90%);
  background: rgba(17, 237, 75, 30%);
}
</style>
