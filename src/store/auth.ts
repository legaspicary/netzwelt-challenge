// Utilities
import { defineStore } from "pinia";
import { UserModel } from "../models/user-model";

interface AuthStoreState {
  user: UserModel | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthStoreState => ({
    user: null,
  }),

  getters: {
    getUser: (state) => state.user,
  },

  actions: {
    isAuthenticated() {
      if (!!this.user?.displayName && !!this.user?.username) {
        return true;
      }

      const userJsonString = localStorage.getItem("user");
      if (userJsonString === null) {
        return false;
      }

      this.user = JSON.parse(userJsonString);
      if (!this.user?.displayName || !this.user?.username) {
        return false;
      }

      return true;
    },

    async login(username: string, password: string) {
      // do login
      this.user = {
        username: "foo",
        displayName: "Foo Bar Foo",
        roles: ["basic-user"],
      };

      localStorage.setItem("user", JSON.stringify(this.user));
    },

    async logout() {
      this.user = null;
      localStorage.removeItem("user");
    },
  },
});
