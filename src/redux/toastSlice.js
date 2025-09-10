import { createSlice } from "@reduxjs/toolkit";

export const toastSlice = createSlice({
  name: "toast",
  initialState: [],
  reducers: {
    addToast: (state, action) => {
      if (action.payload.success) {
        state.push({
          id: Date.now() + Math.random(),
          message: action.payload.message,
          status: "success",
        });
      } else {
        state.push({
          id: Date.now() + Math.random(),
          message: Array.isArray(action.payload.message)
            ? action.payload.message.join("\n")
            : action.payload.message,
          status: "error",
        });
      }
    },
    removeToast: (state, action) => {
      return state.filter((toast) => toast.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
