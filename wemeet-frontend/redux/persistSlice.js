import { createSlice } from "@reduxjs/toolkit";

const initialPersistState = {
  nickname: "", //string
  emailAuthenticated: false, //boolean
  preferenceCompleted: false, //boolean
  hasMainProfileImage: false, //boolean
  profileImageAuthenticated: false, //boolean
  hasTeam: false, //boolean
};

const persistSlice = createSlice({
  name: "persistSlice",
  initialState: initialPersistState,
  reducers: {
    setPersistState: (state, action) => {
      state = action.payload;
    },
    setPreferenceCompleted: (state, action) => {
      state.preferenceCompleted = action.payload;
    },
    setHasMainProfileImage: (state, action) => {
      state.hasMainProfileImage = action.payload;
    },
  },
});

export default persistSlice;
export const {
  setPersistState,
  setPreferenceCompleted,
  setHasMainProfileImage,
} = persistSlice.actions;
