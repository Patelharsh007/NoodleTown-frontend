import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { clearUser, setUser } from "../redux/slices/AuthUserSlice";
import { showErrorToast } from "./ToastContainer";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state: RootState) => state.authUser.authUser);
  const token = Cookies.get("authToken");

  useEffect(() => {
    if (token) {
      // Verify token if token exists
      verifyToken();
    }
  }, [dispatch, token]);

  if (!authUser.isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  const verifyToken = async () => {
    const token = Cookies.get("authToken"); // Retrieve token from cookies

    if (!token) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/verifyUser",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
            "Content-Type": "application/json",
          },
          credentials: "include", // To include cookies in the request
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        // If token is valid, store user data in Redux
        const { user } = result;
        dispatch(
          setUser({
            id: user.id,
            email: user.email,
            userName: user.userName,
          })
        );
      } else {
        // Token expired or invalid, log the user out
        dispatch(clearUser());
        Cookies.remove("authToken");
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      showErrorToast("Failed to verify token. Please log in again.");
      dispatch(clearUser());
      Cookies.remove("authToken");
      navigate("/auth/login");
    }
  };

  return <>{children}</>;
};

export default PrivateRoute;
