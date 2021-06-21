<template>
  <q-dialog v-model="inception">
    <q-card>
      <q-card-section>
        <div class="text-h6">Edit Village</div>
      </q-card-section>
      <q-form @submit="updateVillage" class="q-gutter-md">
        <q-card-section>
          <q-input
            v-model="village.locality"
            label="Location"
            hint="e.g Nakuru West"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input
            v-model="village.name"
            label="Name of Village"
            hint="e.g Boma Nyeusi"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Close" no-caps v-close-popup />

          <q-btn flat type="submit" no-caps label="Update" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "update-village",
  props: ["openlog", "data"],
  data() {
    return {
      village: {
        location: "",
        name: "",
      },
      inception: "",
    };
  },
  mounted() {
    this.village.name = this.data.name;
    this.village.locality = this.data.locality;
    this.inception = this.openlog;
    console.log(this.inception);
  },
  methods: {
    updateVillage() {
      this.$emit("hintVillage", this.village);
    },
  },
};
</script>

<style lang="scss" scoped></style>
