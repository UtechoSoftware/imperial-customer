import { axiosInstance } from "./axiosIntance";
// create exams
export const createExam = async (data) => {
  try {
    const res = await axiosInstance.post(`api/exam/create`, data);
    return res;
  } catch (error) {
    console.log(error, "error");
  }
};
// get exams----------
export const getExams = async (lastId, search = "") => {
  try {
    const res = await axiosInstance.get(
      `api/exam/admin/0/all/alluser/${lastId}/${search}`);
    return res;
  } catch (error) {
    console.log(error, "error");
  }
};
// get exams----------
export const del_Exams = async (id) => {
  try {
    const res = await axiosInstance.delete(`api/exam/${id}`);
    return res;
  } catch (error) {
    console.log(error, "error");
  }
};
// get exams----------
export const getGeneralExams = async (lastId) => {
  try {
    const res = await axiosInstance.get(`api/general/details/`);
    return res;
  } catch (error) {
    console.log(error, "error");
  }
};
// update general exams----------
export const updateGeneralExams = async (data) => {
  try {
    const res = await axiosInstance.post(`api/general/create`, data);
    return res;
  } catch (error) {
    console.log(error, "error");
  }
};
// update exams----------
export const updateExams = async (data, exId) => {
  try {
    const res = await axiosInstance.post(
      `api/exam/edit/${exId}`,
      data,
    );
    return res;
  } catch (error) {
    console.log(error, "error");
  }
};
