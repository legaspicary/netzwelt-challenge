<template>
  <HelloWorld />
</template>

<script lang="ts" setup>
import HelloWorld from "@/components/HelloWorld.vue";
import { useTerritoryStore } from "../store/territory";

const territoryStore = useTerritoryStore();
territoryStore.fetchTerritoryTree();
console.log(territoryStore.getTerritoryTree);
</script>
