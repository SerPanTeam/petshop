// src/store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  name: string;
  phone: string;
  email: string;
  kupon: boolean;
  loggedIn: boolean;
};

const initialState: UserState = {
  name: "",
  phone: "",
  email: "",
  kupon: false,
  loggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserState>) {
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.email = action.payload.email;
      state.kupon = action.payload.kupon;
      state.loggedIn = true;
    },
    logout(state) {
      state.name = "";
      state.loggedIn = false;
    },
    closeKupon(state) {
      state.kupon = false;
    },
  },
});

export const { login, logout, closeKupon } = userSlice.actions;
export default userSlice.reducer;
