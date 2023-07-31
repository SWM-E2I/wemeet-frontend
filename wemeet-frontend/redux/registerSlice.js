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
}; //회원가입시 필요한 필수정보 state

const registerSlice = createSlice({
  name: "registerSlice",
  initialState: initialRegisterState,
  reducers: {
    setRegisterPhoneNum: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setRegisterGender: (state, action) => {
      state.gender = action.payload;
    },
    setRegisterNickName: (state, action) => {
      state.nickname = action.payload;
    },
    setRegisterCollegeInfo: (state, action) => {
      state.collegeInfo = action.payload;
    },
    setRegisterMbti: (state, action) => {
      state.mbti = action.payload;
    },
  },
});

export default registerSlice;
export const {
  setRegisterPhoneNum,
  setRegisterGender,
  setRegisterNickName,
  setRegisterCollegeInfo,
  setRegisterMbti,
} = registerSlice.actions;
