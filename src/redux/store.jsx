import { configureStore } from "@reduxjs/toolkit";
import roleSlice from "./slice/roleSlice";
import userSlice from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    roles: roleSlice,
    users: userSlice,
  },
});

export default store;
