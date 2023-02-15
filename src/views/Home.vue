<template>
  <div class="pa-5">
    <h1>Territories</h1>
    <p class="pa-1">Here are the list of territories</p>

    <div v-if="isLoading">
      <v-container fluid>
        <v-row>
          <v-col xs="12" sm="12">
            <span class="mr-2"> Getting data ... </span>
            <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-list v-else class="mt-2">
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
import { onMounted, ref } from "vue";
import TerritoryItem from "../components/TerritoryItem.vue";
import { useTerritoryStore } from "../store/territory";

const territoryStore = useTerritoryStore();
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  await territoryStore.fetchTerritoryTree();
  isLoading.value = false;
});
</script>
