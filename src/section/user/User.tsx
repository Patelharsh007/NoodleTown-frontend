// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../redux/Store";
// import { useNavigate } from "react-router-dom";
// import {
//   Button,
//   Typography,
//   Box,
//   Container,
//   Skeleton,
//   Avatar,
// } from "@mui/material";
// import { clearUser } from "../../redux/slices/AuthUserSlice";
// import {
//   showErrorToast,
//   showSuccessToast,
// } from "../../components/ToastContainer";
// import axios from "axios";

// const User: React.FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { authUser } = useSelector((state: RootState) => state.authUser);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const verifyUser = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:8080/api/user/verifyUser",
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             credentials: "include",
//           }
//         );

//         const result = await response.json();

//         if (result.status !== "success") {
//           console.warn("User is not authenticated.");

//           dispatch(clearUser());
//         }
//       } catch (error) {
//         console.error("Error verifying user:", error);
//       }
//     };
//     verifyUser();
//   }, []);

//   useEffect(() => {
//     setTimeout(() => setLoading(false), 1000);
//   }, []);

//   // Handle logout action
//   const handleLogout = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/auth/logout",
//         {},
//         {
//           withCredentials: true,
//         }
//       );

//       if (response.data.status === "success") {
//         dispatch(clearUser());
//         showSuccessToast("Log-Out Successfully");
//         // navigate("/home");
//       }
//     } catch (error) {
//       console.error("Error logging out:", error);
//       showErrorToast("Something went erong");
//     }
//   };

//   // Navigate to the orders page
//   const handleViewOrders = () => {
//     navigate("/orders");
//   };

//   // Helper to get the initials of the username
//   const getInitials = (name: string) => {
//     const names = name.split(" ");
//     return names.length > 1 ? names[0][0] + names[1][0] : names[0][0];
//   };

//   return (
//     <Container maxWidth="sm" sx={{ marginTop: "40px" }}>
//       {authUser.isAuthenticated ? (
//         <Container maxWidth="md" sx={{ marginTop: "40px" }}>
//           <Box
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             justifyContent="center"
//             sx={{ height: "60vh", padding: "20px" }}
//           >
//             {loading ? (
//               <Skeleton variant="circular" width={100} height={100} />
//             ) : (
//               <Avatar
//                 sx={{
//                   width: 100,
//                   height: 100,
//                   fontSize: 40,
//                   bgcolor: "primary.main",
//                   color: "white",
//                 }}
//               >
//                 {authUser.userName && getInitials(authUser.userName)}
//               </Avatar>
//             )}

//             <Box sx={{ marginTop: 2, textAlign: "center" }}>
//               {loading ? (
//                 <Skeleton variant="text" width={100} height={20} />
//               ) : (
//                 <Typography variant="h6" gutterBottom>
//                   {authUser.userName}
//                 </Typography>
//               )}
//               {loading ? (
//                 <Skeleton variant="text" width={100} height={20} />
//               ) : (
//                 <Typography variant="body2">
//                   {authUser.email || "N/A"}
//                 </Typography>
//               )}
//             </Box>

//             <Box
//               sx={{
//                 marginTop: 4,
//                 width: "100%",
//                 textAlign: "center",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               {loading ? (
//                 <>
//                   <Skeleton
//                     variant="rectangular"
//                     width="80%"
//                     height={40}
//                     sx={{ marginBottom: 2 }}
//                   />
//                   <Skeleton variant="rectangular" width="80%" height={40} />
//                 </>
//               ) : (
//                 <>
//                   <Button
//                     variant="contained"
//                     color="error"
//                     onClick={handleLogout}
//                     sx={{ width: "80%", marginBottom: 2 }}
//                   >
//                     Logout
//                   </Button>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleViewOrders}
//                     sx={{ width: "80%" }}
//                   >
//                     View Orders
//                   </Button>
//                 </>
//               )}
//             </Box>
//           </Box>
//         </Container>
//       ) : (
//         <Container maxWidth="md" sx={{ marginTop: "40px" }}>
//           <Box
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             justifyContent="center"
//             mt={4}
//             sx={{ height: "60vh", padding: "20px" }}
//           >
//             <Typography variant="h5" gutterBottom>
//               You are not logged in.
//             </Typography>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => navigate("/auth/login")}
//             >
//               Login
//             </Button>
//           </Box>
//         </Container>
//       )}
//     </Container>
//   );
// };

// export default User;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Container,
  Skeleton,
  Avatar,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
} from "@mui/material";
import { clearUser } from "../../redux/slices/AuthUserSlice";
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/ToastContainer";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HistoryIcon from "@mui/icons-material/History";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authUser } = useSelector((state: RootState) => state.authUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/logout",
        {},
        { withCredentials: true }
      );
      if (response.data.status === "success") {
        dispatch(clearUser());
        showSuccessToast("Log-Out Successfully");
        navigate("/auth/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      showErrorToast("Something went wrong");
    }
  };

  const handleEditProfile = () => {
    navigate("/user/edit"); // Create an edit profile page
  };

  const handleViewOrders = () => {
    navigate("/orders");
  };

  const handleManageAddresses = () => {
    navigate("/user/addresses"); // Create an address management page
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "";
    const names = name.split(" ");
    return names.length > 1 ? names[0][0] + names[1][0] : names[0][0];
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ mt: 4, p: 3, borderRadius: 2, boxShadow: 1 }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 3,
        }}
      >
        {loading ? (
          <Skeleton variant="circular" width={80} height={80} />
        ) : (
          <Avatar
            src={authUser.profileImage || undefined}
            sx={{
              width: 80,
              height: 80,
              fontSize: 32,
              bgcolor: "primary.main",
              color: "white",
            }}
          />
        )}
        <Box sx={{ mt: 1, display: "flex", alignItems: "center" }}>
          {loading ? (
            <Skeleton width={120} height={24} />
          ) : (
            <Typography variant="h6">{authUser.userName}</Typography>
          )}
          <IconButton onClick={handleEditProfile} size="small" sx={{ ml: 1 }}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
        {loading ? (
          <Skeleton width={150} height={20} />
        ) : (
          <Typography variant="body2" color="text.secondary">
            {authUser.email}
          </Typography>
        )}
      </Box>

      <Divider sx={{ mb: 2 }} />

      <List>
        <ListItem component="button" onClick={handleViewOrders}>
          <ListItemIcon>
            <HistoryIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="My Orders" />
        </ListItem>
        <ListItem component="button" onClick={handleManageAddresses}>
          <ListItemIcon>
            <LocationOnIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Manage Addresses" />
        </ListItem>
        {/* You can add more profile-related options here */}
        {/* <ListItem button>
          <ListItemIcon>
            <PersonIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Personal Details" />
        </ListItem> */}
      </List>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <Button
        fullWidth
        variant="outlined"
        color="error"
        startIcon={<ExitToAppIcon />}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Container>
  );
};

export default UserProfile;
