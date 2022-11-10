<template>
  <div class="word-guess">
    <span class="word-guess__label">{{ wordData.attributes.value }}</span>
    <input
      maxlength="55"
      type="text"
      class="form__input"
      :class="{ correct: isCorrect }"
      :placeholder="wordData.attributes.hint"
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
    }
  },
  data: () => ({
    word: '',
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
        this.wordData.attributes.transliteration.toLowerCase()
    }
  }
}
</script>

<style lang="scss" scoped>
.word-guess {
  display: grid;
  align-items: center;
  grid-gap: 18px;

  // grid-template-columns: 2fr 3fr;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 18px;
  max-width: 100%;

  &__label {
    width: 100%;
  }
}

.correct {
  border: 1px solid green;
  background: #61ff69;
}
</style>
