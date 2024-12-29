import { createSlice } from "@reduxjs/toolkit";

const initialState = ""; //store the err msg

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action) => {
      return action.payload; //returns new state
    },
    clearError: () => {
      return initialState;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export const selectErrorMessage = (state) => state.error;
export default errorSlice.reducer;
