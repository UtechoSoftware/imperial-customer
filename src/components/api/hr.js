import { axiosInstance } from "./axiosIntance";
// create hr ------------------
export const create_hr = async (data) => {
  try {
    const res = await axiosInstance.post(`api/hr/create`, data);
    return res;
  } catch (error) {
  }
};

// update hr --------------
export const update_hr = async (data, id) => {
  try {
    const res = await axiosInstance.put(`api/hr/edit/${id}`, data);
    return res;
  } catch (error) {
  }
};

// get all hrs --------------
export const get_hr = async (type, page) => {
  try {
    const res = await axiosInstance.get(`api/hr/me/${type}/${page}`);
    return res;
  } catch (error) {
  }
};

// get all hrs
// get all hrs --------------
export const del_hr = async (type) => {
  try {
    const res = await axiosInstance.delete(`api/hr/all/${type}`);
    return res;
  } catch (error) {
  }
};
export const del_hr_by_id = async (id) => {
  try {
    const res = await axiosInstance.delete(`api/hr/${id}/`);
    return res;
  } catch (error) {
    // console.log(error, "error");
  }
};
// api/hr/all/type ----> delete req
// calculate potential saving against type-----------
export const getPotential = async (type) => {
  try {
    const res = await axiosInstance.get(`api/hr/saving/${type}`);
    return res;
  } catch (error) {
    // console.log(error, "error");
  }
};
