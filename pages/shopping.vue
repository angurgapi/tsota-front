<template>
  <div class="page">
    <h2 class="lesson__title">Шоппинг</h2>
    <p class="lesson__description">
      Вас попросили сходить в супермаркет за продуктами. Вам даже выдали список,
      но он написан на грузинском. Положите в корзину все товары из списка
      (ничего лишнего!)
    </p>
    <div class="shopping-list card">
      <ul>
        <li v-for="(item, index) in shoppingList" :key="index">{{ item }}</li>
      </ul>
    </div>
    <div class="shopping">
      <div class="shopping__block">
        <div class="shopping__header">
          <span class="shopping__title">витрина</span>
        </div>
        <draggable class="shopping__market" :list="itemsList" group="my-group">
          <div
            v-for="element in itemsList"
            :key="element.id"
            class="shopping__item"
            :style="`background-image: url('/img/shop/${element.img}.jpg')`"
          />
        </draggable>
      </div>
      <div class="shopping__block">
        <div class="shopping__header">
          <span class="shopping__title">корзина</span>
        </div>
        <draggable
          class="shopping__cart"
          :list="cart"
          group="my-group"
          :class="{ 'shopping__cart--correct': isCartCorrect }"
        >
          <div
            v-for="element in cart"
            :key="element.id"
            class="shopping__item"
            :style="`background-image: url('/img/shop/${element.img}.jpg')`"
          />
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'Shopping',
  components: { draggable },
  data: () => ({
    itemsList: [
      {
        id: 1,
        img: 'bananas',
        kartuli: 'ბანანი'
      },
      {
        id: 2,
        img: 'potatoes',
        kartuli: 'კარტოფილი'
      },
      {
        id: 3,
        img: 'bacon',
        kartuli: 'ბეკონი'
      },
      {
        id: 4,
        img: 'water',
        kartuli: 'წყალი'
      },
      {
        id: 5,
        img: 'basil',
        kartuli: 'რეჰანი'
      },
      {
        id: 6,
        img: 'wine',
        kartuli: 'ღვინო'
      },
      {
        id: 7,
        img: 'eggs',
        kartuli: 'კვერცხები'
      }
    ],
    cart: [],
    shoppingList: ['ბანანი', 'კარტოფილი', 'ღვინო', 'წყალი', 'ბეკონი']
  }),
  computed: {
    isCartCorrect() {
      let listSorted = [...this.shoppingList].sort()
      let cartSorted = [
        ...this.cart.map((item) => {
          return item.kartuli
        })
      ].sort()
      console.log(listSorted)
      console.log(
        this.cart
          .map((item) => {
            return item.kartuli
          })
          .sort()
      )
      return JSON.stringify(cartSorted) === JSON.stringify(listSorted)
    }
  }
}
</script>

<style lang="scss" scoped>
.lesson__description {
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
}

.shopping-list {
  margin-top: 20px;
}

.shopping {
  display: grid;
  grid-gap: 18px;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 20px;
  width: 100%;

  &__market {
    background: rgb(169, 248, 176);
  }

  &__cart {
    background: coral;

    &--correct {
      background: green;
    }
  }

  &__item {
    border-radius: 5px;
    width: 100%;
    height: auto;
    background-size: cover;
    cursor: pointer;
    aspect-ratio: 1;
  }

  &__market,
  &__cart {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(50px, 100px));
    margin-top: 20px;
    border-radius: 8px;
    padding: 10px;
    height: 100%;

    @media (max-width: 600px) {
      grid-template-columns: repeat(auto-fit, minmax(40px, 60px));
    }
  }
}
</style>
