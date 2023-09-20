import { createSlice } from "@reduxjs/toolkit";

const initialSuggestState = {
  cards: [
    {
      end: true,
      teamId: -2,
    },
  ],
};

const suggestSlice = createSlice({
  name: "suggestSlice",
  initialState: initialSuggestState,
  reducers: {
    setSuggestState: (state, action) => {
      state.cards = [...action.payload, { end: true, teamId: -1 }];
    },
    addCard: (state, action) => {
      state.cards.push(action.payload);
    },
  },
});

export default suggestSlice;
export const { setSuggestState, addCard } = suggestSlice.actions;
