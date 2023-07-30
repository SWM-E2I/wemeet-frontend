import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./registerSlice.js";
import persistSlice from "./persistSlice.js";
import preferSlice from "./preferSlice.js";

const store = configureStore({
  reducer: {
    register: registerSlice.reducer,
    persist: persistSlice.reducer,
    prefer: preferSlice.reducer,
  },
});

export default store;
