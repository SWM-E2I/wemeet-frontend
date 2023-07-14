import { createSlice } from "@reduxjs/toolkit";

const initialRegisterState = {
  phone_number: "",
  basic_info: {
    nickname: "",
    gender: "",
    mbti: "",
    hobby: null,
    intro: null,
  },
  pref_info: {
    preference_meeting_type: null, //meeting type : 객체 형태로 전달
    start_preference_admission_year: "",
    end_preference_admission_year: "",
    same_college_state: null,
    drinking_option: null,
    e_or_i: null,
    s_or_n: null,
    t_or_f: null,
    j_or_p: null,
  },
  univ_info: { college: "", major: "", admission_year: "" },
}; //회원가입시 필요한 필수정보 state
// const initialRegisterState = // RequestBody Data
// {
// 	"nickname" : String,
// 	"gender" : String, // "MALE" or "FEMALE"
// 	"phoneNumber": String, // "+8210********"
// 	"collegeInfo": {
// 		"college": String,
// 		"collegeType": String,
// 		"admissionYear" : String
// 	},
// 	"preference" : {
// 		"startPreferenceAdmissionYear": String,
// 		"endPreferenceAdmissionYear" : String,
// 		"sameCollegeState" : String,
// 		"drinkingOption": String,
// 		"isAvoidedFriends" : Boolean,
// 		"preferenceMbti": String
// 	},
// 	"preferenceMeetingTypeList" : String[],
// 	"mbti": String,
// 	"introduction" : String, // nullable
// 	"memberInterestList" : String[] // nullable
// }

const registerSlice = createSlice({
  name: "registerSlice",
  initialState: initialRegisterState,
  reducers: {
    setPhoneNum: (state, action) => {
      state.phone_number = action.payload;
    },
    setBasicInfo: (state, action) => {
      state.basic_info = action.payload;
    },
    setPrefInfo: (state, action) => {
      state.pref_info = action.payload;
    },
    setUnivInfo: (state, action) => {
      state.univ_info = action.payload;
    },
  },
});

export default registerSlice;
export const { setPhoneNum, setBasicInfo, setPrefInfo, setUnivInfo } =
  registerSlice.actions;