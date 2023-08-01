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
      state.nickname = action.payload.nickname;
      state.emailAuthenticated = action.payload.emailAuthenticated;
      state.preferenceCompleted = action.payload.preferenceCompleted;
      state.hasMainProfileImage = action.payload.hasMainProfileImage;
      state.profileImageAuthenticated =
        action.payload.profileImageAuthenticated;
      state.hasTeam = action.payload.hasTeam;
    },
    setEmailAuthenticated: (state, action) => {
      state.emailAuthenticated = action.payload;
    },
    setHasMainProfileImage: (state, action) => {
      state.hasMainProfileImage = action.payload;
    },
  },
});

export default persistSlice;
export const {
  setPersistState,
  setEmailAuthenticated,
  setHasMainProfileImage,
} = persistSlice.actions;
