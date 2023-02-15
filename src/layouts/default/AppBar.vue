<template>
  <v-app-bar color="primary" density="compact">
    <v-app-bar-title>{{ currentRoute.name }}</v-app-bar-title>

    <template v-slot:append>
      <v-btn v-if="isInHome" icon="mdi-logout"></v-btn>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const currentRoute = router.currentRoute.value;
const isInHome = computed(
  () => currentRoute.name?.toString().toLocaleLowerCase() === "home"
);
</script>
