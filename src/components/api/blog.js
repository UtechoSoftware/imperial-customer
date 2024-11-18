import { axiosInstance } from "./axiosIntance";

// create blog-----
export const create_blog = async (data) => {
  try {
    const res = await axiosInstance.post(
      `api/blog/create`,
      {
        data
      },
    );
    return res;
  } catch (error) {
    console.log(error, "error");
  }
};

// get blog-----
export const get_blog = async (lastId) => {
  try {
    const res = await axiosInstance.get(
      `api/blog/admin/${lastId}`,
    );
    return res;
  } catch (error) {
    console.log(error, "error");
  }
};