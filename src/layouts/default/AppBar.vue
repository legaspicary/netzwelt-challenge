<template>
  <v-app-bar color="primary">
    <v-app-bar-title>{{ currentRoute.name }}</v-app-bar-title>

    <span v-if="isInHome" class="mr-3">
      Welcome, {{ authStore.getUser?.displayName }}
    </span>
    <template v-slot:append>
      <v-btn v-if="isInHome" icon="mdi-logout" @click="logout"></v-btn>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../store/auth";

const router = useRouter();
const currentRoute = router.currentRoute.value;
const isInHome = computed(
  () => currentRoute.name?.toString().toLocaleLowerCase() === "home"
);

const authStore = useAuthStore();
const logout = () => {
  authStore.logout();
  window.location.reload();
};
</script>
