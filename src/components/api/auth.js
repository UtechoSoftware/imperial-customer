import { message } from "antd";
import axios from "axios";
// create exams
export const register = async (data) => {
  try {
    const res = await axios.post(global.BASEURL + `api/users/signup`, data, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": global.TOKEN,
      },
    });
    return res;
  } catch (error) {
    console.log(error, "error");
  }
};
// login---------------
export const login = async (data) => {
    try {
      const res = await axios.post(global.BASEURL + `api/auth`, data, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": global.TOKEN,
        },
      });
      return res;
    } catch (error) {
      message.error(error.response.data.message)
    }
  };
// check email--------------
export const checkEmail = async (data) => {
    try {
      const res = await axios.post(global.BASEURL + `api/users/check-email`, data, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": global.TOKEN,
        },
      });
      return res;
    } catch (error) {
      console.log(error, "error");
    }
  };
  // change password-----------
  export const changePassword = async (data) => {
    try {
      const res = await axios.put(global.BASEURL + `api/users/change-password`, data, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": global.TOKEN,
        },
      });
      return res;
    } catch (error) {
      console.log(error, "error");
      message.error(error.response.data.message)
    }
  };