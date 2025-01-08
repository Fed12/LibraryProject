import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state type for error messages
const initialState: string = ""; // Store the error message

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      return action.payload; // Returns new state with the error message
    },
    clearError: () => {
      return initialState; // Clears the error message
    },
  },
});

// Export the actions
export const { setError, clearError } = errorSlice.actions;

// Selector to get the error message from the state
export const selectErrorMessage = (state: { error: string }) => state.error;

// Export the reducer
export default errorSlice.reducer;
