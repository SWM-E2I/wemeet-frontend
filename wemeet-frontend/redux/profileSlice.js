import { createSlice } from "@reduxjs/toolkit";

const initialProfileState = {
  profileData: {
    profileImage: {
      basicUrl: null,
      lowUrl: null,
    },
    nickname: "-",
    admissionYear: "-",
    college: "-",
    collegeType: "-",
    gender: "WOMAN",
    mbti: "-",
  },
  update: false,
};

const profileSlice = createSlice({
  name: "profileSlice",
  initialState: initialProfileState,
  reducers: {
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
    setUpdate: (state, action) => {
      state.update = !state.update;
    },
  },
});

export default profileSlice;

export const { setProfileData, setUpdate } = profileSlice.actions;
