import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminData: {
    isLogin:false,
    token: "",
    user: {},
  },
};

export const userAuthSlice = createSlice({
  name: "q-med_admin",
  initialState: initialState,
  reducers: {
    getToken(state, action) {
      state.adminData.token = action.payload;
    },
    getUser(state, action) {
      state.adminData.user = action.payload;
    },
    setIsLogin(state,action){
      state.adminData.isLogin=action.payload
    }
  },
});

export const { getToken, getUser ,setIsLogin} = userAuthSlice.actions;

export default userAuthSlice.reducer;
