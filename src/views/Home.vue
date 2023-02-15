<template>
  <div class="pa-5">
    <h1>Territories</h1>
    <p class="pa-1">Here are the list of territories</p>
    <v-list class="mt-2">
      <TerritoryItem
        v-for="child in Object.values(territoryStore.getTerritoryTree.children)"
        :key="child.id ?? ''"
        :territory="child"
        :index="0"
      />
    </v-list>
  </div>
</template>

<script lang="ts" setup>
import TerritoryItem from "../components/TerritoryItem.vue";
import { useTerritoryStore } from "../store/territory";

const territoryStore = useTerritoryStore();
territoryStore.fetchTerritoryTree();
</script>
