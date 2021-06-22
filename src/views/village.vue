<template>
  <div class="main">
    <div class="top__bar row items-center justify-between">
      <div class="row items-center">
        <q-btn to="/app" round class="q-mr-lg" flat icon="arrow_back" />
        <div class="text-h6 ellipsis" style="max-width: 200px">
          {{ data.name }}
        </div>
      </div>

      <q-btn flat round color="primary" icon="more_vert">
        <q-menu :offset="[-10, 20]" style="border-radius: 20px">
          <q-list style="min-width: 150px; background: #eee">
            <q-item clickable v-close-popup @click="inception = true">
              <q-item-section>
                <q-icon name="edit" size="20px" />
              </q-item-section>

              <q-item-section>Edit</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup @click="popVillage">
              <q-item-section>
                <q-icon name="delete" size="20px" />
              </q-item-section>

              <q-item-section>Delete</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <section
      class="q-py-lg wano column items-center"
      v-if="participants.length == 0"
    >
      <img class="fallback__img" src="../assets/empty_data.svg" alt="" />
      <div class="subtitle-text1 q-my-lg">No participants added</div>

      <q-btn icon="add" @click="prompt" no-caps label="Add Participants" />
    </section>

    <section class="wano" v-else>
      <div class="q-mt-md">
        <q-separator />
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Mark as Completed</q-item-label>
            <q-item-label caption>Finished adding participants</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-toggle color="green" v-model="completed" val="incomplete" />
          </q-item-section>
        </q-item>
        <q-separator />
      </div>

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

      <div class="q-pa-lg column items-center text-center" v-if="completed">
        <div class="text-h6">Congratulations!<br /></div>
        <div class="q-mt-sm subtitle-text">
          You have successfully populated village Data
        </div>

        <q-btn
          :to="{ path: `/app/generate-nth/${data._id}` }"
          class="q-mt-lg"
          no-caps
          color="secondary"
          label="Generate Nth Number"
        />
      </div>

      <template v-else>
        <div class="search__bar q-mt-md">
          <q-input
            outlined
            dense
            bottom-slots
            v-model="search__text"
            label="Search participant"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
            <template v-slot:append>
              <q-icon name="close" @click="text = ''" class="cursor-pointer" />
            </template>
          </q-input>
        </div>

        <section class="q-px-md row items-center justify-between">
          <div>
            <span> Participants </span>
            <span class="q-ml-md">
              {{ data.participants.length }}
            </span>
          </div>

          <q-btn no-caps icon="add" @click="prompt" label="Add New" />
        </section>

        <div class="q-mt-lg custom__add">
          <q-expansion-item
            class="shadow-1 overflow-hidden q-mt-md"
            style="border-radius: 10px"
            icon="face"
            :label="info"
            header-class="bg-grey2 text-white"
            expand-icon-class="text-white"
            v-for="(info, index) in data.participants"
            :key="index"
          >
            <q-card>
              <q-card-section>
                <div class="column">
                  <q-btn
                    color="primary"
                    outline
                    label="Remove User"
                    @click="deleteUser(index)"
                    no-caps
                    style="display: inline-block"
                  />

                  <q-form @submit="updateUser(index)" class="q-gutter-md">
                    <q-input
                      v-model="new_name"
                      label="Name(s)"
                      hint="e.g Jane Doe"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Please type something',
                      ]"
                    />
                    <q-btn flat type="submit" no-caps label="Update" />
                  </q-form>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>

        <!--  -->
      </template>
    </section>
  </div>
</template>

<script>
import http from "@/utils/http-common";

const token = window.localStorage.getItem("token");

export default {
  name: "village",
  props: ["id"],
  data() {
    return {
      search__text: "",
      data: "",
      participants: [],
      completed: false,
      inception: false,
      new_name: "",
      village: {
        name: "",
        locality: "",
      },
    };
  },
  async created() {
    await this.fetchData();
  },
  watch: {
    completed: async function () {
      await this.updateCompleteStatus();
    },
  },

  methods: {
    async updateVillage() {
      console.log("hinted correctly");

      const res = await http.post(
        "/updateVillage",
        {
          villageId: this.data._id,
          data: this.village,
        },
        {
          headers: {
            Authorizaton: "Bearer " + token,
          },
        }
      );

      this.showNotif(res.data.msg);
    },
    async popVillage() {
      const res = await http.post(
        "/deleteVillage",
        {
          villageId: this.data._id,
        },
        {
          headers: {
            Authorizaton: "Bearer " + token,
          },
        }
      );

      console.log(res);
      window.localStorage.setItem("v_deletion", "successfully removed village");
      this.$router.push({ path: "/app" });
      // show notifications on main
    },

    async updateCompleteStatus() {
      const res = await http.post(
        "/setCompleted",
        {
          completed: this.completed,
          villageId: this.data._id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res.data.success) {
        console.log(res.data.success);
      }
    },
    async updateUsers(target) {
      this.participants[target] = this.new_name;

      const res = await http.post(
        "/editParticipant",
        {
          participants: this.participants,
          villageId: this.data._id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      this.new_name = "";

      this.showNotif(res.data.msg);

      await this.fetchData();

      console.log(res);
    },
    async deleteUsers(target) {
      const res = await http.post(
        "/editParticipant",
        {
          participants: target,
          villageId: this.data._id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      this.showNotif("deleted succesfully!");

      await this.fetchData();

      console.log(res);
    },
    async deleteUser(index) {
      console.log(index);
      this.participants.splice(index, 1);

      await this.deleteUsers(this.participants);
      await this.fetchData();
    },

    async fetchData() {
      const res = await http.get("/fetchVillages", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      this.data = res.data.data[this.id];
      this.participants = [...this.data.participants];
      this.completed = this.data.completed;
      this.village.name = this.data.name;
      this.village.locality = this.data.locality;

      console.log(this.data);
    },
    showNotif(message) {
      this.$q.notify({
        message: message,
        icon: "thumb_up",
        color: "positive",
        multiline: true,
        timeout: 1000,
        position: "bottom",
      });
    },
    prompt() {
      this.$q
        .dialog({
          dark: false,
          title: "Partcipants add pop up",
          message: "Enter name(s)?",
          prompt: {
            model: "",
            type: "text", // optional
          },
          cancel: true,
          persistent: true,
        })
        .onOk(async (data) => {
          console.log(">>>> OK, received", data);
          const res = await http.post(
            "/addParticipant",
            {
              participant: data,
              villageId: this.data._id,
            },
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          console.log(res);
          await this.fetchData();
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.search__bar * {
  color: white;
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
.custom__add {
  background: #eee;
  border-radius: 10px;
}
.fallback__img {
  width: 200px;
  object-fit: cover;
}
section.wano {
  margin-top: 4em;
}
.main {
  padding: 1em;
}
</style>
