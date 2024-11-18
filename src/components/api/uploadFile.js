import { axiosInstance } from "./axiosIntance";

export const uploadAndGetUrl = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file); // Directly append the file object

    const res = await axiosInstance.post(
      `api/image/upload`,
      formData,
    );

    return res?.data?.image;
  } catch (err) {
    console.log("=======er", err.response.data);
    return null;
  }
};