<template>
  <div class="q-pa-lg" style="max-width: 400px">
    <div class="logo">
      <img src="../assets/logo.png" class="main__text" />
      <div class="subtitle-text q-my-sm">Village Data Collection Platform</div>

      <div class="text-h4 text-center q-mb-lg">Login Account</div>
    </div>

    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        outlined
        type="email"
        v-model="email"
        class="fork"
        label="Your email *"
        hint="Email address"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        v-model="password"
        class="fork"
        outlined
        :type="isPwd ? 'password' : 'text'"
        label="Your password *"
        lazy-rules
        :rules="[(val) => (val && val.length > 5) || 'password too short']"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div>
        <q-btn
          type="submit"
          :loading="loading"
          label="Login"
          style="color: #fff"
          icon="login"
          class="q-my-sm full-width"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
      </div>

      <div class="q-my-lg text-center text-h6">
        <span>New Here?</span>
        <router-link class="router__link" to="/register">
          Create An Account
        </router-link>
      </div>
    </q-form>
  </div>
</template>

<script>
import http from "@/utils/http-common";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      isPwd: true,
    };
  },
  created() {
    window.localStorage.removeItem("not_new");
    const error = window.localStorage.getItem("logout");

    if (error == null) {
      return;
    }
    this.showNotif(error, "bottom");
  window.localStorage.removeItem("logout");

  },
  methods: {
    async onSubmit() {
      try {
        this.loading = true;
        const res = await http.post("/login", {
          email: this.email,
          password: this.password,
        });

        if (res.data.success == false) {
          this.showNotif(res.data.message);
          this.loading = false;

          return;
        }

        window.localStorage.setItem("token", res.data.token);
        // set the token

        this.$router.push({ path: "/app" });
        this.loading = false;
      } catch (err) {
        console.log(err);
      }
    },
    showNotif(message, position = "top") {
      this.$q.notify({
        message: message,
        icon: "report_problemt",
        color: "negative",
        multiline: true,

        timeout: 1000,
        position: position,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.full-width {
  width: 100%;
  padding: 0.4em 0;
  background: #1186cafb;
  color: #fff !important;
  font-size: 15px;
}
.vanish {
  color: #fff;
}
.logo {
  padding: 1rem 0;
  text-align: center;
}
.force-text {
  font-size: 80px;
  font-family: "";
  width: 100px;
  height: 100px;
  background: rgba(29, 5, 5, 0.349);
  border-radius: 50%;
  font-family: "Segoe Script";
  margin: 0 auto;
}
.subtitle-text {
  font-family: "Gabriola";
}
.router__link {
  text-decoration: none;
  color: #1186cafb;
  border-bottom: 1px dotted #1186cafb;
}
</style>
