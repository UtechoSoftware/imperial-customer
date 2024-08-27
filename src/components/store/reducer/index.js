import { combineReducers } from 'redux';
import { userAuthSlice } from './userAuthSlice';
import {examSlice} from './examSlice';
import imperialAuth, { imperialAuthSlice } from './imperialAuth';
export const rootReducer = combineReducers({
  adminData:userAuthSlice.reducer,
  examData:examSlice.reducer,
 data: imperialAuthSlice.reducer


});

