<template>
  <div class="main column items-center justify-center">
    <div class="text-h6 text-white main__text">Welcome to Usawa</div>
    <div class="q-mt-lg column items-center action__btns">
      <q-btn
        to="/register"
        no-caps
        class="reg__link"
        label="Get Started"
        color="yellow"
      />

      <q-btn
        to="/login"
        flat
        no-caps
        class="q-mt-sm text-white login__link"
        label="Already have an Account"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "session",
};
</script>

<style lang="scss" scoped>
.main {
  min-height: 100vh;
}
.reg__link {
  // font-size: 20px;
  padding: 0.3em 4em;
}
.login__link {
  font-size: 14px;
}
.main__text {
  margin-top: 8em;
}
</style>
