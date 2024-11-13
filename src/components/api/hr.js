import { message } from "antd";
import axios from "axios";
// create hr ------------------
export const create_hr = async (data) => {
  try {
    const res = await axios.post(global.BASEURL + `api/hr/create`, data, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": global.TOKEN,
      },
    });
    return res;
  } catch (error) {
  }
};
// update hr --------------
export const update_hr = async (data, id) => {
  try {
    const res = await axios.put(global.BASEURL + `api/hr/edit/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": global.TOKEN,
      },
    });
    return res;
  } catch (error) {
  }
};
// get all hrs --------------
export const get_hr = async (type) => {
  try {
    const res = await axios.get(global.BASEURL + `api/hr/me/${type}/1`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": global.TOKEN,
      },
    });
    return res;
  } catch (error) {
  }
};
// get all hrs --------------
export const del_hr = async (type) => {
  try {
    const res = await axios.delete(global.BASEURL + `api/hr/all/${type}/`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": global.TOKEN,
      },
    });
    return res;
  } catch (error) {
  }
};
export const del_hr_by_id = async (id) => {
  try {
    const res = await axios.delete(global.BASEURL + `api/hr/${id}/`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": global.TOKEN,
      },
    });
    return res;
  } catch (error) {
    // console.log(error, "error");
  }
};
// api/hr/all/type ----> delete req
// calculate potential saving against type-----------
export const getPotential = async (type) => {
  try {
    const res = await axios.get(global.BASEURL + `api/hr/saving/${type}`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": global.TOKEN,
      },
    });
    return res;
  } catch (error) {
    // console.log(error, "error");
  }
};
