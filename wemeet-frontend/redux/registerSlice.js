import { createSlice } from "@reduxjs/toolkit";

const initialRegisterState = {
  nickname: "",
  gender: "",
  phoneNumber: "",
  collegeInfo: {
    college: "",
    collegeType: "",
    admissionYear: "",
  },
  mbti: "",
  introduction: null,
  memberInterestList: null,
}; //회원가입시 필요한 필수정보 state

const registerSlice = createSlice({
  name: "registerSlice",
  initialState: initialRegisterState,
  reducers: {
    setPhoneNum: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setNickName: (state, action) => {
      state.nickname = action.payload;
    },
    setCollegeInfo: (state, action) => {
      state.collegeInfo = action.payload;
    },
    setMbti: (state, action) => {
      state.mbti = action.payload;
    },
    setIntroduction: (state, action) => {
      state.introduction = action.payload;
    },
    setMemberInterestList: (state, action) => {
      state.memberInterestList = action.payload;
    },
  },
});

export default registerSlice;
export const {
  setPhoneNum,
  setGender,
  setNickName,
  setCollegeInfo,
  setMbti,
  setIntroduction,
  setMemberInterestList,
} = registerSlice.actions;
