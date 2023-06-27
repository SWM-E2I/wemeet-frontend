import { createSlice } from "@reduxjs/toolkit";

const initialRegisterState = {
  basic_info: { phone_number: "", nickname: "", gender: "", mbti: "" },
  pref_info: {
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

const registerSlice = createSlice({
  name: "registerSlice",
  initialState: initialRegisterState,
  reducers: {
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
export const { setBasicInfo, setPrefInfo, setUnivInfo } = registerSlice.actions;
