<template>
  <div class="footer f-column">
    <Accordion :title="$t('Footer.contact')">
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
    <a
      class="footer__link footer__support"
      href="https://www.buymeacoffee.com/angurgapi"
      target="_blank"
    >
      <svg-image name="mug-saucer-solid" height="20" width="20" />{{
        $t('Footer.support')
      }}
    </a>
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

  &__support {
    margin-top: 10px;
    font-family: 'PF';
    font-size: 20px;
    color: rgb(242, 183, 73);

    img {
      margin-right: 15px;
    }
  }

  &__copyright {
    margin-top: 22px;
  }
}
</style>
