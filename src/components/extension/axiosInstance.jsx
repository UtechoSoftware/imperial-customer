// import axios from "axios";
// import { store } from "./store";

// const GoogleApiKey = "AIzaSyBH0Ey-G2PbWkSCLyGG1A9TCg9LDPlzQpc";

// const headers = {
//   "Content-Type": "application/json",
// };

// const headers2 = {
//   "Content-Type": "multipart/form-data",
// };

// const axiosInstance = axios.create({
//   baseURL: "https://imperialbackend.onrender.com/",
//   // baseURL: "http://localhost:8080/api/",
//   headers,
// });

// const axiosInstance2 = axios.create({
//   // baseURL: "http://localhost:8080/api/",
//   baseURL: "https://imperialbackend.onrender.com/",
//   headers: headers2,
// });

// // Set the x-auth-token header for axiosInstance (JSON)
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const state = store.getState();
//     const token = state.auth.accessToken;
//     if (token) {
//       config.headers["x-auth-token"] = token;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Set the x-auth-token header for axiosInstance2 (multipart/form-data)
// axiosInstance2.interceptors.request.use(
//   (config) => {
//     const state = store.getState();
//     const token = state.auth.accessToken;
//     if (token) {
//       config.headers["x-auth-token"] = token;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export { headers, headers2, GoogleApiKey, axiosInstance2 };
// export default axiosInstance;
