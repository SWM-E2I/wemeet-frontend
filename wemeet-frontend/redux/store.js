import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./registerSlice.js";
import persistSlice from "./persistSlice.js";

const store = configureStore({
  reducer: {
    register: registerSlice.reducer,
    persist: persistSlice.reducer,
  },
});

export default store;
