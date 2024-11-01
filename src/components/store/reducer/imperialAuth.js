import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    isLogin_: false,
    saving: "",
    token: "",
    user: {},
  },
};

export const imperialAuthSlice = createSlice({
  name: "imperial",
  initialState: initialState,
  reducers: {
    setIsLogin_(state, action) {
      state.data.isLogin_ = action.payload;
    },
    setUserData(state, action) {
      state.data.user = action.payload;
    },
    setSaving(state, action) {
      state.data.saving = action.payload;
    },
  },
});

export const { setIsLogin_, setSaving, setUserData } = imperialAuthSlice.actions;

export default imperialAuthSlice.reducer;
