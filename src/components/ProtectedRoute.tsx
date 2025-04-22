import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "../redux/slices/AuthUserSlice";
import { showErrorToast } from "./ToastContainer";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../util/axiosInstance";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    try {
      const response = await axiosInstance.get(`/user/verifyUser`, {
        withCredentials: true,
      });
      const result = await response.data;
      if (result.status === "success") {
        const { user, profileImage } = result;
        dispatch(
          setUser({
            id: user.id,
            email: user.email,
            userName: user.userName,
            profileImage: profileImage,
          })
        );
      } else {
        showErrorToast("Login required.");
        dispatch(clearUser());
        navigate("/auth/login");
      }
    } catch (error) {
      // console.error("Error verifying token:", error);
      showErrorToast("Login required (Token expired)");
      dispatch(clearUser());
      navigate("/auth/login");
    }
  };

  // Only render children if the user is authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
