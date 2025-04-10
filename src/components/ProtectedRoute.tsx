import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "../redux/slices/AuthUserSlice";
import { showErrorToast } from "./ToastContainer";
import { useNavigate } from "react-router-dom";

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
      if (result.status === "success") {
        const { user } = result;
        dispatch(
          setUser({
            id: user.id,
            email: user.email,
            userName: user.userName,
            profileImage: user.profileImage,
          })
        );
        // console.log("protected user", user);
        // showSuccessToast("User Authenticated");
      } else {
        showErrorToast("Access Denied. Please Log-In");
        dispatch(clearUser());
        navigate("/auth/login"); // Redirect to login page
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      showErrorToast("Failed to verify token...");
      dispatch(clearUser());
      navigate("/auth/login");
    }
  };

  // Only render children if the user is authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
