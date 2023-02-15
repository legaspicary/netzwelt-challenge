import { defineStore } from "pinia";
import {
  FlatTerritoryModel,
  TreeTerritoryModel,
} from "../models/territory-model";

interface TerritoryStoreState {
  rootTree: TreeTerritoryModel;
}

export const useTerritoryStore = defineStore("territory", {
  state: (): TerritoryStoreState => ({
    rootTree: {
      id: null,
      name: "Territories",
      children: {},
    },
  }),

  getters: {
    getTerritoryTree: (state) => state.rootTree,
  },

  actions: {
    addToTree(
      treeTerritory: TreeTerritoryModel,
      flatTerritory: FlatTerritoryModel
    ) {
      // add to tree if found and stop
      if (treeTerritory.id === flatTerritory.parent) {
        treeTerritory.children[flatTerritory.id] = {
          id: flatTerritory.id,
          name: flatTerritory.name,
          children: {},
        };
        return;
      }

      // continue with other children for no match
      Object.values(treeTerritory.children).forEach((childTerritory) =>
        this.addToTree(childTerritory, flatTerritory)
      );
    },

    async fetchTerritoryTree() {
      try {
        const response = await this.axiosAPI.get("/territories");
        const responseData: FlatTerritoryModel[] = response.data;
        responseData.forEach((flatTerritory) =>
          this.addToTree(this.rootTree, flatTerritory)
        );
      } catch (e) {
        console.error("Something went wrong while loading the territories");
      }
    },
  },
});
