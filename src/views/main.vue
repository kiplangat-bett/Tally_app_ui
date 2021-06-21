<template>
  <div class="home">
    <div class="bottom__nav">
      <!-- import custom component -->
      <top-bar />
      <navigator />
    </div>

    <div class="q-py-lg">
      <div class="text-h4 text-center">{{ user.name }}</div>
      <div
        class="subtitle-text1 text-center q-mt-sm"
        style="font-style: italic"
      >
        Village Commissioner
      </div>
    </div>

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

    <div class="top__bar row justify-between items-center q-px-lg q-my-md">
      <div class="custom__header text-h6">Villages</div>
      <div class="simple-actions">
        <q-btn
          rounded
          @click="addVillage"
          outlined
          no-caps
          icon="add"
          label="New Village"
        />
      </div>
    </div>

    <section class="column items-center" v-if="data.length == 0">
      <img class="fallback__img" src="../assets/empty_data.svg" alt="" />
      <div class="subtitle-text1 q-my-lg">You have No Villages !</div>
    </section>

    <section v-else>
      <div class="main__data q-pa-sm">
        <router-link
          v-for="(info, index) in data"
          :key="index"
          :to="{ path: `/app/village/${index}` }"
          class="village__data"
        >
          <div class="text-h6">{{ info.name }}</div>
          <div class="row items-center">
            <div class="size__monitor q-mr-md">
              <q-icon color="primary" name="place" />
              <span class="q-ml-sm">{{ info.locality }} </span>
            </div>
            <div class="size__monitor">
              <q-icon color="primary" name="people" />
              <span class="q-ml-sm">
                {{ info.participants.length }}
              </span>
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <!-- data dialogue -->

    <q-dialog v-model="inception">
      <q-card>
        <q-card-section>
          <div class="text-h6">create village</div>
        </q-card-section>

        <q-form @submit="createVillage" class="q-gutter-md">
          <q-card-section class="q-pt-none">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Perferendis laudantium minus earum totam modi laborum illo, corporis
            fuga saepe animi aliquam ea enim assumenda ut nulla natus aperiam
            quis. Iste.
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

    <!-- end  -->

    <div class="q-pa-lg classic__bg">
      <div class="text-h5 row items-center">
        <q-icon name="warning" />
        <span class="q-ml-md">Disclaimer</span>
      </div>

      <div class="subtitle-text1 q-mt-md">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
        voluptatibus repudiandae vitae unde eum optio ipsa laboriosam? Qui,
        deserunt alias!
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/utils/http-common";

import navigator from "@/components/navigator.vue";
import topBar from "@/components/top-bar";

const token = window.localStorage.getItem("token");

export default {
  name: "main__app",
  components: {
    navigator,
    "top-bar": topBar,
  },
  data() {
    return {
      village: "",
      location: "",
      data: [],
      user: "",
      night_mode: false,
      inception: false,
      loading: false,
    };
  },

  async created() {
    console.log(token);
    await this.fetchData();
    await this.fetchUser();
  },
  methods: {
    addVillage() {
      this.inception = true;
    },
    onSubmit() {
      console.log("called");
    },
    async createVillage() {
      this.loading = true;
      const res = await http.post(
        "/createVillage",
        { name: this.village, locality: this.location, completed: false },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(res);

      this.loading = false;
      this.inception = false;
      await this.fetchData();

      this.showNotif("successfully created!");
    },
    async fetchUser() {
      const res = await http.get("/fetchInfo", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(res.data);
      if (res.data.success == false) {
        window.localStorage.removeItem("token");

        return this.$router.push({ name: "login" });
      }

      this.user = res.data.data.data;
    },
    async fetchData() {
      const res = await http.get("/fetchVillages", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      this.data = res.data.data;
    },
    showNotif(message) {
      this.$q.notify({
        message: message,
        icon: "thumb_up",
        color: "positive",
        multiline: true,
        timeout: 1000,
        position: "top",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
}
// .bottom__nav {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   padding: 0.5em 1em;
//   background: #eee;
//   z-index: 99;
// }

.fallback__img {
  width: 200px;
  object-fit: cover;
}

.classic__bg {
  background: #1186ca5b;
  margin: 1em;
  border-radius: 10px;
}

.village__data {
  // border: 0.5px solid rgba($color: #ffffff, $alpha: 0.3);
  padding: 1em 2em;
  border-radius: 8px;
  display: block;
  margin-bottom: 10px;
  text-decoration: none;
  background: #eee;

  .size__monitor {
    font-style: italic;
    span {
      font-size: 12px;
    }
  }
}
</style>
