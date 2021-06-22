<template>
  <q-list bordered class="q-ma-md">
    <q-expansion-item
      group="somegroup"
      icon="perm_identity"
      :label="participants[data]"
      default-opened
      header-class="text-primary"
    >
      <q-card>
        <q-card-section>
          <span class="q-mr-md"> Visited Household </span>
          <q-btn color="secondary" label="confirm" />
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-separator />
  </q-list>
</template>

<script>
export default {
  name: "nth_number",
  props: ["data", "participants"],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
