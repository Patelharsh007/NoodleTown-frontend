import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/ToastContainer";
import { AuthItem } from "../../types/type";

interface AuthState {
  authUser: AuthItem;
}

const loadAuthFromLocalStorage = (): AuthState => {
  const storedAuth = localStorage.getItem("auth");
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  if (storedAuth) {
    const authenticatedUser = users.find(
      (user: AuthItem) => user.email === JSON.parse(storedAuth).email
    );
    if (authenticatedUser) {
      return { authUser: authenticatedUser };
    }
  }

  return {
    authUser: { isAuthenticated: false, email: "", fullName: "", password: "" },
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadAuthFromLocalStorage(),
  reducers: {
    signUp: (
      state,
      action: PayloadAction<{
        email: string;
        fullName?: string;
        password: string;
      }>
    ) => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const newUser = { ...action.payload, isAuthenticated: false };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      showSuccessToast("Account created successfully.");
    },

    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (user: AuthItem) =>
          user.email === action.payload.email &&
          user.password === action.payload.password
      );

      if (user) {
        user.isAuthenticated = true;
        localStorage.setItem("auth", JSON.stringify(user));
        localStorage.setItem("users", JSON.stringify(users));

        state.authUser = user;
        showSuccessToast("User successfully logged in.");
      } else {
        showErrorToast("Invalid email or password.");
      }
    },

    logout: (state) => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((user: AuthItem) =>
        user.email === state.authUser.email
          ? { ...user, isAuthenticated: false }
          : user
      );
      localStorage.removeItem("auth");
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      state.authUser = {
        isAuthenticated: false,
        email: "",
        fullName: "",
        password: "",
      };

      showSuccessToast("User successfully logged out.");
    },
  },
});

export const { signUp, login, logout } = authSlice.actions;
export default authSlice.reducer;
