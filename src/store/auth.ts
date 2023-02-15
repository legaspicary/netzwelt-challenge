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
      const errors: string[] = [];

      try {
        const response = await this.axiosAPI.post("/login", {
          username,
          password,
        });

        this.user = response.data;

        localStorage.setItem("user", JSON.stringify(this.user));
      } catch (e: any) {
        const { status } = e.response;
        if (status === 404) {
          errors.push("Username/password is invalid");
        } else {
          errors.push("Something went wrong with the server");
        }
      }
      return errors;
    },

    async logout() {
      this.user = null;
      localStorage.removeItem("user");
    },
  },
});
