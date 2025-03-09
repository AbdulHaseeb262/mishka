import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: true,
  error: null,

  // Initialize auth state by checking local storage and fetching user info if available
  initAuth: async () => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        set({ user: null, token: null, isLoading: false });
        return;
      }
      // Optionally call /api/auth/me to verify token and get user details
      const res = await fetch("/api/auth/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch user details");
      }
      const data = await res.json();
      set({ user: data.user, token, isLoading: false });
    } catch (error) {
      localStorage.removeItem("token");
      set({ user: null, token: null, error: error.message, isLoading: false });
    }
  },

  // Sign in by calling the login API
  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to login");
      }
      // Save the token to local storage and update the state
      localStorage.setItem("token", data.token);
      // If your API returns user details along with the token, use data.user
      set({ user: data.user || null, token: data.token, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Sign up by calling the register API
  signUp: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to register");
      }
      localStorage.setItem("token", data.token);
      set({ user: data.user || null, token: data.token, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Log out by clearing local storage and resetting state
  logOut: async () => {
    set({ isLoading: true, error: null });
    try {
      // Optionally call an API endpoint to log out if necessary.
      localStorage.removeItem("token");
      set({ user: null, token: null, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

// Optionally, you can initialize auth state when your app loads.
// For example, in your root component or a layout component, call:
// useAuthStore.getState().initAuth();
