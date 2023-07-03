<template>
  <div class="page">
    <h2 class="lesson__title">{{ $t('Navbar.shopping') }}</h2>
    <div class="shopping__intro">
      <p class="shopping__description">
        {{ $t('Shopping.legend') }}
      </p>
      <div class="shopping__list card">
        <ul>
          <li v-for="(item, index) in shoppingList" :key="index">{{ item }}</li>
        </ul>
      </div>
    </div>
    <div class="shopping">
      <div class="shopping__block">
        <div class="shopping__header f-row">
          <svg-image name="carrot" height="22" width="22" />
          <span class="shopping__title">{{ $t('Shopping.shelf') }}</span>
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
        <div class="shopping__header f-row">
          <svg-image name="basket" height="22" width="22" />
          <span class="shopping__title">{{ $t('Shopping.cart') }}</span>
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
        id: 8,
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
      },
      {
        id: 3,
        img: 'cheese',
        kartuli: 'ყველი'
      },
      {
        id: 9,
        img: 'honey',
        kartuli: 'თაფლი'
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
  margin: auto;
  margin-top: 20px;
  width: fit-content;
  font-size: 20px;
  text-align: center;
}

.shopping {
  display: grid;
  grid-gap: 18px;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 20px;
  margin-bottom: 40px;
  width: 800px;
  max-width: 100%;
  font-family: 'PF';

  &__list {
    float: right;
    margin-top: 0;
    width: fit-content;
  }

  &__intro {
    display: grid;
    align-items: center;
    justify-items: center;
    grid-gap: 18px;
    grid-template-columns: repeat(2, 1fr);
    width: 800px;
    max-width: 100%;

    p {
      margin-top: 20px;
      font-family: 'PF';
      font-size: 20px;
      line-height: 21px;
      text-align: justify;
    }

    @media (max-width: 700px) {
      grid-template-columns: 1fr;
    }
  }

  &__market {
    background: rgb(242, 183, 73);
  }

  &__header {
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }

  &__title {
    margin-left: 10px;
    color: #4b83a6;
  }

  &__cart {
    background: rgb(217, 122, 67);

    &--correct {
      border: 2px dashed rgba(37, 112, 43, 70%);
      background: rgba(17, 237, 75, 30%);
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
    align-items: start;
    grid-auto-rows: min-content;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(50px, 110px));
    margin-top: 20px;
    border-radius: 8px;
    padding: 10px;
    height: 100%;
    box-shadow: 0 0 6px rgba(0, 0, 0, 12%);

    @media (max-width: 600px) {
      grid-template-columns: repeat(auto-fit, minmax(40px, 60px));
    }

    @media (max-width: 430px) {
      grid-gap: 5px;
      padding: 8px;
    }
  }

  @media (max-width: 700px) {
    grid-gap: 10px;
  }
}
</style>
