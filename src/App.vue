<template>
  <div id="app">
    <router-view class="full-height" />
  </div>
</template>

<script>
// import http from "@/utils/http-common";

export default {
  name: "app",

  data() {
    return {
      leftDrawerOpen: false,
    };
  },

};
</script>

<style>
* {
  /* font-family: "Corbel"; */
  font-family: "Noto Sans JP";
  color: #1c3f5f;
}
#app {
  background: #fff;
  /* background: linear-gradient(-45deg, transparent, #2a3642),
    linear-gradient(45deg, #0197dd, transparent), url("./assets/main.jpg");
  background-size: cover;
  background-attachment: fixed; */
  min-height: 100vh;
}
</style>
