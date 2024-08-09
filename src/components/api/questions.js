import axios from "axios";
// create Questions
export const createQuestions = async (data) => {
  try {
    const res = await axios.post(
      global.BASEURL + `api/questions/create/`,
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
// get Questions
export const getQuestions = async (page = "1", search = "") => {
  try {
    const res = await axios.get(
      global.BASEURL + `api/questions/uploaded/${page}/${search}`,
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
// get Questions by Id
export const getQuestionsById = async (id) => {
  try {
    const res = await axios.get(global.BASEURL + `api/questions/exam/${id}/`, {
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

// alot questions-----
export const alotQuestions = async (examId, questionId) => {
  try {
    const res = await axios.put(
      global.BASEURL + `api/questions/addQuestion/${questionId}/${examId}`,
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
// edit question-------------
export const editQuestion = async (data, questionId) => {
  console.log(questionId, "inside api ");
  try {
    const res = await axios.put(
      global.BASEURL + `api/questions/edit/${questionId}`,
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
// edit question-------------
export const editQuestion_ = async (data, questionId) => {
  console.log(questionId, "inside api ");
  try {
    const res = await axios.put(
      global.BASEURL + `api/exam/search/1/0/all/${questionId}`,
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
// get Specific Question---------
export const getSpecificQuestion = async (questionId) => {
  try {
    const res = await axios.get(
      global.BASEURL + `api/questions/single/${questionId}`,
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
// get searched Questions---------
export const getSearchedQuestion = async (lastId, country, category) => {
  try {
    const res = await axios.get(
      global.BASEURL + `api/exam/search/${lastId}/${country}/${category}`,
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
// get dashboard data
export const getDashboard = async () => {
  try {
    const res = await axios.get(global.BASEURL + `api/info/admin/add-hr`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("login_admin_token"),
      },
    });
    return res;
  } catch (error) {
    console.log(error, "error");
  }
};
