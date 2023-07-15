import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./registerSlice.js";

const store = configureStore({
  reducer: {
    register: registerSlice.reducer,
  },
});

export default store;
