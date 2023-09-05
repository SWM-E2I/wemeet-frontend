import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./registerSlice.js";
import persistSlice from "./persistSlice.js";
import preferSlice from "./preferSlice.js";
import profileSlice from "./profileSlice.js";
import teamGenerateSlice from "./teamGenerateSlice.js";

const store = configureStore({
  reducer: {
    register: registerSlice.reducer,
    persist: persistSlice.reducer,
    prefer: preferSlice.reducer,
    profile: profileSlice.reducer,
    teamGenerate: teamGenerateSlice.reducer,
  },
});

export default store;
