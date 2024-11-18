import { message } from "antd";
import { axiosInstance } from "./axiosIntance";
// create exams
export const register = async (data) => {
  try {
    const res = await axiosInstance.post(`api/users/signup`, data);
    return res;
  } catch (error) {
    console.log(error, "error");
  }
};
// login---------------
export const login = async (data) => {
  try {
    const res = await axiosInstance.post(`api/auth`, data);
    return res;
  } catch (error) {
    message.error(error.response.data.message)
  }
};

// check email--------------
export const checkEmail = async (data) => {
  try {
    const res = await axiosInstance.post(`api/users/check-email`, data);
    return res;
  } catch (error) {
    console.log(error, "error");
  }
};

// change password-----------
export const changePassword = async (data) => {
  try {
    const res = await axiosInstance.put(`api/users/change-password`, data);
    return res;
  } catch (error) {
    console.log(error, "error");
    message.error(error.response.data.message)
  }
};