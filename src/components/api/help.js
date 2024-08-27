import axios from "axios";
// post help-----
export const post_help = async (data) => {
  try {
    const res = await axios.post(global.BASEURL + `api/help/create`, data, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": global.TOKEN,
      },
    });
    return res?.data;
  } catch (error) {
    console.log(error, "error");
  }
};
// update help-----
export const updateHelp = async (id) => {
  try {
    const res = await axios.put(
      global.BASEURL + `api/help/attended/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": global.TOKEN,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error, "error");
  }
};
