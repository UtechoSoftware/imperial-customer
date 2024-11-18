import { axiosInstance } from "./axiosIntance";
// post help-----
export const post_help = async (data) => {
  try {
    const res = await axiosInstance.post(`api/help/create`, data);
    return res?.data;
  } catch (error) {
    console.log(error, "error");
  }
};
// update help-----
export const updateHelp = async (id) => {
  try {
    const res = await axiosInstance.put(
      `api/help/attended/${id}`,
      {},);
    return res;
  } catch (error) {
    console.log(error, "error");
  }
};
