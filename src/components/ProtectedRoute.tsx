import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { clearUser, setUser } from "../redux/slices/AuthUserSlice";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "./ToastContainer";
import Home from "../pages/Home";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state: RootState) => state.authUser.authUser);

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    try {
      console.log("IN Protected route");
      const response = await fetch(
        "http://localhost:8080/api/user/verifyUser",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const result = await response.json();

      console.log("Verifying Token");

      if (result.status === "success") {
        console.log(result);
        const { user } = result;
        dispatch(
          setUser({
            id: user.id,
            email: user.email,
            userName: user.userName,
          })
        );
        // showSuccessToast("User Authenticated");
      } else {
        showErrorToast("Access Denied. Please Log-In");
        dispatch(clearUser());
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      showErrorToast("Failed to verify token...");
    }
  };

  // Only render children if the user is authenticated
  return authUser.isAuthenticated ? <>{children}</> : <Home />;
};

export default ProtectedRoute;
