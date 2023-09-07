import { createSlice } from "@reduxjs/toolkit";

const initialSuggestState = {
  cards: [
    {
      teamId: null, //number
      memberNum: null, //number
      region: "", //string
      profileImageURL: "", //string
      mainImageURL: "", //string
      leader: {
        nickname: "", //string
        mbti: "", //string
        college: "", //string
      },
    },
  ],
};

const suggestSlice = createSlice({
  name: "suggestSlice",
  initialState: initialSuggestState,
  reducers: {
    setSuggestState: (state, action) => {
      state.cards = action.payload;
    },
    addCard: (state, action) => {
      state.cards.push(action.payload);
    },
  },
});

export default suggestSlice;
export const { setSuggestState, addCard } = suggestSlice.actions;
