import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/userSlice";
import slugsReduser from "@/redux/slugsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    slugs: slugsReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
