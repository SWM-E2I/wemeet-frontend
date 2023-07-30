import { createSlice } from "@reduxjs/toolkit";

const initialPreferState = {
  drinkingOption: "",
  sameCollegeState: "",
  isAvoidedFriends: false,
  preferenceMeetingTypeList: [],
  startPreferenceAdmissionYear: "",
  endPreferenceAdmissionYear: "",
  preferenceMbti: "",
};

const preferSlice = createSlice({
  name: "preferSlice",
  initialState: initialPreferState,
  reducers: {
    setDrinkingOption: (state, action) => {
      state.drinkingOption = action.payload;
    },
    setSameCollegeState: (state, action) => {
      state.sameCollegeState = action.payload;
    },
    setAvoidedFriends: (state, action) => {
      state.isAvoidedFriends = action.payload;
    },
    setPreferenceMeetingTypeList: (state, action) => {
      state.preferenceMeetingTypeList = action.payload;
    },
    setStartPreferenceAdmissionYear: (state, action) => {
      state.startPreferenceAdmissionYear = action.payload;
    },
    setEndPreferenceAdmissionYear: (state, action) => {
      state.endPreferenceAdmissionYear = action.payload;
    },
    setPreferenceMbti: (state, action) => {
      state.preferenceMbti = action.payload;
    },
  },
});
export default preferSlice;
export const {
  setDrinkingOption,
  setSameCollegeState,
  setAvoidedFriends,
  setPreferenceMeetingTypeList,
  setStartPreferenceAdmissionYear,
  setEndPreferenceAdmissionYear,
  setPreferenceMbti,
} = preferSlice.actions;
