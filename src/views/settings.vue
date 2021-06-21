<template>
  <div>
    <div>
      <div class="top__bar row items-center">
        <q-btn to="/app" round class="q-mr-lg" flat icon="arrow_back" />
        <div class="text-h6">Settings</div>
      </div>
    </div>

    <section class="wano">
      <div class="q-ma-md">
        <q-separator />
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Night mode</q-item-label>
            <q-item-label caption>Enable dark theme</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-toggle color="green" v-model="night_mode" val="light" />
          </q-item-section>
        </q-item>
        <q-separator />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "settings",
  data() {
    return {
      night_mode: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.top__bar {
  padding: 1em;
  background: #fff;
}

section.wano {
  margin-top: 2em;
}
</style>
