<template>
  <div class="row items-center justify-between q-pa-md">
    <div class="text-h6">Dashboard</div>
    <div class="side row items-center">
      <q-btn icon="search" flat round class="q-mr-sm" />
      <q-btn @click="logout" icon="logout" flat />
    </div>
  </div>
</template>

<script>
export default {
  name: "top-bar",
  methods: {
    logout() {
      window.localStorage.removeItem("token");
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style lang="scss" scoped></style>
