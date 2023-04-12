import { createSlice } from "@reduxjs/toolkit";

export const roleSlice = createSlice({
  name: "roles",
  initialState: [],
  reducers: {
    addRole: (state, action) => {
      return [...state, action.payload];
    },
    deleteRole: (state, action) => {
      const index = action.payload;
      state.splice(index, 1);
      return state;
    },
    updateRole: (state, action) => {
      const { data, index } = action.payload;
      state[index].roleLabel = data.roleLabel;
      state[index].roleKey = data.roleKey;
      return state;
    },
  },
});

export const { addRole, updateRole, deleteRole } = roleSlice.actions;

export default roleSlice.reducer;
