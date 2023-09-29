import { createSlice } from "@reduxjs/toolkit";
const initialTeamState = {
  data: {
    region: "HONGDAE", // HONGDAE, GANGNAM, SINCHON, GUNDAE 중 하나
    drinkRate: "ZERO", // ZERO, LOW, MIDDLE, HIGH
    drinkWithGame: "ANY", // ANY, MASTER, BEGINNER, HATER 중 하나
    additionalActivity: null, // nullable // SHOW, SPORTS, UNIQUE_EXPERIENCE, OUTDOOR_ACTIVITY, CAFE 중 하나
    introduction: "", // 150 제한
    members: [
      // 사이즈 최소 1, 최대 3
      // {
      //   collegeInfo: {
      //     collegeCode: "", // College CODE 값을 전달 ex) CE-001
      //     collegeType: "", // ETC, SOCIAL, ENGINEERING, ARTS, EDUCATION, MEDICINE 중 하나
      //     admissionYear: "",
      //   },
      //   mbti: "", // 잘 모를 경우 "XXXX"
      // },
    ],
    chatLink: "", //임시!!
  },
  images: [],
};
const teamGenerateSlice = createSlice({
  name: "teamGenerateSlice",
  initialState: initialTeamState,
  reducers: {
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setRegion: (state, action) => {
      state.data.region = action.payload;
    },
    addMember: (state, action) => {
      state.data.members.push(action.payload);
    },
    delMember: (state, action) => {
      state.data.members.splice(action.payload, 1);
    },
    setMembers: (state, action) => {
      state.data.members = action.payload;
    },
    setDrinkRate: (state, action) => {
      state.data.drinkRate = action.payload;
    },
    setDrinkWithGame: (state, action) => {
      state.data.drinkWithGame = action.payload;
    },
    setAdditionalActivity: (state, action) => {
      state.data.additionalActivity = action.payload;
    },
    setIntroduction: (state, action) => {
      state.data.introduction = action.payload;
    },
    setChatLink: (state, action) => {
      state.data.chatLink = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    resetState: (state, action) => {
      state.data = {
        region: "HONGDAE", // HONGDAE, GANGNAM, SINCHON, GUNDAE 중 하나
        drinkRate: "", // ZERO, LOW, MIDDLE, HIGH
        drinkWithGame: "", // ANY, MASTER, BEGINNER, HATER 중 하나
        additionalActivity: null, // nullable // SHOW, SPORTS, UNIQUE_EXPERIENCE, OUTDOOR_ACTIVITY, CAFE 중 하나
        introduction: "", // 150 제한
        members: [],
        chatLink: "", //임시!!
      };
      state.images = [];
    },
  },
});
export default teamGenerateSlice;
export const {
  setImages,
  setRegion,
  setMembers,
  setDrinkRate,
  setDrinkWithGame,
  setAdditionalActivity,
  setIntroduction,
  setChatLink,
  addMember,
  delMember,
  setData,
  resetState,
} = teamGenerateSlice.actions;
