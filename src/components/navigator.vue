<template>
  <div class="q-px-md row items-start">
    <router-link to="/app" class="custom__link">
      <q-icon name="dashboard" class="q-mr-sm" size="18px" />
      <div>Dashboard</div>
    </router-link>
    <router-link to="/app/settings" class="custom__link">
      <q-icon name="settings" class="q-mr-sm" size="18px" />

      <div>settings</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "my__nav",
};
</script>

<style lang="scss" scoped>
.custom__link {
  margin-right: 15px;
  text-decoration: none;
  padding: 5px 0;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 600;
  display: flex;
  align-items: center;
  transition: all 0.5s;

  * {
    font-size: 14px;
  }
}

.router-link-active {
  border-radius: 4px;
  padding: 4px 10px;
  background: #13fff33f;
  div {
    // color: #13fff3;
  }
}
</style>
