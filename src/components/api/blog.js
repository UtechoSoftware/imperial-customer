import axios from "axios";

// create blog-----
export const create_blog = async (data) => {
    try {
      const res = await axios.post(
        global.BASEURL + `api/blog/create`,
        {
            data
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
  // get blog-----
  export const get_blog = async (lastId) => {
      try {
        const res = await axios.get(
          global.BASEURL + `api/blog/admin/${lastId}`,
         
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