import axios from "axios";
// get help-----
export const getHelp = async (lastId,search='') => {
    try {
      const res = await axios.get(
        global.BASEURL + `api/help/admin/${lastId}/${search}`,
    
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": global.TOKEN,
          },
        }
      );
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
        {

        },
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