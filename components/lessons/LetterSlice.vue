<template>
  <div class="letter-slice">
    <span class="letter-slice__value"
      >{{ letter.value }} ({{ letter.transliteration }})</span
    >
    <div class="letter-slice__details f-row">
      {{ getDescription }}
      <Tooltip v-if="letter.alternative_img">
        <svg-icon height="20" width="20" name="circle-question" />
        <template #content>
          <span>{{ $t('Lesson.alts') }}:</span>
          <img :src="letter.alternative_img" />
        </template>
      </Tooltip>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, useStore } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    letter: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const getDescription = computed(() => {
      const locale = store.$i18n.locale
      return props.letter[locale]
        ? props.letter[locale]
        : props.letter.description
    })

    return {
      getDescription
    }
  }
})
</script>

<style lang="scss" scoped>
.letter-slice {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 20px;
  font-size: 18px;
  font-family: 'PF';

  &:not(:first-child) {
    margin-top: 18px;
  }

  &__value {
    font-size: 22px;
    margin-right: 20px;
    white-space: nowrap;
  }

  &__details {
    line-height: 1.1;
    opacity: 0.9;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
}
</style>
