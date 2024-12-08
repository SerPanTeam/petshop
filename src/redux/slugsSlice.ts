import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Slug = {
  id: number;
  slug: string;
};

type SlugsState = {
  slugs: Slug[];
};

const initialState: SlugsState = {
  slugs: [],
};

const slugsSlice = createSlice({
  name: "slugs",
  initialState,
  reducers: {
    addSlug(state, action: PayloadAction<Slug>) {
      if (!state.slugs.some((slug) => slug.id === action.payload.id))
          state.slugs.push(action.payload);
    },
  },
});

export const { addSlug } = slugsSlice.actions;
export default slugsSlice.reducer;
