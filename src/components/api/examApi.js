import axios from "axios";
// create exams
export const createExam = async (data) => {
  try {
    const res = await axios.post(global.BASEURL + `api/exam/create`, data, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": global.TOKEN,
      },
    });
    return res;
  } catch (error) {
    console.log(error, "error");
  }
};
// get exams----------
export const getExams = async (lastId, search="") => {
  try {
    const res = await axios.get(
     `${global.BASEURL}api/exam/admin/0/all/alluser/${lastId}/${search}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("imperial_token"),
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error, "error");
  }
};
// get exams----------
export const del_Exams = async (id) => {
  try {
    const res = await axios.delete(global.BASEURL + `api/exam/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("imperial_token"),
      },
    });
    return res;
  } catch (error) {
    console.log(error, "error");
  }
};
// get exams----------
export const getGeneralExams = async (lastId) => {
  try {
    const res = await axios.get(global.BASEURL + `api/general/details/`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": global.TOKEN,
      },
    });
    return res;
  } catch (error) {
    console.log(error, "error");
  }
};
// update general exams----------
export const updateGeneralExams = async (data) => {
  try {
    const res = await axios.post(global.BASEURL + `api/general/create`, data, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": global.TOKEN,
      },
    });
    return res;
  } catch (error) {
    console.log(error, "error");
  }
};
// update exams----------
export const updateExams = async (data, exId) => {
  try {
    const res = await axios.post(
      global.BASEURL + `api/exam/edit/${exId}`,
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
