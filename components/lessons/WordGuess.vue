<template>
  <div class="word-guess">
    <span class="word-guess__label">{{ wordData.value }}</span>
    <input
      maxlength="55"
      type="text"
      class="form__input"
      :class="{ correct: isCorrect }"
      :placeholder="wordData.hint"
      @keypress="checkSpelling"
      @input="checkSpelling"
    />

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

  watch: {
    word(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.checkSpelling()
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
  margin-bottom: 18px;
  max-width: 100%;

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
