<template>
  <div class="pagination f-row">
    <button
      v-if="prevBtn"
      class="btn pagination__btn"
      @click="getPage(prevBtn)"
    >
      <svg-image name="chevron-left" height="15" width="20" />
    </button>
    <div class="btn pagination__btn pagination__btn--current">
      {{ getCurrentPage }}
    </div>
    <button
      v-if="nextBtn"
      class="btn pagination__btn"
      @click="getPage(nextBtn)"
    >
      <svg-image name="chevron-right" height="15" width="20" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'PaginationBtns',
  props: {
    totalPages: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    prevBtn() {
      return this.getCurrentPage > 1 ? this.getCurrentPage - 1 : 0
    },
    getCurrentPage() {
      return +this.$route.params.id
    },
    nextBtn() {
      return this.getCurrentPage < this.totalPages ? this.getCurrentPage + 1 : 0
    }
  },
  methods: {
    getPage(pagenum) {
      this.$router.push(`/lessons/${pagenum}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  align-items: center;
  justify-content: center;

  &__btn {
    border-radius: 50%;
    width: 42px;
    height: 42px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 8%);
    background: #fff;

    &:not(:first-child) {
      margin-left: 10px;
    }

    &:hover {
      box-shadow: 0 0 8px rgba(0, 0, 0, 22%);
    }

    &--current {
      color: #4b83a6;
    }
  }
}
</style>
