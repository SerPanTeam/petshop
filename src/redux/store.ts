import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/userSlice";
import slugsReduser from "@/redux/slugsSlice";
import cartReduser from "@/redux/cartSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    slugs: slugsReduser,
    cart: cartReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
