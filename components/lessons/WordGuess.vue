<template>
  <div class="word-guess">
    <span>{{ wordData.attributes.value }}</span>
    <input
      v-model="word"
      maxlength="55"
      type="text"
      class="form__input"
      :class="{ correct: isCorrect }"
      :placeholder="wordData.attributes.hint"
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
      this.isCorrect =
        newVal.toLowerCase() ===
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
  grid-template-columns: 1fr 2fr;
  margin-bottom: 18px;
}

.correct {
  border: 1px solid green;
  background: #61ff69;
}
</style>
