import axios from "axios";

export const uploadAndGetUrl = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file); // Directly append the file object

    const res = await axios.post(
      `https://api.tideandtidy.co.uk/api/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": global.TOKEN,
        },
      }
    );

    return res?.data?.image;
  } catch (err) {
    console.log("=======er", err.response.data);
    return null;
  }
};
