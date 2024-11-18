import { axiosInstance } from "./axiosIntance";

// update Users-----
export const updateUsers = async (data) => {
  try {
    const res = await axiosInstance.put(`api/users/update-user`,
      data,);
    return res;
  } catch (error) {
    console.log(error, "error");
  }
};