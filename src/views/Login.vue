<template>
  <div class="pa-5 text-center">
    <h1 class="mt-5">Login to your Account</h1>
    <p class="py-2">To use the app, please login first.</p>

    <v-form @submit="login">
      <v-container class="mt-5">
        <v-row class="justify-center">
          <v-col class="pt-5" cols="12" sm="5">
            <v-text-field
              v-model="form.username"
              label="Username"
              required
              :rules="[(v) => !!v || 'Username is required']"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col class="pb-5" cols="12" sm="5">
            <v-text-field
              v-model="form.password"
              label="Password"
              required
              :rules="[(v) => !!v || 'Password is required']"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-btn type="submit" color="primary" variant="flat" size="large"
        >SUBMIT</v-btn
      >
    </v-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useAuthStore } from "../store/auth";

const form = reactive({
  username: "",
  password: "",
});

const authStore = useAuthStore();
const login = () => {
  authStore.login(form.username, form.password);
};
</script>
