import { createSlice } from "@reduxjs/toolkit";

const signalSlice = createSlice({
  name: "signalSlice",
  initialState: { signal: "-" },
  reducers: {
    setSignal: (state, action) => {
      state.signal = action.payload;
    },
  },
});

export default signalSlice;

export const { setSignal } = signalSlice.actions;
