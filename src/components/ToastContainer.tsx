import { toast, ToastOptions, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let activeToasts: (string | number)[] = []; // Keep track of active toast IDs
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
  // Remove the oldest toast if the max count is reached
  if (activeToasts.length >= MAX_TOASTS) {
    const oldestToast = activeToasts.shift(); // Remove the oldest toast ID from the list
    if (oldestToast) {
      toast.dismiss(oldestToast); // Dismiss the oldest toast
    }
  }

  // Show the new toast
  const toastId = toast[type](message, toastConfig);
  activeToasts.push(toastId); // Store the new toast ID
};

// Include the ToastContainer in your component render to display the toasts
export const ToastContainerWrapper = () => {
  return <ToastContainer />;
};
