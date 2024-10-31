import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://imperialbackend.onrender.com/",
});
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("imperial_token");
        if (token) {
            config.headers["x-auth-token"] = token;
            config.headers["Content-Type"] = "application/json";
        }
        return config
    },
    (error) => {
        console.log(error, 'er')
        // message.error(error.message)
        return Promise.reject(error);
    }
);