<template>
  <div class="alphabet card">
    <table class="alphabet__table">
      <tr class="alphabet__header">
        <th class="alphabet__cell">буква</th>
        <th class="alphabet__cell">транслит</th>
        <th class="alphabet__cell">название</th>
      </tr>
      <tr v-for="letter in letters" :key="letter.is" class="alphabet__letter">
        <td class="alphabet__cell">{{ letter.value }}</td>
        <td class="alphabet__cell">{{ letter.transliteration }}</td>
        <td class="alphabet__cell">{{ letter.name }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Alphabet',
  data: () => ({
    letters: [
      {
        id: 1,
        name: 'ani',
        value: 'ა',
        transliteration: 'a'
      },
      {
        id: 2,
        name: 'bani',
        value: 'ბ',
        transliteration: 'b'
      },
      {
        id: 3,
        name: 'gani',
        value: 'გ',
        transliteration: 'g'
      },
      {
        id: 4,
        name: 'doni',
        value: 'დ',
        transliteration: 'd'
      },
      {
        id: 5,
        name: 'eni',
        value: 'ე',
        transliteration: 'e'
      },
      {
        id: 6,
        name: 'vini',
        value: 'ვ',
        transliteration: 'v'
      },
      {
        id: 7,
        name: 'zeni',
        value: 'ზ',
        transliteration: 'z'
      },
      {
        id: 8,
        name: 'tani',
        value: 'თ',
        transliteration: 't'
      },
      {
        id: 9,
        name: 'ini',
        value: 'ი',
        transliteration: 'i'
      },
      {
        id: 10,
        name: 'k`ani',
        value: 'კ',
        transliteration: 'k'
      },
      {
        id: 11,
        name: 'lasi',
        value: 'ლ',
        transliteration: 'l'
      },
      {
        id: 12,
        name: 'mani',
        value: 'მ',
        transliteration: 'm'
      },
      {
        id: 13,
        name: 'nari',
        value: 'ნ',
        transliteration: 'n'
      },
      {
        id: 14,
        name: 'oni',
        value: 'ო',
        transliteration: '0'
      },
      {
        id: 15,
        name: 'p`ari',
        value: 'პ',
        transliteration: 'p'
      },
      {
        id: 16,
        name: 'zhani',
        value: 'ჟ',
        transliteration: 'zh'
      },
      {
        id: 17,
        name: 'rae',
        value: 'რ',
        transliteration: 'r'
      },
      {
        id: 18,
        name: 'sani',
        value: 'ს',
        transliteration: 's'
      },
      {
        id: 19,
        name: 't`ari',
        value: 'ტ',
        transliteration: 't'
      },
      //
      {
        id: 20,
        name: 'uni',
        value: 'უ',
        transliteration: 'u'
      },
      {
        id: 21,
        name: 'pari',
        value: 'ფ',
        transliteration: 'p'
      },
      ///
      {
        id: 22,
        name: 'kani',
        value: 'ქ',
        transliteration: 'k'
      },
      {
        id: 23,
        name: 'ghani',
        value: 'ღ',
        transliteration: 'gh'
      },
      {
        id: 24,
        name: 'q`ari',
        value: 'ყ',
        transliteration: 'q’'
      },
      {
        id: 25,
        name: 'shini',
        value: 'შ',
        transliteration: 'sh'
      },
      {
        id: 26,
        name: 'chini',
        value: 'ჩ',
        transliteration: 'ch'
      },
      {
        id: 27,
        name: 'tsani',
        value: 'ც',
        transliteration: 'ts'
      },
      {
        id: 28,
        name: 'dzili',
        value: 'ძ',
        transliteration: 'dz'
      },
      {
        id: 29,
        name: 'tsili',
        value: 'წ',
        transliteration: 'ts'
      },
      {
        id: 30,
        name: 'chari',
        value: 'ჭ',
        transliteration: 'ch'
      },
      {
        id: 31,
        name: 'khani',
        value: 'ხ',
        transliteration: 'kh'
      },
      {
        id: 32,
        name: 'jani',
        value: 'ჯ',
        transliteration: 'j'
      },
      {
        id: 33,
        name: 'hae',
        value: 'ჰ',
        transliteration: 'h'
      }
    ]
  })
}
</script>

<style lang="scss" scoped>
.alphabet {
  padding: 20px;
  // min-width: 300px;

  &__cell {
    padding: 2px 8px;
  }

  &__header {
    th {
      text-align: left;
    }
  }

  &__letter {
    .alphabet__cell:first-child {
      font-size: 18px;
    }

    &:nth-child(even) {
      background: rgb(242, 183, 73);
    }
  }
}
</style>
