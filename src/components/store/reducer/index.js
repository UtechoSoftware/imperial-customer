import { combineReducers } from 'redux';
import { userAuthSlice } from './userAuthSlice';
import {examSlice} from './examSlice';
export const rootReducer = combineReducers({
  adminData:userAuthSlice.reducer,
  examData:examSlice.reducer


});

