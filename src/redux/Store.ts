import { configureStore } from "@reduxjs/toolkit";
import AuthUserSlice from "./slices/AuthUserSlice";

const Store = configureStore({
  reducer: {
    authUser: AuthUserSlice,
  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
