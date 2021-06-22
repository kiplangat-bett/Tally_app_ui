<template>
  <div class="main column items-center justify-center">
    <img src="../assets/logo.png" class="main__text" />

    <section class="animated text-center">
      <div class="text-h4 q-mt-lg">Usawa Agenda</div>
      <div class="subtitle-text q-mt-sm">Data Collection Platform</div>

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
    </section>
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
  margin-bottom: 2em;
}

.animated {
  animation: fade-in 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(24px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
