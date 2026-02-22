import { create } from "zustand";
import { useUserStore } from "./user.store";
import type { AuthStore } from "../types/auth.types";

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  currentUserId: null,
  authError: null,
  login: ({ username, password }) => {
    const user = useUserStore.getState().findUserByCredentials(username, password);

    if (!user) {
      set({
        isAuthenticated: false,
        currentUserId: null,
        authError: "Invalid username or password.",
      });
      return null;
    }

    set({
      isAuthenticated: true,
      currentUserId: user.id,
      authError: null,
    });
    return user;
  },
  logout: () => {
    set({
      isAuthenticated: false,
      currentUserId: null,
      authError: null,
    });
  },
  clearAuthError: () => {
    set({ authError: null });
  },
}));
