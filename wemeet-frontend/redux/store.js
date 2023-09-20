import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./registerSlice.js";
import persistSlice from "./persistSlice.js";
import preferSlice from "./preferSlice.js";
import profileSlice from "./profileSlice.js";
import teamGenerateSlice from "./teamGenerateSlice.js";
import suggestSlice from "./suggestSlice.js";
import signalSlice from "./signalSlice.js";

const store = configureStore({
  reducer: {
    register: registerSlice.reducer,
    persist: persistSlice.reducer,
    prefer: preferSlice.reducer,
    profile: profileSlice.reducer,
    teamGenerate: teamGenerateSlice.reducer,
    suggest: suggestSlice.reducer,
    signal: signalSlice.reducer,
  },
});

export default store;
