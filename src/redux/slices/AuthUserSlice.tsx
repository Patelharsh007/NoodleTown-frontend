import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthUserItem } from "../../types/type";

interface AuthState {
  authUser: AuthUserItem;
}

const loadAuthUserFromLocalStorage = (): AuthUserItem => {
  const storedUser = localStorage.getItem("authUser");
  if (storedUser) {
    return JSON.parse(storedUser);
  } else {
    return {
      id: 0,
      userName: "",
      email: "",
      profileImage: "",
      isAuthenticated: false,
    };
  }
};

const initialState: AuthState = {
  authUser: loadAuthUserFromLocalStorage(),
};

const authUserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        id: number;
        email: string;
        userName: string;
        profileImage: string;
      }>
    ) => {
      state.authUser = {
        id: action.payload.id,
        userName: action.payload.userName,
        email: action.payload.email,
        profileImage: action.payload.profileImage,
        isAuthenticated: true,
      };

      localStorage.setItem("authUser", JSON.stringify(state.authUser));
    },
    clearUser: (state) => {
      state.authUser = {
        id: 0,
        userName: "",
        email: "",
        profileImage: "",
        isAuthenticated: false,
      };

      localStorage.removeItem("authUser");
    },
  },
});

export const { setUser, clearUser } = authUserSlice.actions;
export default authUserSlice.reducer;
