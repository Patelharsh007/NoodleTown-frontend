import { toast, ToastOptions, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let activeToasts: (string | number)[] = [];
const MAX_TOASTS = 3;

const toastConfig: ToastOptions = {
  position: "bottom-left",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  style: {
    fontFamily: "Poppins",
    fontSize: "16px",
  },
};

export const showSuccessToast = (message: string) => {
  showToast(message, "success");
};

export const showErrorToast = (message: string) => {
  showToast(message, "error");
};

export const showInfoToast = (message: string) => {
  showToast(message, "info");
};

const showToast = (message: string, type: "success" | "error" | "info") => {
  if (activeToasts.length >= MAX_TOASTS) {
    const oldestToast = activeToasts.shift();
    if (oldestToast) {
      toast.dismiss(oldestToast);
    }
  }

  const toastId = toast[type](message, toastConfig);
  activeToasts.push(toastId);
};

export const ToastContainerWrapper = () => {
  return <ToastContainer />;
};
