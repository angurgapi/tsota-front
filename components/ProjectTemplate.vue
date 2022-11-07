<template>
  <div class="project-tile lazy">
    <div class="project-tile__left">
      <img class="project-tile__img" :src="`${project.imageUrl}`" />
    </div>
    <div class="project-tile__right f-column">
      <span class="project-tile__title">{{ project.title }}</span>

      <ul class="project-tile__stack">
        <li
          v-for="(tech, index) in project.stack"
          :key="index"
          class="project-tile__stack-item"
        >
          <p>{{ tech.name }}</p>
        </li>
      </ul>
      <div class="project-tile__description">
        <span>{{ project.description[getLocale] }}</span>
      </div>

      <div class="project-tile__links f-row">
        <a
          class="btn project-tile__link"
          target="_blank"
          :href="`${project.demoLink}`"
          >{{ $t('Projects.demo') }}</a
        >

        <a
          class="btn project-tile__link"
          target="_blank"
          :href="`${project.sourceLink}`"
          >{{ $t('Projects.source') }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Project',
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  computed: {
    getLocale() {
      return this.$i18n.locale
    }
  }
}
</script>

<style lang="scss" scoped>
.project-tile {
  display: flex;
  align-items: flex-start;
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  height: 100%;
  background-color: rgba(2, 64, 19, 20%);
  transition: 0.4s all ease-in-out;

  &:not(:first-child) {
    margin-top: 30px;
  }

  &__left {
    @media (min-width: 500px) {
      padding-right: 30px;
    }
  }

  &__right {
    position: relative;
    height: 100%;
    min-height: 100%;
  }

  &__title {
    font-family: 'PF';
    font-size: 18px;
    text-transform: uppercase;
  }

  &__links {
    display: grid;
    justify-self: flex-end;
    grid-gap: 16px;
    grid-template-columns: 1fr 1fr;
    margin-top: 30px;
  }

  &__link {
    border: 1px solid rgba(2, 64, 19, 80%);
    color: rgba(2, 64, 19, 80%);

    &:hover {
      color: rgba(255, 255, 255, 90%);
      background: rgba(2, 64, 19, 70%);
    }
  }

  &__description {
    position: absolute;
    left: -50px;
    top: 95%;
    margin-top: 20px;
    border-radius: 8px;
    padding: 14px;
    max-width: 250px;
    color: #fff;
    background: rgba(2, 64, 19, 70%);

    @media (max-width: 500px) {
      position: relative;
      left: 0;
    }
  }

  &__img {
    border-radius: 8px;
    width: 300px;
    height: 300px;

    @media (max-width: 1000px) {
      width: 100%;
      max-width: 250px;
      max-height: 250px;
    }
  }

  &__stack {
    display: flex;
  }

  &__stack-item {
    list-style: none;
    margin-right: 10px;
    font-family: 'Yomogi';
  }

  &:hover {
    box-shadow: 0 4px 6px -2px rgb(0 0 0 / 30%);
  }

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;

    &__img {
      margin: 0 0 20px;
      width: 100%;
      height: auto;
      max-width: 100%;
    }
  }
}

.lazy {
  opacity: 0;
  transform: translateY(30px);
}
</style>
