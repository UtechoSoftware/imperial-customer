import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    exam: null,
    createxam_:[],
};

export const examSlice = createSlice({
  name: "q-med_admin",
  initialState: initialState,
  reducers: {
 
    getExams_(state, action) {
      state.exam = action.payload;
    },
    createExam_(state, action) {
        console.log(state.exam,"dd")
        state.createxam_.push(action.payload);
      },
  },
});

export const { getExams_, createExam_ } = examSlice.actions;

export default examSlice.reducer;
