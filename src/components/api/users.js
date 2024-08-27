import axios from "axios";

// update Users-----
export const updateUsers = async (data) => {
  try {
    const res = await axios.put(
      global.BASEURL + `api/users/update-user`,
      data,
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
