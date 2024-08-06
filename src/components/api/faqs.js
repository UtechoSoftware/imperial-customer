import axios from "axios";

// create blog-----
export const create_faq_category = async (data) => {
    try {
      const res = await axios.post(
        global.BASEURL + `api/faq_cat/create`,
        {
            name:data
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
  // del category-----
  export const del_cat = async (catId) => {
      try {
        const res = await axios.delete(
          global.BASEURL + `api/faq_cat/${catId}`,
         
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
    // get category-----
  export const get_cat = async (lastId,search) => {
    try {
      const res = await axios.get(
        global.BASEURL + `api/faq_cat/admin/all/${lastId}/${search}`,
       
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
  // delete faqs-----
  export const del_faq = async (faqId) => {
    try {
      const res = await axios.delete(
        global.BASEURL + `api/faq/${faqId}`,
       
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