import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Slug = {
  id: number;
  slug: string;
  title: string;
  catId: number;
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
      if (!state.slugs.some((slug) => slug.slug === action.payload.slug))
        state.slugs.push(action.payload);
    },
    addSlugs(state, action: PayloadAction<Slug[]>) {
      //if (!state.slugs.some((slug) => slug.slug === action.payload.slug))
      state.slugs = action.payload;
    },
  },
});

export const { addSlug, addSlugs } = slugsSlice.actions;
export default slugsSlice.reducer;
