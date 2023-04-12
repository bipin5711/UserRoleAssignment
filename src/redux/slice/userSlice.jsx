import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      return [...state, action.payload];
    },
    deleteUser: (state, action) => {
      const index = action.payload;
      state.splice(index, 1);
      return state;
    },
    updateUser: (state, action) => {
      const { data, index } = action.payload;
      state[index].name = data.name;
      state[index].email = data.email;
      state[index].username = data.username;
      state[index].password = data.password;
      state[index].mobile = data.mobile;
      state[index].roleKey = data.roleKey;
      return state;
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
