import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Box,
  Container,
  Skeleton,
  Avatar,
} from "@mui/material";
import { clearUser } from "../../redux/slices/AuthUserSlice";
import { showSuccessToast } from "../../components/ToastContainer";

const User: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const { authUser } = useSelector((state: RootState) => state.authUser);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Handle logout action
  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/home");
    showSuccessToast("Log-Out Successfully");
  };

  // Navigate to the orders page
  const handleViewOrders = () => {
    navigate("/orders");
  };

  // Helper to get the initials of the username
  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names.length > 1 ? names[0][0] + names[1][0] : names[0][0];
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "40px" }}>
      {authUser.isAuthenticated ? (
        <Container maxWidth="md" sx={{ marginTop: "40px" }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ height: "60vh", padding: "20px" }}
          >
            {loading ? (
              <Skeleton variant="circular" width={100} height={100} />
            ) : (
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  fontSize: 40,
                  bgcolor: "primary.main",
                  color: "white",
                }}
              >
                {authUser.userName && getInitials(authUser.userName)}
              </Avatar>
            )}

            <Box sx={{ marginTop: 2, textAlign: "center" }}>
              {loading ? (
                <Skeleton variant="text" width={100} height={20} />
              ) : (
                <Typography variant="h6" gutterBottom>
                  {authUser.userName}
                </Typography>
              )}
              {loading ? (
                <Skeleton variant="text" width={100} height={20} />
              ) : (
                <Typography variant="body2">
                  {authUser.email || "N/A"}
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                marginTop: 4,
                width: "100%",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {loading ? (
                <>
                  <Skeleton
                    variant="rectangular"
                    width="80%"
                    height={40}
                    sx={{ marginBottom: 2 }}
                  />
                  <Skeleton variant="rectangular" width="80%" height={40} />
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleLogout}
                    sx={{ width: "80%", marginBottom: 2 }}
                  >
                    Logout
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleViewOrders}
                    sx={{ width: "80%" }}
                  >
                    View Orders
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Container>
      ) : (
        <Container maxWidth="md" sx={{ marginTop: "40px" }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            mt={4}
            sx={{ height: "60vh", padding: "20px" }}
          >
            <Typography variant="h5" gutterBottom>
              You are not logged in.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/auth/login")}
            >
              Login
            </Button>
          </Box>
        </Container>
      )}
    </Container>
  );
};

export default User;
