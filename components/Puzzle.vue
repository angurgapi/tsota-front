<template>
  <div
    id="puzzle"
    class="puzzle"
    :class="{ 'puzzle--correct': isCorrectOrder }"
  >
    <PuzzleTile
      v-for="(tile, index) in puzzleTiles"
      :key="index"
      :tile="tile"
      :isCorrectOrder="isCorrectOrder"
    />
  </div>
</template>

<script>
import PuzzleTile from './PuzzleTile'

export default {
  name: 'PuzzleBlock',
  components: { PuzzleTile },
  data: () => ({
    actualOrder: [],
    puzzleTiles: [
      {
        num: 4,
        content: {
          en: 'I code in JavaScript, but am willing to work with TypeScript also.',
          ru: 'Я пишу код на JavaScript, но готова работать и с TypeScript'
        }
      },
      {
        num: 2,
        content: {
          en: 'I enjoy building interfaces for complex web applications, solving debugging mysteries and refactoring my old code.',
          ru: 'Мне нравится создавать интерфейсы для сложных веб-приложений, решать загадки дебага и рефакторить свой код.'
        }
      },
      {
        num: 1,
        content: {
          en: "Hello! My name is Sofia and I'm a frontend developer.",
          ru: 'Привет! Меня зовут Софья и я frontend-разработчик.'
        }
      },

      {
        num: 3,
        content: {
          en: 'My favorite instruments to do so are: Nuxt.js, SCSS, git, Jest, eslint and many more.',
          ru: 'Мои основные инструменты для работы - Nuxt.js, SCSS, git, Jest, eslint и многие другие.'
        }
      }
    ]
  }),
  computed: {
    // getShuffledTiles() {
    //   let shuffled = this.puzzleTiles
    //   if (!this.actualOrder.length) {
    //     return shuffled.sort(() => Math.random() - 0.5)
    //   } else {
    //     return shuffled.sort(
    //       (a, b) => this.actualOrder.indexOf(a) - this.actualOrder.indexOf(b)
    //     )
    //   }
    // },

    isCorrectOrder() {
      if (this.actualOrder.length) {
        for (let i = 0; i < this.actualOrder.length - 1; i++) {
          if (this.actualOrder[i] > this.actualOrder[i + 1]) {
            return false
          }
        }
        return true
      }
    }
  },
  methods: {
    initSortable() {
      const items = document.getElementById('puzzle')
      if (items && typeof Sortable !== 'undefined') {
        const sortable = Sortable.create(items, {
          animation: 150,
          draggable: '.puzzle-tile',
          onEnd: () => {
            this.actualOrder = sortable.toArray()
          }
        })
      }
    }
  },
  mounted() {
    this.initSortable()
  }
}
</script>

<style lang="scss" scoped>
.puzzle {
  display: grid;
  grid-gap: 4em;
  grid-template-columns: repeat(2, 1fr);
  margin: auto;
  width: 100%;
  font-size: 22px;

  &--correct {
    grid-gap: 0;
  }

  @media (max-width: 800px) {
    grid-gap: 2em;
    font-size: 15px;
  }

  @media (max-width: 500px) {
    grid-gap: 2em;
    font-size: 11px;
  }
}
</style>
