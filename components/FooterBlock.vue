<template>
  <div class="footer f-column">
    <Accordion title="контакты">
      <template #content>
        <ul class="footer__links">
          <li>
            <a
              class="footer__link"
              href="https://www.linkedin.com/in/sofiazarowska/"
              target="_blank"
            >
              <svg-image name="linkedin" height="20" width="20" />
            </a>
          </li>
          <li>
            <a
              class="footer__link"
              href="https://t.me/angurgapi"
              target="_blank"
            >
              <svg-image name="telegram" height="20" width="20" />
            </a>
          </li>
          <li>
            <a
              class="footer__link"
              href="mailto:sophiekovalsky@gmail.com"
              target="_blank"
            >
              <svg-image name="envelope" height="20" width="20" />
            </a>
          </li>
        </ul>
      </template>
    </Accordion>
    <span class="footer__copyright">&#169; Aguri {{ currentYear }}</span>
  </div>
</template>

<script>
export default {
  name: 'FooterBlock',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  align-items: center;
  padding: 24px;
  width: 100%;
  min-height: 100px;
  color: #f0f2f0;
  background-color: rgb(25, 28, 31);

  &::v-deep .accordion {
    width: fit-content;

    &__btn {
      color: #fff;
    }
  }

  &__links {
    display: grid;
    grid-gap: 18px;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
  }

  &__link {
    display: flex;
    align-items: center;

    // svg {
    //   fill: #fff;
    // }
  }

  &__copyright {
    margin-top: 22px;
  }
}
</style>
