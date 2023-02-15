<template>
  <v-list-group v-if="childrenList.length">
    <template v-slot:activator="{ props }">
      <v-list-item
        v-bind="props"
        :title="territory.name"
        :class="classColorList[indexToUse]"
      />
    </template>

    <TerritoryItem
      v-for="grandChild in childrenList"
      :key="grandChild.id ?? ''"
      :territory="grandChild"
      :index="indexToUse + 1"
    />
  </v-list-group>
  <v-list-item v-else :title="territory.name" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { TreeTerritoryModel } from "../models/territory-model";

const props = defineProps<{
  territory: TreeTerritoryModel;
  index: number;
}>();

const classColorList = ["bg-blue-darken-2", "bg-blue-lighten-4"];
const indexToUse = props.index % classColorList.length;

const childrenList = computed(() => Object.values(props.territory.children));
</script>

<style scoped></style>
