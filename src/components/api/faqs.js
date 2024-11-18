import { axiosInstance } from "./axiosIntance";

// create blog-----
export const create_faq = async (data) => {
  try {
    const res = await axiosInstance.post(`api/users/admin/faq`,
      data,
    );
    return res;
  } catch (error) {
    console.log(error, "error");
  }
};
// del category-----
export const del_cat = async (catId) => {
  try {
    const res = await axiosInstance.delete(`api/faq_cat/${catId}`,

    );
    return res;
  } catch (error) {
    console.log(error, "error");
  }
};
// get category-----
export const get_cat = async (lastId, search) => {
  try {
    const res = await axiosInstance.get(`api/faq_cat/admin/all/${lastId}/${search}`,

    );
    return res;
  } catch (error) {
    console.log(error, "error");
  }
};
// delete faqs-----
export const del_faq = async (faqId) => {
  try {
    const res = await axiosInstance.delete(`api/faq/${faqId}`,

    );
    return res;
  } catch (error) {
    console.log(error, "error");
  }
};