<template>
  <q-dialog v-model="inception">
    <q-card>
      <q-card-section>
        <div class="text-h6">Edit User</div>
      </q-card-section>
      <q-form @submit="createVillage" class="q-gutter-md">
        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis
          laudantium minus earum totam modi laborum illo, corporis fuga saepe
          animi aliquam ea enim assumenda ut nulla natus aperiam quis. Iste.
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="location"
            label="Location"
            hint="e.g Nakuru West"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input
            v-model="village"
            label="Name of Village"
            hint="e.g Boma Nyeusi"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Close" v-close-popup />

          <q-btn flat type="submit" :loading="loading" label="Save">
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "edit-user",
};
</script>

<style lang="scss" scoped></style>
