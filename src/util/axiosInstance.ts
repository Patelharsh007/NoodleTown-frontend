import axios from "axios";
import { showErrorToast, showSuccessToast } from "../components/ToastContainer";
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
      // showErrorToast(response.data?.message);
      return Promise.reject(new Error(message));
    }
    // showSuccessToast(response.data?.message);
    return response;
  },
  (error) => {
    const status = error.response?.status;
    let message;

    switch (status) {
      case 400:
        message = "Bad Request";
        break;
      case 401:
        message = "Unauthorized";
        break;
      case 403:
        message = "Forbidden";
        break;
      case 404:
        message = "Not Found";
        break;
      case 500:
        message = "Internal Server Error";
        break;
      default:
        message = "An unexpected server error occurred";
    }

    message = error.response?.data?.message || message;
    // showErrorToast(message);
    return Promise.reject(new Error(message));
  }
);
