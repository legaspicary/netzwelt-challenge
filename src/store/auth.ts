// Utilities
import { defineStore } from "pinia";

interface AuthStoreState {}

export const authStore = defineStore("auth", {
  state: (): AuthStoreState => ({
    //
  }),
});
