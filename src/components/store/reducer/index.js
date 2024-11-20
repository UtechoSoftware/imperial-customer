import { combineReducers } from 'redux';
import { examSlice } from './examSlice';
import { imperialAuthSlice } from './imperialAuth';
import { userAuthSlice } from './userAuthSlice';
export const rootReducer = combineReducers({
  adminData: userAuthSlice.reducer,
  examData: examSlice.reducer,
  data: imperialAuthSlice.reducer


});

