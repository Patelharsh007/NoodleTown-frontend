import axios from "axios";
import { showErrorToast } from "../components/ToastContainer";
const BASE_URL = process.env.REACT_APP_BACKENDURL;

//---------------------------Axios Instance----------------------------------
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data?.status === "error") {
      const message = response.data.message || "Something went wrong";
      // showErrorToast(message);
      return Promise.reject(new Error(message));
    }
    return response;
  },
  (error) => {
    const message =
      error.response?.data?.message ||
      error ||
      "An unexpected server error occurred";
    // showErrorToast(message);
    return Promise.reject(new Error(message));
  }
);
