<template>
  <div class="main">
    <div class="top__bar row items-center justify-between">
      <div class="row items-center">
        <q-btn to="/app" round class="q-mr-lg" flat icon="arrow_back" />
        <div class="text-h6 ellipsis" style="max-width: 150px">
          nth Number Generator
        </div>
      </div>

      <q-btn flat round color="primary" icon="more_vert">
        <q-menu :offset="[-30, -25]" style="border-radius: 20px">
          <q-list style="min-width: 150px; background: #eee">
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-icon name="delete" size="20px" />
              </q-item-section>

              <q-item-section>Delete</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <section>
      <div class="text-h6 text-center q-mt-lg">
        <q-chip
          outline
          square
          color="red"
          text-color="white"
          icon="check"
          label="Finished"
        />
      </div>

      <div class="text-h5 q-mt-md q-pa-md text-center">
        Selected households for {{ data.name }}
      </div>

      <nth-card
        class="names"
        v-for="(name, index) in nth_numbers"
        :participants="participants"
        :data="name"
        :key="index"
      />
    </section>
  </div>
</template>

<script>
import http from "@/utils/http-common";
import nthCard from "@/components/nth_number";

const token = window.localStorage.getItem("token");

export default {
  name: "finale",
  props: ["villageId"],
  components: {
    "nth-card": nthCard,
  },
  data() {
    return {
      data: {},
      participants: [],
      nth_numbers: [],
    };
  },
  async created() {
    await this.Generate_nth_number();
  },
  methods: {
    async Generate_nth_number() {
      const res = await http.get("/generate_nth/" + this.villageId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      console.log(res.data);
      this.nth_numbers = res.data.data;
      this.data = res.data.village;
      this.participants = this.data.participants;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  margin-top: 8em;
}
.top__bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1em;
  background: #fff;
  z-index: 1000;
}
</style>
