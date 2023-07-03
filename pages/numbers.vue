<template>
  <div class="page">
    <h2 class="lesson__title">{{ $t('Navbar.numbers') }}</h2>
    <div class="numbers">
      <div class="card">
        <div class="card__header">1-10</div>
        <ul class="numbers__list">
          <li v-for="number in first" :key="number.value" class="numbers__item">
            <span class="numbers__num">{{ number.value }}</span>
            <span class="numbers__name">{{ number.name }}</span>
            <span class="numbers__transliteration">{{
              number.transliteration
            }}</span>
          </li>
        </ul>
      </div>
      <div class="card">
        <div class="card__header">11-19</div>
        <ul class="numbers__list">
          <li
            v-for="number in second"
            :key="number.value"
            class="numbers__item"
          >
            <span class="numbers__num">{{ number.value }}</span>
            <span class="numbers__name">{{ number.name }}</span>
            <span class="numbers__transliteration">{{
              number.transliteration
            }}</span>
          </li>
        </ul>
      </div>
      <div class="card">
        <div class="card__header">20-90</div>
        <ul class="numbers__list">
          <li v-for="number in third" :key="number.value" class="numbers__item">
            <span class="numbers__num">{{ number.value }}</span>
            <span class="numbers__name">{{ number.name }}</span>
            <span class="numbers__transliteration">{{
              number.transliteration
            }}</span>
          </li>
        </ul>
      </div>
      <div class="card">
        <div class="card__header">100-1000</div>
        <ul class="numbers__list">
          <li
            v-for="number in fourth"
            :key="number.value"
            class="numbers__item"
          >
            <span class="numbers__num">{{ number.value }}</span>
            <span class="numbers__name">{{ number.name }}</span>
            <span class="numbers__transliteration">{{
              number.transliteration
            }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Numbers',
  data: () => ({
    first: [
      {
        value: 1,
        name: 'ერთი',
        transliteration: 'erti'
      },
      {
        value: 2,
        name: 'ორი',
        transliteration: 'ori'
      },
      {
        value: 3,
        name: 'სამი',
        transliteration: 'sami'
      },
      {
        value: 4,
        name: 'ოთხი',
        transliteration: 'otkhi'
      },
      {
        value: 5,
        name: 'ხუთი',
        transliteration: 'khuti'
      },
      {
        value: 6,
        name: 'ექვსი',
        transliteration: 'ekvsi'
      },
      {
        value: 7,
        name: 'შვიდი',
        transliteration: 'shvidi'
      },
      {
        value: 8,
        name: 'რვა',
        transliteration: 'rva'
      },
      {
        value: 9,
        name: 'ცხრა',
        transliteration: 'tskhra'
      },
      {
        value: 10,
        name: 'ათი',
        transliteration: 'ati'
      }
    ],
    second: [
      {
        value: 11,
        name: 'თერთმეტი',
        transliteration: 'tertmeti'
      },
      {
        value: 12,
        name: 'თორმეტი',
        transliteration: 'tormeti'
      },
      {
        value: 13,
        name: 'ცამეტი',
        transliteration: 'tsameti'
      },
      {
        value: 14,
        name: 'თოთხმეტი',
        transliteration: 'totkhmeti'
      },
      {
        value: 15,
        name: 'თხუთმეტი',
        transliteration: 'tkhutmeti'
      },
      {
        value: 16,
        name: 'თექვსმეტი',
        transliteration: 'tekvsmeti'
      },
      {
        value: 17,
        name: 'ჩვიდმეტი',
        transliteration: 'chvidmeti'
      },
      {
        value: 18,
        name: 'თვრამეტი',
        transliteration: 'tvrameti'
      },
      {
        value: 19,
        name: 'ცხრამეტი',
        transliteration: 'tskhrameti'
      }
    ],
    third: [
      {
        value: 20,
        name: 'ოცი',
        transliteration: 'otsi'
      },
      {
        value: 30,
        name: 'ოცდაათი',
        transliteration: 'otsdaati'
      },
      {
        value: 40,
        name: 'ორმოცი',
        transliteration: 'ormotsi'
      },
      {
        value: 50,
        name: 'ორმოცდაათი',
        transliteration: 'ormotsdaati'
      },
      {
        value: 60,
        name: 'სამოცი',
        transliteration: 'samotsi'
      },
      {
        value: 70,
        name: 'სამოცდაათი',
        transliteration: 'samotsdaati'
      },
      {
        value: 80,
        name: 'ოთხმოცი',
        transliteration: 'otkhmotsi'
      },
      {
        value: 90,
        name: 'ოთხმოცდაათი',
        transliteration: 'otkhmotsdaati'
      }
    ],
    fourth: [
      {
        value: 100,
        name: 'ასი',
        transliteration: 'asi'
      },
      {
        value: 200,
        name: 'ორასი',
        transliteration: 'orasi'
      },
      {
        value: 300,
        name: 'სამასი',
        transliteration: 'samasi'
      },
      {
        value: 400,
        name: 'ოთხასი',
        transliteration: 'otkhasi'
      },
      {
        value: 500,
        name: 'ხუთასი',
        transliteration: 'khutasi'
      },
      {
        value: 600,
        name: 'ექვსასი',
        transliteration: 'ekvsasi'
      },
      {
        value: 700,
        name: 'შვიდასი',
        transliteration: 'shvidasi'
      },
      {
        value: 800,
        name: 'რვაასი',
        transliteration: 'rvaasi'
      },
      {
        value: 900,
        name: 'ცხრაასი',
        transliteration: 'tskhraasi'
      },
      {
        value: 1000,
        name: 'ათასი',
        transliteration: 'atasi'
      }
    ]
  })
}
</script>

<style lang="scss" scoped>
.card {
  margin-top: 30px;

  &__header {
    text-align: center;
    color: rgb(217, 122, 67);
  }
}

.numbers {
  display: grid;
  grid-gap: 18px;
  grid-template-columns: repeat(2, 1fr);

  &__num {
    margin-right: 20px;
    color: #4b83a6;
  }

  @media (max-width: 800px) {
    grid-gap: 10px;
    grid-template-columns: 1fr;
  }
}
</style>
