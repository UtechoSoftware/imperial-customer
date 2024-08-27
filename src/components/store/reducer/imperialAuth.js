import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    isLogin_:false,
    token: "",
    user: {},
  },
};

export const imperialAuthSlice = createSlice({
  name: "imperial",
  initialState: initialState,
  reducers: {
    setIsLogin_(state,action){
      state.data.isLogin_=action.payload
    }
  },
});

export const { setIsLogin_} = imperialAuthSlice.actions;

export default imperialAuthSlice.reducer;
